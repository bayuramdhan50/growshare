import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, protectRoute, UserRole } from '@/app/lib/auth';
import { prisma, secureDbOperation } from '@/app/lib/db';

// GET - Get donations made by the current user
export async function GET(req: NextRequest) {
  // Ensure user is authenticated
  const authCheck = await protectRoute(req, [UserRole.USER, UserRole.ADMIN]);
  if (authCheck) {
    return authCheck; // Returns 401 or 403 responses
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pagination parameters and sanitize them
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    
    // Validate and cap pagination parameters
    const safePage = isNaN(page) || page < 1 ? 1 : Math.min(page, 100);
    const safeLimit = isNaN(limit) || limit < 1 ? 10 : Math.min(limit, 50);
    const skip = (safePage - 1) * safeLimit;

    // Fetch user donations with project info
    const [donations, donationsError] = await secureDbOperation(async () => {
      return await prisma.donation.findMany({
        where: {
          // @ts-ignore - user.id is added in auth.ts
          userId: user.id
        },
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          project: {
            select: {
              id: true,
              title: true,
            }
          }
        }
      });
    });

    if (donationsError) {
      console.error('Database error:', donationsError);
      return NextResponse.json({ error: 'Failed to fetch user donations' }, { status: 500 });
    }    // Format donations for client response
    const formattedDonations = donations.map((donation: {
      id: string;
      amount: number;
      message: string | null;
      createdAt: Date;
      projectId: string;
      project: {
        title: string;
      };
    }) => ({
      id: donation.id,
      amount: donation.amount,
      message: donation.message,
      createdAt: donation.createdAt,
      projectId: donation.projectId,
      projectTitle: donation.project.title
    }));

    // Get total count for pagination
    const [totalCount, countError] = await secureDbOperation(async () => {
      return await prisma.donation.count({
        where: {
          // @ts-ignore - user.id is added in auth.ts
          userId: user.id
        }
      });
    });

    if (countError) {
      console.error('Database error:', countError);
      return NextResponse.json({ error: 'Failed to fetch donation count' }, { status: 500 });
    }

    // Return donations with pagination info
    return NextResponse.json({
      donations: formattedDonations,
      pagination: {
        page: safePage,
        limit: safeLimit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / safeLimit)
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error fetching user donations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

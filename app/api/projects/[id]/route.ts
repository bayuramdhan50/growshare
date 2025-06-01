import { NextRequest, NextResponse } from 'next/server';
import { prisma, secureDbOperation } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/auth';

// GET - Get a single project by ID with its donations
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Secure database operation to get project details
    const [project, projectError] = await secureDbOperation(async () => {
      return await prisma.project.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      });
    });

    if (projectError || !project) {
      console.error('Error fetching project:', projectError);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get donations for this project
    const [donations, donationsError] = await secureDbOperation(async () => {
      return await prisma.donation.findMany({
        where: { projectId: id },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
            }
          }
        }
      });
    });

    if (donationsError) {
      console.error('Error fetching donations:', donationsError);
      return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
    }

    return NextResponse.json({
      project,
      donations
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

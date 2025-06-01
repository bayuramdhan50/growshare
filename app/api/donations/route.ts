import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, protectRoute, UserRole } from '@/app/lib/auth';
import { prisma, secureDbOperation } from '@/app/lib/db';
import { validateInput, donationSchema } from '@/app/lib/validations';
import { PrismaClient } from '@prisma/client';

// POST - Create a donation
export async function POST(req: NextRequest) {
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

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }

    // Validate input
    const validation = validateInput(donationSchema, body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const { projectId, amount, message } = validation.data;

    // Verify project exists
    const [project, projectError] = await secureDbOperation(async () => {
      return await prisma.project.findUnique({
        where: { id: projectId }
      });
    });

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Create donation in transaction with updating project amount
    const [donation, donationError] = await secureDbOperation(async () => {
      return await prisma.$transaction(async (prismaClient: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => {
        // Create the donation
        const donation = await prismaClient.donation.create({
          data: {
            amount,
            message: message || undefined,
            projectId,
            // @ts-ignore - user.id is added in auth.ts
            userId: user.id
          }
        });

        // Update the project's current amount
        await prismaClient.project.update({
          where: { id: projectId },
          data: {
            currentAmount: {
              increment: amount
            }
          }
        });

        return donation;
      });
    });

    if (donationError) {
      console.error('Database error:', donationError);
      return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 });
    }

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';

// Fix for "PrismaClient did not initialize yet"
let prisma: PrismaClient;

// Prevent multiple instances of Prisma Client in development
declare global {
  var prismaClient: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prismaClient;
}

export { prisma };

// Initialize the database connection
try {
  // Make sure the Prisma client is connected
  prisma.$connect()
    .then(() => console.log('Successfully connected to the database'))
    .catch((e: Error) => {
      console.error('Failed to connect to the database:', e);
    });
} catch (e) {
  console.error('Critical error initializing Prisma:', e);
}

// Export a function to check DB connectivity
export const checkDbConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    console.error('Database connection check failed:', e);
    return false;
  }
};

// Secure password handling
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

// Sanitize database output - remove sensitive fields
export const sanitizeUser = (user: any) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Secure database operations with error handling
export const secureDbOperation = async <T>(operation: () => Promise<T>): Promise<[T | null, Error | null]> => {
  try {
    const result = await operation();
    return [result, null];
  } catch (error) {
    console.error('Database operation failed:', error);
    return [null, error as Error];
  }
};

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../../generated/prisma/client.js';

export const authOptions = {
  user: {
    additionalFields: {
      role: {
        type: 'string' as const,
        required: true,
        defaultValue: 'PARTICIPANT',
        input: false, // Cannot be set during signup by the client
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    disableCSRFCheck: true, // Allow API testing without Origin headers
  },
};

// Standalone Better Auth instance for CLI commands
export const auth = betterAuth({
  database: prismaAdapter(
    new PrismaClient({
      accelerateUrl: process.env.DATABASE_URL as string,
    }),
    {
      provider: 'postgresql',
    },
  ),
  ...authOptions,
});

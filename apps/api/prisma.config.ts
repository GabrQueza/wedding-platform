import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'npx ts-node prisma/seed.ts',
  },
  datasource: {
    // For migrations, Prisma needs the direct connection URL
    url: env('DIRECT_URL') || env('DATABASE_URL'),
  },
});

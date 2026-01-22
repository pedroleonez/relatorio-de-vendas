import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

dotenv.config();

// Cria a conexão pool do MySQL
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined');
}
const adapter = new PrismaMariaDb(connectionString);

const prisma = new PrismaClient({ adapter });

export default prisma;
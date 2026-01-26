import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Função principal de seed - popula banco de dados com dados iniciais
 * Útil para desenvolvimento e testes
 */
async function main() {
  // Obtém string de conexão do banco de dados das variáveis de ambiente
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.');
  }
  
  // Inicializa adapter MariaDB e cliente Prisma
  const adapter = new PrismaMariaDb(connectionString);
  const prisma = new PrismaClient({ adapter });

  // Remove todos os registros existentes antes de popular
  await prisma.venda.deleteMany();

  // Array de vendas fictícias para popular o banco
  const vendas = [
    { produto: 'Notebook Gamer', categoria: 'Eletrônicos', quantidade: 1, valorTotal: 4500.00, dataVenda: new Date('2026-01-01') },
    { produto: 'Mouse Sem Fio', categoria: 'Periféricos', quantidade: 3, valorTotal: 450.00, dataVenda: new Date('2026-01-02') },
    { produto: 'Monitor 27"', categoria: 'Eletrônicos', quantidade: 2, valorTotal: 2400.00, dataVenda: new Date('2026-01-05') },
    { produto: 'Teclado Mecânico', categoria: 'Periféricos', quantidade: 5, valorTotal: 1500.00, dataVenda: new Date('2026-01-08') },
    { produto: 'Cadeira Ergonômica', categoria: 'Móveis', quantidade: 1, valorTotal: 1200.00, dataVenda: new Date('2026-01-10') },
    { produto: 'Webcam 4K', categoria: 'Periféricos', quantidade: 2, valorTotal: 800.00, dataVenda: new Date('2026-01-12') },
    { produto: 'Smartphone', categoria: 'Eletrônicos', quantidade: 1, valorTotal: 5500.00, dataVenda: new Date('2026-01-15') },
    { produto: 'Fone Bluetooth', categoria: 'Áudio', quantidade: 4, valorTotal: 1200.00, dataVenda: new Date('2026-01-18') },
    { produto: 'Mesa de Escritório', categoria: 'Móveis', quantidade: 1, valorTotal: 900.00, dataVenda: new Date('2026-01-20') },
    { produto: 'HD Externo 2TB', categoria: 'Armazenamento', quantidade: 3, valorTotal: 1350.00, dataVenda: new Date('2026-01-22') },
  ];

  // Insere cada venda no banco de dados
  for (const venda of vendas) {
    await prisma.venda.create({ data: venda });
  }

  // Desconecta do banco após finalizar o seed
  await prisma.$disconnect();
}

// Executa função principal e trata erros
try {
  await main();
} catch (e) {
  console.error(e);
  process.exit(1);
}
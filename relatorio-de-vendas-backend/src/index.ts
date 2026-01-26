import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import prisma from './lib/prisma.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/relatorio', async (req: Request, res: Response) => {
  try {
    const { produto, categoria } = req.query;

    const vendas = await prisma.venda.findMany({
      where: {
        produto: typeof produto === 'string' ? { contains: produto } : undefined,
        categoria: typeof categoria === 'string' ? categoria : undefined,
      },
      orderBy: {
        dataVenda: 'desc'
      }
    });
    return res.json(vendas)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
});

app.get('/categorias', async (_req: Request, res: Response) => {
  try {
    const categorias = await prisma.venda.findMany({
      distinct: ['categoria'],
      select: { categoria: true },
      orderBy: { categoria: 'asc' }
    });

    return res.json(categorias.map((item) => item.categoria));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
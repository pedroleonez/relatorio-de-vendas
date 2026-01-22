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
        produto: produto ? { contains: String(produto) } : undefined,
        categoria: categoria ? String(categoria) : undefined,
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
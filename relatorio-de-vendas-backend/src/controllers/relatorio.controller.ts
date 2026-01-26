import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

/**
 * Controller para buscar relatório de vendas com filtros
 * @param req - Request com query params (produto, categoria)
 * @param res - Response com array de vendas
 */
export async function getRelatorio(req: Request, res: Response) {
  try {
    // Extrai parâmetros de filtro da query string
    const { produto, categoria } = req.query;

    // Busca vendas no banco aplicando filtros opcionais
    const vendas = await prisma.venda.findMany({
      where: {
        // Valida tipo string antes de aplicar filtro para evitar erros de conversão
        produto: typeof produto === 'string' ? { contains: produto } : undefined,
        categoria: typeof categoria === 'string' ? categoria : undefined,
      },
      orderBy: {
        dataVenda: 'desc' // Ordena por data mais recente
      }
    });

    return res.json(vendas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
}

/**
 * Controller para buscar lista única de categorias disponíveis
 * @param _req - Request (não utilizado)
 * @param res - Response com array de categorias
 */
export async function getCategorias(_req: Request, res: Response) {
  try {
    // Busca categorias únicas usando distinct
    const categorias = await prisma.venda.findMany({
      distinct: ['categoria'],
      select: { categoria: true },
      orderBy: { categoria: 'asc' } // Ordena alfabeticamente
    });

    // Retorna apenas array de strings com as categorias
    return res.json(categorias.map((item) => item.categoria));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
}

import { Router } from 'express';
import { getRelatorio, getCategorias } from '../controllers/relatorio.controller.js';

// Inicializa router do Express
const router = Router();

/**
 * Rotas do módulo de relatório
 */

// GET /relatorio - Retorna vendas filtradas por produto e categoria
router.get('/relatorio', getRelatorio);

// GET /categorias - Retorna lista única de categorias disponíveis
router.get('/categorias', getCategorias);

export default router;

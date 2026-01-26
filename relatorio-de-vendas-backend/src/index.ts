import express from 'express';
import cors from 'cors';
import relatorioRoutes from './routes/relatorio.routes.js';

// Inicialização do servidor Express
const app = express();
const PORT = 3001;

// Middlewares: CORS para permitir requisições do frontend e JSON parser
app.use(cors());
app.use(express.json());

// Registra rotas do módulo de relatório
app.use(relatorioRoutes);

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
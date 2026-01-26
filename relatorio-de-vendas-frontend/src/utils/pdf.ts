// Importações para geração de PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Venda } from '../types';

/**
 * Exporta dados de vendas para um arquivo PDF
 * @param vendas - Array de vendas a serem exportadas
 */
export function exportarPDF(vendas: Venda[]) {
  // Inicializa documento PDF
  const doc = new jsPDF();
  const dataGeracao = new Date().toLocaleString('pt-BR');

  // Adiciona cabeçalho do relatório
  doc.text('Relatório de Vendas', 14, 15);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${dataGeracao}`, 14, 22);

  // Gera tabela com dados das vendas
  autoTable(doc, {
    startY: 30, // Posição Y inicial da tabela
    head: [['Produto', 'Categoria', 'Qtd', 'Total', 'Data']], // Cabeçalhos
    body: vendas.map((v) => [
      v.produto,
      v.categoria,
      v.quantidade,
      `R$ ${Number(v.valorTotal).toFixed(2)}`, // Formata valor monetário
      new Date(v.dataVenda).toLocaleDateString('pt-BR'), // Formata data
    ]),
  });

  // Salva arquivo PDF
  doc.save('relatorio-vendas.pdf');
}

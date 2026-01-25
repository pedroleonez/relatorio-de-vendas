import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Venda } from '../types';

export function exportarPDF(vendas: Venda[]) {
  const doc = new jsPDF();
  const dataGeracao = new Date().toLocaleString('pt-BR');

  doc.text('Relatório de Vendas', 14, 15);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${dataGeracao}`, 14, 22);

  autoTable(doc, {
    startY: 30,
    head: [['Produto', 'Categoria', 'Qtd', 'Total', 'Data']],
    body: vendas.map((v) => [
      v.produto,
      v.categoria,
      v.quantidade,
      `R$ ${Number(v.valorTotal).toFixed(2)}`,
      new Date(v.dataVenda).toLocaleDateString('pt-BR'),
    ]),
  });

  doc.save('relatorio-vendas.pdf');
}

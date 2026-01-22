import { useState, useEffect } from 'react';
import { Filtros } from './components/Filtros';
import { VendasTable } from './components/VendasTable';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function App() {
  // Estados para dados e controle de filtros [cite: 10]
  const [vendas, setVendas] = useState([]);
  const [filtros, setFiltros] = useState({
    produto: '',
    categoria: '',
    dataInicio: '',
    dataFim: ''
  });

  // Função para buscar dados do Backend 
  const fetchRelatorio = async () => {
    try {
      const params = new URLSearchParams(filtros).toString();
      const response = await fetch(`http://localhost:3001/relatorio?${params}`);
      const data = await response.json();
      setVendas(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  // Carrega os dados ao iniciar a tela [cite: 64]
  useEffect(() => {
    fetchRelatorio();
  }, []);

  // Lógica de Exportação para PDF [cite: 35, 43]
  const exportarPDF = () => {
    const doc = new jsPDF();
    const dataGeracao = new Date().toLocaleString('pt-BR');

    // Título e Data de Geração no PDF [cite: 37, 39]
    doc.text("Relatório de Vendas", 14, 15);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${dataGeracao}`, 14, 22);

    // Tabela com os dados no PDF [cite: 40]
    autoTable(doc, {
      startY: 30,
      head: [['Produto', 'Categoria', 'Qtd', 'Total', 'Data']],
      body: vendas.map((v: any) => [
        v.produto,
        v.categoria,
        v.quantidade,
        `R$ ${Number(v.valorTotal).toFixed(2)}`,
        new Date(v.dataVenda).toLocaleDateString('pt-BR')
      ]),
    });

    doc.save('relatorio-vendas.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com Título e Botão de Exportar [cite: 31, 34] */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Relatório de Vendas</h1>
          <button
            onClick={exportarPDF}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            <FileDown size={20} /> Exportar PDF
          </button>
        </header>

        {/* Componente de Filtros [cite: 10] */}
        <Filtros 
          filtros={filtros} 
          setFiltros={setFiltros} 
          onFiltrar={fetchRelatorio} 
          onLimpar={() => {
            const reset = { produto: '', categoria: '', dataInicio: '', dataFim: '' };
            setFiltros(reset);
            // Opcional: recarregar dados sem filtros após limpar
          }}
        />

        {/* Tabela de Dados (Requisito Obrigatório) [cite: 32] */}
        <main className="bg-white rounded-xl shadow-sm overflow-hidden">
          <VendasTable data={vendas} />
          
          {vendas.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Nenhum registro encontrado para os filtros selecionados.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
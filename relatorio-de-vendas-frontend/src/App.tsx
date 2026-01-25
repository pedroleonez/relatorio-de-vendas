import { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';
import { Filtros } from './components/Filtros';
import { VendasTable } from './components/VendasTable';
import { fetchCategorias, fetchRelatorio } from './services/api';
import { exportarPDF } from './utils/pdf';
import type { FiltrosState, Venda } from './types';

function App() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<FiltrosState>({
    produto: '',
    categoria: '',
    dataInicio: '',
    dataFim: ''
  });

  const carregarRelatorio = async () => {
    try {
      const data = await fetchRelatorio(filtros);
      setVendas(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const carregarCategorias = async () => {
    try {
      const data = await fetchCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarRelatorio();
    carregarCategorias();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com Título e Botão de Exportar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Relatório de Vendas</h1>
          <button
            onClick={() => exportarPDF(vendas)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            <FileDown size={20} /> Exportar PDF
          </button>
        </header>

        {/* Componente de Filtros */}
        <Filtros 
          filtros={filtros} 
          setFiltros={setFiltros}
          categorias={categorias}
          onFiltrar={carregarRelatorio} 
          onLimpar={() => {
            const reset = { produto: '', categoria: '', dataInicio: '', dataFim: '' };
            setFiltros(reset);
          }}
        />

        {/* Tabela de Dados */}
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
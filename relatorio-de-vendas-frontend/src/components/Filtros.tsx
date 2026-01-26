import type { Dispatch, SetStateAction } from "react";
import { Search, X } from "lucide-react";
import type { FiltrosState } from "../types";

// Interface de props do componente de filtros
interface FiltrosProps {
  filtros: FiltrosState; // Estado atual dos filtros
  categorias: string[]; // Lista de categorias para o select
  setFiltros: Dispatch<SetStateAction<FiltrosState>>; // Função para atualizar filtros
  onFiltrar: () => void; // Callback ao clicar em filtrar
  onLimpar: () => void; // Callback ao clicar em limpar
}

export function Filtros({
  filtros,
  categorias,
  setFiltros,
  onFiltrar,
  onLimpar,
}: Readonly<FiltrosProps>) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por Nome do Produto */}
        <div>
          <label
            htmlFor="filtro-produto"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase"
          >
            Produto
          </label>
          <input
            id="filtro-produto"
            type="text"
            placeholder="Buscar produto..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={filtros.produto}
            onChange={(e) =>
              setFiltros({ ...filtros, produto: e.target.value })
            }
          />
        </div>

        {/* Filtro por Categoria */}
        <div>
          <label
            htmlFor="filtro-categoria"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase"
          >
            Categoria
          </label>
          <select
            id="filtro-categoria"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={filtros.categoria}
            onChange={(e) =>
              setFiltros({ ...filtros, categoria: e.target.value })
            }
          >
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Data Início */}
        <div>
          <label
            htmlFor="filtro-data-inicio"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase"
          >
            De
          </label>
          <input
            id="filtro-data-inicio"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={filtros.dataInicio}
            onChange={(e) =>
              setFiltros({ ...filtros, dataInicio: e.target.value })
            }
          />
        </div>

        {/* Filtro por Data Fim */}
        <div>
          <label
            htmlFor="filtro-data-fim"
            className="block text-xs font-medium text-gray-700 mb-1 uppercase"
          >
            Até
          </label>
          <input
            id="filtro-data-fim"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={filtros.dataFim}
            onChange={(e) =>
              setFiltros({ ...filtros, dataFim: e.target.value })
            }
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onLimpar}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <X size={16} /> Limpar
        </button>
        <button
          onClick={onFiltrar}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
        >
          <Search size={16} /> Filtrar Relatório
        </button>
      </div>
    </div>
  );
}

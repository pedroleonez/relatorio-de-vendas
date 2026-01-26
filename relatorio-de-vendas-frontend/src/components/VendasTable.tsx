import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { Venda } from "../types";

// Helper para criação de colunas tipadas
const columnHelper = createColumnHelper<Venda>();

// Definição das colunas da tabela com formatação customizada
const columns = [
  // Coluna de produto - exibe texto simples
  columnHelper.accessor("produto", {
    header: "Produto",
    cell: (info) => info.getValue(),
  }),
  // Coluna de categoria - exibe com badge colorida
  columnHelper.accessor("categoria", {
    header: "Categoria",
    cell: (info) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
        {info.getValue()}
      </span>
    ),
  }),
  // Coluna de quantidade - exibe número simples
  columnHelper.accessor("quantidade", {
    header: "Qtd",
    cell: (info) => info.getValue(),
  }),
  // Coluna de valor total - formata como moeda brasileira
  columnHelper.accessor("valorTotal", {
    header: "Total",
    cell: (info) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(info.getValue()),
  }),
  // Coluna de data - formata para padrão brasileiro (DD/MM/AAAA)
  columnHelper.accessor("dataVenda", {
    header: "Data",
    cell: (info) => new Date(info.getValue()).toLocaleDateString("pt-BR"),
  }),
];

// Componente de tabela que renderiza os dados de vendas
export function VendasTable({ data }: Readonly<{ data: Venda[] }>) {
  // Inicializa instância da tabela com React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // Modelo básico de renderização
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-4">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-6 py-4 text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

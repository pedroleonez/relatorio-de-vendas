export interface Venda {
  id: number;
  produto: string;
  categoria: string;
  quantidade: number;
  valorTotal: number;
  dataVenda: string;
}

export interface FiltrosState {
  produto: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
}

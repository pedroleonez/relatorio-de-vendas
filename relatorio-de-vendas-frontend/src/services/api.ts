import type { FiltrosState, Venda } from '../types';

const BASE_URL = 'http://localhost:3001';

export async function fetchRelatorio(filtros: FiltrosState): Promise<Venda[]> {
  const params = new URLSearchParams(
    Object.entries(filtros).reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value ?? '';
      return acc;
    }, {})
  ).toString();
  const response = await fetch(`${BASE_URL}/relatorio?${params}`);

  if (!response.ok) {
    throw new Error('Falha ao buscar relatório');
  }

  return response.json();
}

export async function fetchCategorias(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/categorias`);

  if (!response.ok) {
    throw new Error('Falha ao buscar categorias');
  }

  return response.json();
}

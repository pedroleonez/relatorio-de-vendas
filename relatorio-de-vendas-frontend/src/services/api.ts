import type { FiltrosState, Venda } from '../types';

// URL base da API backend
const BASE_URL = 'http://localhost:3001';

/**
 * Busca relatório de vendas da API com filtros aplicados
 * @param filtros - Objeto com filtros de produto, categoria e datas
 * @returns Promise com array de vendas
 */
export async function fetchRelatorio(filtros: FiltrosState): Promise<Venda[]> {
  // Converte objeto de filtros em query string (URLSearchParams)
  const params = new URLSearchParams(
    Object.entries(filtros).reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value ?? '';
      return acc;
    }, {})
  ).toString();
  
  // Faz requisição GET para o endpoint de relatório
  const response = await fetch(`${BASE_URL}/relatorio?${params}`);

  if (!response.ok) {
    throw new Error('Falha ao buscar relatório');
  }

  return response.json();
}

/**
 * Busca lista de categorias únicas disponíveis
 * @returns Promise com array de strings contendo as categorias
 */
export async function fetchCategorias(): Promise<string[]> {
  // Faz requisição GET para o endpoint de categorias
  const response = await fetch(`${BASE_URL}/categorias`);

  if (!response.ok) {
    throw new Error('Falha ao buscar categorias');
  }

  return response.json();
}

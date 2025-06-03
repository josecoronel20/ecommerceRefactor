import { ApiProduct } from '@/types/product';

export const productsApi = {
  getAll: async (): Promise<ApiProduct[]> => {
    const response = await fetch('https://fakestoreapi.in/api/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },
};

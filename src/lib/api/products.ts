import { ApiProduct } from '@/types/product';

export const productsApi = {
  getAll: async (): Promise<ApiProduct[]> => {
    try{ 
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      } 

      const data = await response.json();

      console.log('data', {data});

    return data.products
  } catch (error) {
    console.log('error', error);
  }
  }
};

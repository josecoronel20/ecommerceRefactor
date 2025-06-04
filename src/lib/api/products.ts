import { ApiProduct } from '@/types/product';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
export const products = () => {
  const {data, isLoading, error} = useSWR<ApiProduct[]>('/api/products', fetcher);

  if(isLoading) {
    return {
      products: [],
      isLoading: true,
      error: null
    }
  }
  

  return {data, isLoading, error};
};

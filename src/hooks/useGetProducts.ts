import useSWR from 'swr';
import { ApiProduct } from '@/types/product';
import { API_PRODUCTS_URL } from '@/lib/utils/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetProducts = () => {
  const { data, error, isLoading } = useSWR(API_PRODUCTS_URL, fetcher);
  const products: ApiProduct[] = data?.products;

  return { products, error, isLoading };
};

import { ApiProduct } from "@/types/product";
import useSWR from "swr";
import { productsApi } from "@/lib/api/products";

export const useFetchProduct = () => {
    const {data, isLoading, error} = useSWR<ApiProduct[]>('https://fakestoreapi.in/api/products', productsApi.getAll);

    return {
        data,
        isLoading,
        error
    }
}



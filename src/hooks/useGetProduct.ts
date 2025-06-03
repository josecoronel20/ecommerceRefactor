import { ApiProduct } from "@/types/product";
import useSWR from "swr";
import { productsApi } from "@/lib/api/products";

export const useGetProduct = () => {
    const {data, isLoading, error} = useSWR<ApiProduct[]>('products',() => productsApi.getAll());

    return {
        products: data,
        isLoading,
        error
    }
}



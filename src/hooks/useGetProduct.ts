import { products } from "@/lib/api/products";

export const useGetProduct = () => {
    const {data, isLoading, error} = products();

    const products = data?.products;
    return {
        products,
        isLoading,
        error
    }
}



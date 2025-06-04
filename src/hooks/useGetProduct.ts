import { products } from "@/lib/api/products";

export const useGetProduct = () => {
    const {data, isLoading, error} = products();

<<<<<<< HEAD
    const products = data?.products;
=======
    console.log('data', data);
>>>>>>> e92342ccaed7bd8e62daaf866c6c8cbff82254c2
    return {
        products,
        isLoading,
        error
    }
}



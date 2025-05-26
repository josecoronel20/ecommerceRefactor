"use client";

import ProductCard from "../productos/components/productCard/ProductCard";
import { fetcher } from "@/hooks/useUserInfo";
import useSWR from "swr";
import { ApiProduct } from "@/types/types";
import PopularProductsSkeleton from "./PopularProductsSkeleton";

const PopularProducts = () => {
  const { data, isLoading } = useSWR(
    "https://fakestoreapi.in/api/products",
    fetcher
  );

  if (isLoading) {
    return <PopularProductsSkeleton />;
  }

  const productos: ApiProduct[] = data.products;

  const productosDestacados = productos.filter(
    (product: ApiProduct) => product.popular
  );

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-violet-600">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {productosDestacados.map((product: ApiProduct) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

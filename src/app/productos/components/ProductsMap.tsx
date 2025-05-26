import React from "react";
import ProductCard from "./productCard/ProductCard";
import useSWR from "swr";
import { fetcher } from "@/hooks/useUserInfo";
import { ApiProduct } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./productCard/ProductCardSkeleton";

const ProductsMap = ({
  filtro,
}: {
  filtro: { category: string; price: number };
}) => {
  const { data, isLoading } = useSWR(
    "https://fakestoreapi.in/api/products",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  }

  const productosFiltrados = data.products.filter((product: ApiProduct) =>
    filtro.category === "Todas"
      ? product.price <= filtro.price
      : product.category === filtro.category && product.price <= filtro.price
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {productosFiltrados.map((product: ApiProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsMap;

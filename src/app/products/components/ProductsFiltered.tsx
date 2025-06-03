import React from 'react';
import ProductCard from '@/components/shared/productCard/ProductCard';
import ProductCardSkeleton from '@/components/shared/productCard/ProductCardSkeleton';
import { useGetProduct } from '@/hooks/useGetProduct';
import { ApiProduct } from '@/types/product';

const ProductsFiltered = ({ filtro }: { filtro: { category: string; price: number } }) => {
  const { products, isLoading, error } = useGetProduct();

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

  if (error || !products) {
    return (
      <div className="text-center col-span-full">
        <h2 className="text-2xl font-bold text-red-600">Error al cargar los productos</h2>
        <p className="text-gray-600 mt-2">Por favor, intenta de nuevo más tarde</p>
      </div>
    );
  }

  const productosFiltrados = products.filter((product: ApiProduct) =>
    filtro.category === 'Todas'
      ? product.price <= filtro.price
      : product.category === filtro.category && product.price <= filtro.price
  );

  if (productosFiltrados.length === 0) {
    return (
      <div className="text-center col-span-full">
        <h2 className="text-2xl font-bold text-gray-600">No se encontraron productos</h2>
        <p className="text-gray-500 mt-2">Intenta con otros filtros</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {productosFiltrados.map((product: ApiProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsFiltered;

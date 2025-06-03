'use client';

import ProductCard from 
import { ApiProduct } from '@/types/product';
import PopularProductsSkeleton from './PopularProductsSkeleton';
import { useFetchProduct } from '@/hooks/useProduct';

const PopularProducts = () => {
  const { data, isLoading, error } = useFetchProduct();

  if (isLoading) {
    return <PopularProductsSkeleton />;
  }

  if (error || !data || !data.products) {
    return (
      <section className="p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-red-600">
            Error al cargar los productos destacados
          </h2>
          <p className="text-gray-600">Por favor, intenta de nuevo más tarde</p>
        </div>
      </section>
    );
  }

  const productos: ApiProduct[] = data.products;
  const productosDestacados = productos.filter((product: ApiProduct) => product.popular === true);

  if (productosDestacados.length === 0) {
    return (
      <section className="p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-violet-600">Productos destacados</h2>
          <p className="text-gray-600">No hay productos destacados en este momento</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-violet-600">Productos destacados</h2>

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

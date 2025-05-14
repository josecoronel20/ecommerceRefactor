"use client";
import { LoadingIcon } from "@/assets/icons";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";
import ProductCard from "../ProductCard";

const ProductosDestacados = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    console.log(error);
    return <div>Error al cargar los productos</div>;
  }

  const productosDestacados = products.filter((product) => product.popular);

  return (
    <section className="p-4">
      {loading === true ? (
        <LoadingIcon />
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-violet-600">Productos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {productosDestacados.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductosDestacados;

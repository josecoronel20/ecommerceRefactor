"use client";

import { LoadingIcon } from "@/assets/icons";
import Filter from "@/components/products/Filter";
import ProductsMap from "@/components/products/ProductsMap";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect, useState } from "react";

const Productos = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [filter, setFilter] = useState({
    category: "Todas",
    price: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="p-4 pt-28 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-violet-600">
        Todos los productos
      </h1>
      {loading && <LoadingIcon />}
      {error && <div>Error al cargar los productos</div>}
      {products && (
        <div className="flex gap-4 flex-col md:flex-row">
          <Filter setFilter={setFilter} />
          <ProductsMap filtro={filter} />
        </div>
      )}
    </main>
  );
};

export default Productos;

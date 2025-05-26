"use client";

import Filter from "@/app/productos/components/Filter";
import ProductsMap from "@/app/productos/components/ProductsMap";
import React, { useState } from "react";

const Productos = () => {
  const [filter, setFilter] = useState({
    category: "Todas",
    price: 0,
  });

  return (
    <main className="p-4 pt-28 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-violet-600">
        Todos los productos
      </h1>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex gap-4 flex-col md:flex-row">
          <Filter setFilter={setFilter} />

          
            <ProductsMap filtro={filter} />

        </div>
      </div>
    </main>
  );
};

export default Productos;

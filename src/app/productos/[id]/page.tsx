"use client";

import React, { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: Props) => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { id } = params;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 pt-36">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 pt-36">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto py-8 pt-36">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  const discount = product.price - product.discount;

  return (
    <main className="container mx-auto pt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold">${discount}</p>
            <p className="text-xl text-gray-600 line-through">${product.price}</p>

            <p className="text-red-400 text-xl font-bold bg-red-100 p-1 rounded-md">- {product.discount}%</p>
          </div>

          <p className="text-gray-600">{product.description}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Marca:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Modelo:</span> {product.model}
            </p>
            <p>
              <span className="font-semibold">Color:</span> {product.color}
            </p>
            <p>
              <span className="font-semibold">Categoría:</span>{" "}
              {product.category}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

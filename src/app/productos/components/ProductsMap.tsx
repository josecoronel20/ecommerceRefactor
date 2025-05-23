import React from 'react'
import ProductCard from './ProductCard'
import { useProductStore } from '@/store/useProductStore'

const ProductsMap = ({filtro}: {filtro: {category: string, price: number}}) => {
    const {products} = useProductStore()

    const productosFiltrados = products.filter((product) => 
      filtro.category === "Todas" 
        ? product.price <= filtro.price 
        : product.category === filtro.category && product.price <= filtro.price
    )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {productosFiltrados.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductsMap
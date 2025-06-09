import { Slider } from '@/components/ui/slider';
import { useGetProducts } from '@/hooks/useGetProducts';
import { ApiProduct } from '@/types/product';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const Filter = ({
  setFilter,
}: {
  setFilter: (filter: { category: string; price: number }) => void;
}) => {
  const categories = ['Todas', 'tv', 'audio', 'laptop', 'mobile', 'gaming', 'appliances'];
  const [category, setCategory] = useState('Todas');
  const [price, setPrice] = useState(3000);

  useEffect(() => {
    setFilter({
      category: category,
      price: price,
    });
  }, [category, price, setFilter]);

  const { products } = useGetProducts();

  const maxPrice =
    products?.reduce((max: number, product: ApiProduct) => Math.max(max, product.price), 0) ||
    3000;

  return (
    <section className="flex flex-col gap-4 border border-gray-300 rounded-md p-4 min-w-[300px] h-fit">
      <h2 className="text-2xl font-bold text-violet-600">Filtros</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-lg text-violet-600">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-1"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg text-violet-600">Precio</h3>
          <p className="text-sm text-gray-500">Hasta ${price}</p>
          <Slider
            step={1}
            max={maxPrice}
            defaultValue={[3000]}
            onValueChange={(value) => setPrice(value[0])}
          />
        </div>
      </div>
    </section>
  );
};

export default Filter;

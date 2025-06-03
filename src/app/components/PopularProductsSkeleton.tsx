import ProductCardSkeleton from '@/app/productos/components/productCard/ProductCardSkeleton';
import { Skeleton } from '@/assets/components/ui/skeleton';
import React from 'react';

const PopularProductsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4" data-testid="skeleton-popular-products">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};

export default PopularProductsSkeleton;

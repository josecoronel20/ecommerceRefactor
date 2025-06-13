import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { ApiProduct } from '@/types/product';
import Link from 'next/link';
import AddToCart from '@/app/products/components/AddToCart';

const ProductCard = ({ product }: { product: ApiProduct }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-150 rounded-lg overflow-hidden max-w-xs">
      <CardHeader>
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-15 overflow-hidden"
          />
        </Link>
        <CardDescription>{product.category}</CardDescription>
        <CardTitle className="max-h-8 overflow-hidden font-normal">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <CardDescription className="text-lg font-bold text-violet-500">
          ${product.price}
        </CardDescription>

        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";
import Image from "next/image";
import { Product } from "@/store/useProductStore";
import { Button } from "./ui/button";
import { CartIconWhite } from "@/assets/icons";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
const ProductCard = ({ product }: { product: Product }) => {
  const { addItem, items, updateItemQuantity } = useCartStore();

  const isInCart = items.some((item) => item.id === product.id);

  return (
    <Card className="hover:shadow-lg transition-all duration-150 rounded-lg overflow-hidden max-w-xs">
      <CardHeader>
        <Link href={`/productos/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-15 overflow-hidden"
          />
        </Link>
        <CardDescription>{product.category}</CardDescription>
        <CardTitle className="max-h-8 overflow-hidden font-normal">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <CardDescription className="text-lg font-bold text-violet-500">
          ${product.price}
        </CardDescription>
        
        <Button
          variant="violet"
          onClick={() =>
            isInCart ? product.quantity && updateItemQuantity(product.id, product.quantity + 1) : addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }
        >
          <CartIconWhite />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

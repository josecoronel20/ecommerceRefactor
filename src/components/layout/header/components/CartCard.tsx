import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { Button } from '../../../ui/button';
import { CartProduct } from '@/types/types';

const CartCard = ({ product }: { product: CartProduct }) => {
  const { removeItem, updateItemQuantity } = useCartStore();

  const handleRemoveItem = () => {
    removeItem(product.id);
  };

  const handleUpdateItemQuantity = (quantity: number) => {
    updateItemQuantity(product.id, quantity);
  };

  return (
    <div className="flex justify-between  border-b p-1 pb-4 gap-4">
      <Image src={product.image} alt={product.title} width={100} height={100} />
      <div className="flex flex-col gap-2">
        <h3 className="text-sm">{product.title}</h3>

        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            onClick={() => product.quantity && handleUpdateItemQuantity(product.quantity - 1)}
          >
            -
          </Button>
          <p>{product.quantity}</p>
          <Button
            variant="outline"
            onClick={() => product.quantity && handleUpdateItemQuantity(product.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex gap-2 ">
        <p className="text-sm text-violet-500 font-bold">
          ${product.quantity ? product.price * product.quantity : product.price}
        </p>
        <Button className="text-lg" variant="ghost" onClick={handleRemoveItem}>
          ×
        </Button>
      </div>
    </div>
  );
};
export default CartCard;

import React from 'react';
import { Button } from '../../../assets/components/ui/button';
import { CartProduct, ApiProduct } from '@/types/types';
import { useCartStore } from '@/store/cart-store';
import { CartIconWhite } from '@/assets/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/assets/components/ui/dialog';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUserInfo';

const AddToCart = ({ product }: { product: ApiProduct }) => {
  const { items, addItem, updateItemQuantity } = useCartStore();
  const isInCart = items.some((item: CartProduct) => item.id === product.id);
  const { userInfo } = useUserInfo();

  const handleAddToCart = () => {
    // Si el producto ya está en el carrito, se actualiza la cantidad
    if (isInCart && product.quantity) {
      updateItemQuantity(product.id, product.quantity + 1);
    } else {
      // Si el producto no está en el carrito, se agrega
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
  };

  return (
    <>
      {userInfo ? (
        <Button variant="violet" onClick={handleAddToCart}>
          <CartIconWhite />
          Agregar
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="violet">
              <CartIconWhite />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar Sesión Requerido</DialogTitle>
              <DialogDescription>
                Para agregar productos al carrito, necesitas iniciar sesión primero.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="violet">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddToCart;

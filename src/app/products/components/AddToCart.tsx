import React from 'react';
import { Button } from '@/components/ui/button';
import { ApiProduct } from '@/types/product';
import { CartProduct } from '@/types/cart';
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
} from '@/components/ui/dialog';
import Link from 'next/link';
import useGetUser from '@/hooks/useGetUser';

const AddToCart = ({ product }: { product: ApiProduct }) => {
  const { items, addItem, updateItemQuantity } = useCartStore();
  const isInCart = items.some((item: CartProduct) => item.id === product.id);
  const { user } = useGetUser();

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
      {user ? (
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

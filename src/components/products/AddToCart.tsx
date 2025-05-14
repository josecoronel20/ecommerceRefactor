import React from "react";
import { Button } from "../ui/button";
import { Product } from "@/store/useProductStore";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { CartIconWhite } from "@/assets/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const AddToCart = ({ product }: { product: Product }) => {
  const { items, addItem, updateItemQuantity } = useCartStore();
  const isInCart = items.some((item: CartItem) => item.id === product.id);
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleAddToCart = () => {
    if (isInCart && product.quantity) {
      updateItemQuantity(product.id, product.quantity + 1);
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
  };

  return isLoggedIn ? (
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
  );
};

export default AddToCart;

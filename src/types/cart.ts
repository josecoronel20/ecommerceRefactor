import { ApiProduct } from "./product"; 

export interface Purchase {
    id: string;
    date: string;
    products: ApiProduct[];
    total: number;
  }
  
  export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }

  

// Cart
export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  // Estas interfaces definen el estado y las acciones del carrito de compras
  // Los parámetros son utilizados en la implementación en useCartStore.ts
  export interface CartState {
    items: CartItem[];
    addItem: (_item: CartItem) => void;
    removeItem: (_id: number) => void;
    clearCart: () => void;
  }
  
  export interface CartActions {
    addItem: (_item: CartItem) => void;
    removeItem: (_id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (_id: number, _quantity: number) => void;
  }
  
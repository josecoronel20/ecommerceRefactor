import { create } from "zustand";

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

interface CartActions {
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState & CartActions>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    updateItemQuantity: (id, quantity) => set((state) => ({ items: state.items.map((item) => item.id === id ? {...item, quantity} : item) })),
    clearCart: () => set({ items: [] }),
}));
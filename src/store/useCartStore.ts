import { create } from "zustand";
import { CartState, CartActions } from "@/types/types";

export const useCartStore = create<CartState & CartActions>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    updateItemQuantity: (id, quantity) => set((state) => ({ items: state.items.map((item) => item.id === id ? {...item, quantity} : item) })),
    clearCart: () => set({ items: [] }),
}));
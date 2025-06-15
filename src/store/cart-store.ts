import { CartActions, CartState } from '@/types/cart';
import { create } from 'zustand';

export const useCartStore = create<CartState & CartActions>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  addQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  subtractQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));

import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  popular?: boolean;
  discount: number;
}

interface ApiResponse {
  status: string;
  message: string;
  products: Product[];
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch("https://fakestoreapi.in/api/products");
      
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }

      const data: ApiResponse = await response.json();
      
      if (data.status === "SUCCESS" && Array.isArray(data.products)) {
        set({ products: data.products, loading: false });
      } else {
        throw new Error("Formato de respuesta inválido");
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error desconocido",
        loading: false,
      });
    }
  },
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../constant/orderbook";

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product) => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      selectedProduct: null,
      isLoading: true,
      setProducts: (products) => set({ products, isLoading: false }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: "product-storage",
    }
  )
);

export default useProductStore;

"use client";

import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import type { Product } from "@/lib/products";

type FavoritesState = {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
};

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const storage = createJSONStorage(() =>
  typeof window === "undefined" ? noopStorage : window.localStorage,
);

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          return {
            items: exists
              ? state.items.filter((item) => item.id !== product.id)
              : [product, ...state.items],
          };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearFavorites: () => set({ items: [] }),
      isFavorite: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "k9-mart-favorites",
      storage,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
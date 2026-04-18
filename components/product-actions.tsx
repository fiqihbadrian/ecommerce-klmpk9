"use client";

import type { Product } from "@/lib/products";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";

type ProductActionsProps = {
  product: Product;
};

export function ProductActions({ product }: ProductActionsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button onClick={() => addItem(product)} className="w-full">
        Add to cart
      </Button>
      <Button
        type="button"
        variant={isFavorite ? "danger" : "secondary"}
        onClick={() => toggleFavorite(product)}
        className="w-full"
      >
        {isFavorite ? "Saved" : "Favorite"}
      </Button>
    </div>
  );
}
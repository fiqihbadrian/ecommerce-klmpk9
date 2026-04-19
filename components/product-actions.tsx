"use client";

import Link from "next/link";
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
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          onClick={() => toggleFavorite(product)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#495057] transition hover:bg-[#e9ecef]"
        >
          <svg
            viewBox="0 0 24 24"
            className={isFavorite ? "h-5 w-5 fill-[#ef4444] stroke-[#ef4444]" : "h-5 w-5 stroke-current"}
            fill="none"
            strokeWidth="1.8"
          >
            <path d="M20 8.5c0 4.6-8 10.8-8 10.8S4 13.1 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button asChild className="w-full text-white">
          <Link href="/checkout">Checkout sekarang</Link>
        </Button>
        <Button onClick={() => addItem(product)} variant="secondary" className="w-full text-[#343a40]">
          Masukkan keranjang
        </Button>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const favoriteIds = useFavoritesStore((state) => state.items.map((item) => item.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favoriteIds.includes(product.id);

  return (
    <article className="overflow-hidden rounded-[26px] border border-black/5 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
      <Link href={`/product/${product.id}`} className="block">
        <div className={compact ? "aspect-[1.05]" : "aspect-[1.08]"}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">{product.category}</p>
              <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{product.title}</h3>
            </div>
            <button
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(event) => {
                event.preventDefault();
                toggleFavorite(product);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            >
              <svg viewBox="0 0 24 24" className={isFavorite ? "h-4.5 w-4.5 fill-[#ef4444] stroke-[#ef4444]" : "h-4.5 w-4.5 stroke-current"} fill="none" strokeWidth="1.8">
                <path d="M20 8.5c0 4.6-8 10.8-8 10.8S4 13.1 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-base font-semibold text-slate-900">{formatCurrency(product.price)}</p>
              <p className="text-xs text-slate-500">Stok {product.stock}</p>
            </div>
            <p className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-slate-700">
              ★ {product.rating.toFixed(1)}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button className="w-full" onClick={() => addItem(product)} type="button">
          Add to cart
        </Button>
      </div>
    </article>
  );
}
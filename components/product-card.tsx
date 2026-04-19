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
  const isFavorite = useFavoritesStore((state) =>
    state.items.some((item) => item.id === product.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article className="overflow-hidden rounded-[15px] border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.14)]">
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c757d]">{product.category}</p>
              <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#343a40]">{product.title}</h3>
            </div>
            <button
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(event) => {
                event.preventDefault();
                toggleFavorite(product);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#495057] transition hover:bg-slate-200"
            >
              <svg viewBox="0 0 24 24" className={isFavorite ? "h-4 w-4 fill-[#ef4444] stroke-[#ef4444]" : "h-4 w-4 stroke-current"} fill="none" strokeWidth="1.8">
                <path d="M20 8.5c0 4.6-8 10.8-8 10.8S4 13.1 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-base font-semibold text-[#343a40]">{formatCurrency(product.price)}</p>
              <p className="text-xs text-[#6c757d]">Stok {product.stock}</p>
            </div>
            <p className="rounded-full bg-[#e9ecef] px-2.5 py-1 text-[11px] font-semibold text-[#495057]">
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
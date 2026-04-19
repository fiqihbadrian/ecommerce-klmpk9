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
    <article className="overflow-hidden rounded-[15px] border border-black/5 bg-[#fffbfb] shadow-[0_10px_18px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_24px_rgba(0,0,0,0.16)]">
      <Link href={`/product/${product.id}`} className="block">
        <div className={compact ? "h-[100px]" : "h-[108px]"}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1 px-3 pb-2 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c757d]">{product.category}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-[#343a40]">{product.title}</h3>
            </div>
            <button
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(event) => {
                event.preventDefault();
                toggleFavorite(product);
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#495057] transition hover:bg-slate-200"
            >
              <svg viewBox="0 0 24 24" className={isFavorite ? "h-4 w-4 fill-[#ef4444] stroke-[#ef4444]" : "h-4 w-4 stroke-current"} fill="none" strokeWidth="1.8">
                <path d="M20 8.5c0 4.6-8 10.8-8 10.8S4 13.1 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-black/5 pt-1">
            <div>
              <p className="text-sm font-semibold text-[#343a40]">{formatCurrency(product.price)}</p>
              <p className="text-[11px] text-[#6c757d]">Stok {product.stock}</p>
            </div>
            <p className="rounded-full bg-[#e9ecef] px-2 py-0.5 text-[10px] font-semibold text-[#495057]">
              ★ {product.rating.toFixed(1)}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <Button className="h-9 w-full text-xs" onClick={() => addItem(product)} type="button">
          Add to cart
        </Button>
      </div>
    </article>
  );
}
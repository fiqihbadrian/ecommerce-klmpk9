"use client";

import Link from "next/link";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

// Memoized component to prevent unnecessary re-renders
export const ProductCard = memo(function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  // Optimize: only check if favorite, don't subscribe to entire items array
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article className="overflow-hidden rounded-[15px] border border-black/5 bg-[#fffbfb] shadow-[0_10px_18px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_24px_rgba(0,0,0,0.16)]">
      <Link href={`/product/${product.id}`} className="block">
        <div className={compact ? "h-[126px]" : "h-[108px]"}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1 px-3 pb-2 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c757d]">{product.category}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-[#343a40]">{product.title}</h3>
            </div>
            {compact ? (
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  aria-label="Masukan keranjang"
                  onClick={(event) => {
                    event.preventDefault();
                    addItem(product);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[#495057] transition hover:bg-slate-200"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  onClick={(event) => {
                    event.preventDefault();
                    toggleFavorite(product);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[#495057] transition hover:bg-slate-200"
                >
                  <FontAwesomeIcon icon={faHeart} className={isFavorite ? "h-4 w-4 text-[#ef4444]" : "h-4 w-4 text-[#495057]"} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={(event) => {
                  event.preventDefault();
                  toggleFavorite(product);
                }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#495057] transition hover:bg-slate-200"
              >
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? "h-4 w-4 text-[#ef4444]" : "h-4 w-4 text-[#495057]"} />
              </button>
            )}
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

      {!compact ? (
        <div className="px-3 pb-3">
          <Button className="h-9 w-full text-xs" onClick={() => addItem(product)} type="button">
            Masukan keranjang
          </Button>
        </div>
      ) : null}
    </article>
  );
});

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  priority?: boolean;
};

export function ProductCard({ product, compact = false, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isFavoriteStore = useFavoritesStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  
  // Prevent hydration mismatch by only showing favorite state after mount
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
    setIsFavorite(isFavoriteStore);
  }, [isFavoriteStore]);

  return (
    <article 
      className="overflow-hidden rounded-[15px] border border-black/5 bg-[#fffbfb] shadow-[0_10px_18px_rgba(0,0,0,0.12)] w-full max-w-full" 
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'paint layout'
      }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className={compact ? "relative h-[126px] w-full overflow-hidden" : "relative h-[108px] w-full overflow-hidden"}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          />
        </div>
        <div className="space-y-1 px-3 pb-2 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c757d] truncate">{product.category}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold leading-5 text-[#343a40] break-words">{product.title}</h3>
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
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#343a40] truncate">{formatCurrency(product.price)}</p>
              <p className="text-[11px] text-[#6c757d] truncate">Stok {product.stock}</p>
            </div>
            <p className="rounded-full bg-[#e9ecef] px-2 py-0.5 text-[10px] font-semibold text-[#495057] shrink-0">
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
}
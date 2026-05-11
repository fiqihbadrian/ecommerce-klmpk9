"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cart";

type StorefrontHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function StorefrontHeader({
  title = "K9 Mart",
  subtitle = "Temukan produk favoritmu di sini.",
}: StorefrontHeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="mb-5 rounded-[28px] bg-[#6E0D15] p-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#495057]">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">K9</span>
        </div>

        <Link
          href="/search"
          className="flex h-12 flex-1 items-center gap-2 rounded-[31px] bg-white px-4 text-sm font-semibold text-[#b2b8bf]"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 shrink-0 text-[#8f97a0]" />
          <span className="truncate">Masukan teks</span>
        </Link>

        <Link
          href="/cart"
          aria-label="Open cart"
          className="relative flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#495057] transition hover:bg-white/90"
        >
          <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
        </Link>
      </div>

      <div className="mt-3 rounded-2xl bg-white/14 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">{title}</p>
        <p className="mt-1 text-xs text-white/80">{subtitle}</p>
      </div>
    </header>
  );
}
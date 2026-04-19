"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cart";

export function HomeTopNav() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <section className="sticky top-0 z-20 -mx-4 mb-5 bg-transparent px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[31px] bg-white shadow-[0_8px_16px_rgba(0,0,0,0.12)]">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#495057]">K9</span>
        </div>

        <Link
          href="/search"
          className="flex h-[50px] flex-1 items-center rounded-[31px] bg-white px-5 text-[15px] font-semibold text-[#bfc5cb] shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
        >
          Masukan teks
        </Link>

        <Link
          href="/cart"
          aria-label="Open cart"
          className="relative flex h-[50px] w-[50px] items-center justify-center rounded-[31px] bg-white text-[#495057] shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
        >
          <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </section>
  );
}

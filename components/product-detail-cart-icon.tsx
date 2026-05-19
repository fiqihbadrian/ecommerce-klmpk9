"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cart";

export function ProductDetailCartIcon() {
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <Link
      href="/cart"
      aria-label="Buka keranjang"
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40] transition hover:bg-[#e9ecef]"
    >
      <FontAwesomeIcon icon={faCartShopping} className="h-4 w-4" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}

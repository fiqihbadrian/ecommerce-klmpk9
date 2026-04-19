"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavoritesStore } from "@/store/favorites";

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return items;
    }

    return items.filter((product) =>
      [product.title, product.category, product.description].join(" ").toLowerCase().includes(keyword),
    );
  }, [items, query]);

  return (
    <PageShell noTopPadding>
      <section className="sticky top-0 z-20 -mx-4 mb-5 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-[#0b0b0b]">Favorit Saya</h1>
          <button
            type="button"
            aria-label="Cari produk favorit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-xs text-[#6c757d]">Cari hanya di daftar produk favorit kamu.</p>
        <div className="mt-3">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari produk favorit..."
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40]"
          />
        </div>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada favorit"
          description="Tekan ikon hati pada kartu produk untuk menyimpan item ke halaman ini."
          actionLabel="Jelajahi produk"
          actionHref="/home"
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="Produk tidak ditemukan"
          description="Coba kata kunci lain untuk mencari di daftar favorit kamu."
          actionLabel="Lihat semua favorit"
          actionHref="/favorites"
        />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[#fffbfb]">{filteredItems.length} item tersimpan</p>
            <Button type="button" variant="danger" onClick={clearFavorites}>
              Hapus semua
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
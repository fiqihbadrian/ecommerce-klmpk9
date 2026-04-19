"use client";

import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/store/favorites";

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  return (
    <PageShell>
      <section className="-mx-4 mb-5 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <h1 className="text-xl font-bold text-[#0b0b0b]">Favorit Saya</h1>
        <p className="mt-1 text-xs text-[#6c757d]">Daftar ini disimpan di local storage.</p>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada favorit"
          description="Tekan ikon hati pada kartu produk untuk menyimpan item ke halaman ini."
          actionLabel="Jelajahi produk"
          actionHref="/home"
        />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[#5f6771]">{items.length} item tersimpan</p>
            <Button type="button" variant="ghost" onClick={clearFavorites}>
              Hapus semua
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {items.map((product) => (
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
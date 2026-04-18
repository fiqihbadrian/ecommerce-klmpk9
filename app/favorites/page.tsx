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
      <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Favorites</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Produk tersimpan</h1>
        <p className="mt-2 text-sm text-white/70">Daftar ini disimpan di local storage sehingga tetap ada saat halaman dimuat ulang.</p>
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
            <p className="text-sm text-slate-600">{items.length} item tersimpan</p>
            <Button type="button" variant="ghost" onClick={clearFavorites}>
              Hapus semua
            </Button>
          </div>
          <div className="grid gap-4">
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
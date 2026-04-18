import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { StorefrontHeader } from "@/components/layout/storefront-header";
import { ProductCard } from "@/components/product-card";
import { fetchProducts, type Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    products = await fetchProducts();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Gagal memuat produk.";
  }

  return (
    <PageShell>
      <StorefrontHeader />

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-[24px] bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Produk</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{products.length}</p>
        </div>
        <div className="rounded-[24px] bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Pengiriman</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Gratis</p>
        </div>
        <div className="rounded-[24px] bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Mode</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Demo</p>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">Katalog</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">Produk terbaru</h2>
          </div>
        </div>

        {errorMessage ? (
          <EmptyState
            title="Database belum siap"
            description={errorMessage}
            actionLabel="Buka halaman login"
            actionHref="/welcome"
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="Belum ada produk"
            description="Tabel products masih kosong. Tambahkan data di Supabase agar katalog muncul di sini."
            actionLabel="Coba search"
            actionHref="/search"
          />
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
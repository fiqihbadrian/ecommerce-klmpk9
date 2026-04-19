import { EmptyState } from "@/components/empty-state";
import { HomeTopNav } from "@/components/layout/home-top-nav";
import { PageShell } from "@/components/layout/page-shell";
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
    <PageShell noTopPadding>
      <HomeTopNav />

      <section className="mb-6 overflow-hidden rounded-[15px] bg-white shadow-[0_10px_22px_rgba(0,0,0,0.14)]">
        <div className="relative aspect-[416/205] w-full">
          <img
            src="/aha.png"
            alt="Banner promo K9 Mart"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Banner 416 x 205
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="bg-[linear-gradient(90deg,#eaebec_7%,#b2bec3_39%,#eaebec_70%,#b2bec3_100%)] bg-clip-text text-xl font-bold text-transparent">
            Produk Kami
          </h2>
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
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
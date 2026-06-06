import { EmptyState } from "@/components/empty-state";
import { HomeTopNav } from "@/components/layout/home-top-nav";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product-card";
import { BannerCarousel } from "@/components/banner-carousel";
import { fetchProducts, type Product } from "@/lib/products";

// Disable caching to show real-time updates from admin
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

      <section className="mb-6">
        <BannerCarousel />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
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
          <div className="grid grid-cols-2 gap-3 w-full overflow-hidden" style={{ contain: 'layout style' }}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} compact priority={index < 4} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
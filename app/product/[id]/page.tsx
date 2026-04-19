import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { BackButton } from "@/components/back-button";
import { PageShell } from "@/components/layout/page-shell";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { formatCurrency } from "@/lib/format";
import { fetchProductById, fetchRelatedProducts, type Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id?: string }> | { id?: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const productId = resolvedParams.id;

  if (!productId) {
    notFound();
  }

  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts: Product[] = await fetchRelatedProducts(product);

  return (
    <PageShell noTopPadding>
      <section className="sticky top-0 z-20 -mx-4 mb-4 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <BackButton fallbackHref="/home" />
          <h1 className="text-xl font-bold text-[#0b0b0b]">Detail Produk</h1>
        </div>
      </section>

      <section className="overflow-hidden rounded-[15px] border border-black/5 bg-[#fffbfb] shadow-[0_14px_24px_rgba(0,0,0,0.12)]">
        <img src={product.imageUrl} alt={product.title} className="aspect-[1.02] w-full object-cover" />
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6c757d]">{product.category}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#343a40]">{product.title}</h1>
              <p className="mt-2 text-sm text-[#5f6771]">{product.description}</p>
            </div>
            <p className="rounded-full bg-[#e9ecef] px-3 py-1 text-sm font-semibold text-[#495057]">★ {product.rating.toFixed(1)}</p>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#6c757d]">Harga</p>
              <p className="text-2xl font-semibold text-[#343a40]">{formatCurrency(product.price)}</p>
            </div>
            <p className="text-sm text-[#6c757d]">Stok {product.stock}</p>
          </div>

          <div className="mt-5">
            <ProductActions product={product} />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6c757d]">Rekomendasi</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#343a40]">Produk serupa</h2>
          </div>
        </div>

        {relatedProducts.length === 0 ? (
          <EmptyState
            title="Tidak ada produk serupa"
            description="Tambahkan lebih banyak data ke tabel products untuk memunculkan rekomendasi berdasarkan kategori."
            actionLabel="Kembali ke home"
            actionHref="/home"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
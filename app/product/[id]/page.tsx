import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { formatCurrency } from "@/lib/format";
import { fetchProductById, fetchRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await fetchRelatedProducts(product);

  return (
    <PageShell>
      <section className="overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <img src={product.imageUrl} alt={product.title} className="aspect-[1.02] w-full object-cover" />
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">{product.category}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{product.title}</h1>
              <p className="mt-2 text-sm text-slate-500">{product.description}</p>
            </div>
            <p className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-slate-700">★ {product.rating.toFixed(1)}</p>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Harga</p>
              <p className="text-2xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
            </div>
            <p className="text-sm text-slate-500">Stok {product.stock}</p>
          </div>

          <div className="mt-5">
            <ProductActions product={product} />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">Rekomendasi</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">Produk serupa</h2>
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
          <div className="grid gap-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
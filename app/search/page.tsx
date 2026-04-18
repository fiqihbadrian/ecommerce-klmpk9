import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProducts, type Product } from "@/lib/products";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string | string[];
};

function getQueryValue(q: SearchParams["q"]) {
  if (Array.isArray(q)) {
    return q[0] ?? "";
  }

  return q ?? "";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = getQueryValue(searchParams.q);
  const products: Product[] = await searchProducts(query);

  return (
    <PageShell>
      <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Search</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Cari produk</h1>
        <form className="mt-4 flex gap-2" action="/search" method="get">
          <Input name="q" defaultValue={query} placeholder="Ketik nama produk atau kategori" className="border-0 bg-white text-slate-950 placeholder:text-slate-400" />
          <Button type="submit" className="shrink-0">
            Cari
          </Button>
        </form>
      </section>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {query ? (
            <>
              Hasil untuk <span className="font-semibold text-slate-900">“{query}”</span>
            </>
          ) : (
            "Gunakan pencarian untuk memfilter produk dari Supabase."
          )}
        </p>
        <Link href="/home" className="text-sm font-semibold text-primary">
          Reset
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="Tidak ada hasil"
          description="Coba kata kunci lain atau cek data produk di database Supabase."
          actionLabel="Kembali ke home"
          actionHref="/home"
        />
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      )}
    </PageShell>
  );
}
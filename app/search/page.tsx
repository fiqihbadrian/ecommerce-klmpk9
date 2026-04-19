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
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    products = await searchProducts(query);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Gagal memuat hasil pencarian.";
  }

  return (
    <PageShell>
      <section className="mb-5 rounded-[15px] bg-[#6c757d] px-4 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">Search</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Cari produk</h1>
        <form className="mt-4 flex gap-2" action="/search" method="get">
          <Input name="q" defaultValue={query} placeholder="Ketik nama produk atau kategori" className="border-white bg-white text-[#343a40] placeholder:text-slate-400" />
          <Button type="submit" className="shrink-0">
            Cari
          </Button>
        </form>
      </section>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-[#5f6771]">
          {query ? (
            <>
              Hasil untuk <span className="font-semibold text-[#343a40]">“{query}”</span>
            </>
          ) : (
            "Gunakan pencarian untuk memfilter produk dari Supabase."
          )}
        </p>
        <Link href="/home" className="text-sm font-semibold text-[#495057]">
          Reset
        </Link>
      </div>

      {errorMessage ? (
        <EmptyState
          title="Search error"
          description={errorMessage}
          actionLabel="Kembali ke home"
          actionHref="/home"
        />
      ) : products.length === 0 ? (
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
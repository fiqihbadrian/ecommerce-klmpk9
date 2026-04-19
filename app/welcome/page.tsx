import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = ["Login cepat", "Produk dari database", "Cart & favorites tersimpan"];

export default function WelcomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#6c757d] px-3 py-4">
      <section className="glass-card relative flex flex-1 flex-col justify-between overflow-hidden rounded-[42px] p-6">
        <div className="pointer-events-none absolute -left-14 -top-14 h-36 w-36 rounded-full bg-[#dce0e4]" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[#dce0e4]" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6c757d]">K9 Mart</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[1.02] tracking-tight text-[#495057]">
            Belanja mobile yang terasa cepat dan rapi.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#5f6771]">
            Demo e-commerce ini memakai Next.js App Router, Supabase, dan Zustand untuk alur login, katalog,
            cart, favorites, sampai checkout.
          </p>

          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[20px] border border-[#d8dde2] bg-white px-4 py-3 text-sm text-[#4d5560]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6c757d]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          <Button asChild className="w-full">
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/register">Daftar</Link>
          </Button>
          <Link href="/home" className="text-center text-sm font-semibold text-[#5f6771] transition hover:text-[#495057]">
            Lihat katalog dulu
          </Link>
        </div>
      </section>
    </main>
  );
}
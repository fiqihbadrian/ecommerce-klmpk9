import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = ["Login cepat", "Produk dari database", "Cart & favorites tersimpan"];

export default function WelcomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <section className="glass-card flex flex-1 flex-col justify-between rounded-[34px] p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">K9 Mart</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[1.02] tracking-tight text-slate-950">
            Belanja mobile yang terasa cepat dan rapi.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Demo e-commerce ini memakai Next.js App Router, Supabase, dan Zustand untuk alur login, katalog,
            cart, favorites, sampai checkout.
          </p>

          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
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
          <Link href="/home" className="text-center text-sm font-semibold text-slate-500 transition hover:text-primary">
            Lihat katalog dulu
          </Link>
        </div>
      </section>
    </main>
  );
}
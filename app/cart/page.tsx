"use client";

import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.getSubtotal());

  return (
    <PageShell>
      <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Cart</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Keranjang belanja</h1>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="Keranjang masih kosong"
          description="Tambahkan produk dari katalog atau detail produk untuk melanjutkan ke checkout."
          actionLabel="Lihat produk"
          actionHref="/home"
        />
      ) : (
        <>
          <div className="grid gap-3">
            {items.map((item) => (
              <article key={item.id} className="glass-card overflow-hidden rounded-[26px] p-4">
                <div className="flex gap-4">
                  <img src={item.imageUrl} alt={item.title} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.price)}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Button type="button" variant="secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 px-3">
                        -
                      </Button>
                      <span className="min-w-10 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <Button type="button" variant="secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 px-3">
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                  <Button type="button" variant="ghost" onClick={() => removeItem(item.id)}>
                    Hapus
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <section className="glass-card mt-5 rounded-[28px] p-5">
            <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-950">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
              <span>Ongkir</span>
              <span className="font-semibold text-emerald-600">Gratis</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-4 text-base">
              <span className="font-semibold text-slate-950">Total</span>
              <span className="font-semibold text-slate-950">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-5 grid gap-3">
              <Button asChild>
                <Link href="/checkout">Lanjut checkout</Link>
              </Button>
              <Button type="button" variant="secondary" onClick={clearCart}>
                Kosongkan cart
              </Button>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
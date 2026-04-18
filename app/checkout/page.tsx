"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const [complete, setComplete] = useState(false);

  const deliveryFee = useMemo(() => (items.length > 0 ? 0 : 0), [items.length]);
  const grandTotal = subtotal + deliveryFee;

  if (items.length === 0 && !complete) {
    return (
      <PageShell>
        <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Checkout</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Selesaikan pesanan</h1>
        </section>
        <EmptyState
          title="Belum ada item"
          description="Tambahkan produk ke cart sebelum membuka halaman checkout."
          actionLabel="Kembali belanja"
          actionHref="/home"
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Checkout</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Selesaikan pesanan</h1>
      </section>

      {complete ? (
        <EmptyState
          title="Pesanan dibuat"
          description="Ini adalah flow demo, jadi tidak ada payment gateway. Cart sudah dikosongkan dan kamu bisa lanjut eksplor produk lain."
          actionLabel="Lihat katalog"
          actionHref="/home"
        />
      ) : (
        <>
          <section className="glass-card rounded-[28px] p-5">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Items</span>
                <span className="font-semibold text-slate-950">{items.length}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-950">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Ongkir</span>
                <span className="font-semibold text-emerald-600">Gratis</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-3 text-base">
                <span className="font-semibold text-slate-950">Total</span>
                <span className="font-semibold text-slate-950">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <Button
                type="button"
                onClick={() => {
                  clearCart();
                  setComplete(true);
                }}
              >
                Place order
              </Button>
              <Button asChild variant="secondary">
                <Link href="/cart">Kembali ke cart</Link>
              </Button>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
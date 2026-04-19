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
  const totalBought = items.reduce((total, item) => total + item.quantity, 0);

  const deliveryFee = useMemo(() => (items.length > 0 ? 0 : 0), [items.length]);
  const grandTotal = subtotal + deliveryFee;

  if (items.length === 0 && !complete) {
    return (
      <PageShell showBottomNav={false}>
        <section className="mb-5 rounded-[15px] bg-[#6c757d] px-4 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">Checkout</p>
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
    <PageShell showBottomNav={false} className="pb-44">
      <section className="mb-5 rounded-[15px] bg-[#6c757d] px-4 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">Checkout</p>
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
          <section className="rounded-[15px] border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6c757d]">Ringkasan checkout</h2>
            <div className="mt-3 space-y-3 text-sm text-[#6c757d]">
              <div className="flex items-center justify-between gap-3">
                <span>Items unik</span>
                <span className="font-semibold text-[#343a40]">{items.length}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Total kuantitas</span>
                <span className="font-semibold text-[#343a40]">{totalBought} item</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Subtotal</span>
                <span className="font-semibold text-[#343a40]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Ongkir</span>
                <span className="font-semibold text-[#495057]">Gratis</span>
              </div>
            </div>
          </section>
        </>
      )}

      {!complete ? (
        <section className="fixed inset-x-0 bottom-0 z-30 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto w-full max-w-md bg-white px-4 py-3 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
            <div className="grid grid-cols-2 gap-3 rounded-[12px] bg-[#f4f5f7] px-3 py-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total checkout</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{formatCurrency(grandTotal)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total dibeli</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{totalBought} item</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                type="button"
                className="h-10 text-xs"
                onClick={() => {
                  clearCart();
                  setComplete(true);
                }}
              >
                Place order
              </Button>
              <Button asChild variant="secondary" className="h-10 text-xs">
                <Link href="/cart">Kembali ke cart</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
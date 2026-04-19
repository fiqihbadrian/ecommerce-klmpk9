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
  const totalBought = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <PageShell showBottomNav={false} className="pb-44">
      <section className="-mx-4 mb-5 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <h1 className="text-xl font-bold text-[#0b0b0b]">Keranjang Saya</h1>
        <p className="mt-1 text-xs text-[#6c757d]">Atur jumlah item sebelum checkout.</p>
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
              <article key={item.id} className="overflow-hidden rounded-[15px] border border-black/5 bg-[#fffbfb] p-4 shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
                <div className="flex gap-4">
                  <img src={item.imageUrl} alt={item.title} className="h-24 w-24 rounded-[12px] object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#343a40]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#6c757d]">{formatCurrency(item.price)}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Button type="button" variant="secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 px-3">
                        -
                      </Button>
                      <span className="min-w-10 text-center text-sm font-semibold text-[#343a40]">{item.quantity}</span>
                      <Button type="button" variant="secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 px-3">
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#343a40]">{formatCurrency(item.price * item.quantity)}</p>
                  <Button type="button" variant="ghost" onClick={() => removeItem(item.id)}>
                    Hapus
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {items.length > 0 ? (
        <section className="fixed inset-x-0 bottom-0 z-30 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto w-full max-w-md bg-white px-4 py-3 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
            <div className="grid grid-cols-2 gap-3 rounded-[12px] bg-[#f4f5f7] px-3 py-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total checkout</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{formatCurrency(subtotal)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total dibeli</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{totalBought} item</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-white">
              <Button asChild className="h-10 text-xs">
                <Link href="/checkout">Lanjut checkout</Link>
              </Button>
              <Button type="button" variant="secondary" className="h-10 text-xs" onClick={clearCart}>
                Kosongkan cart
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
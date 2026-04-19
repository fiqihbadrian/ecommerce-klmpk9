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

          <section className="mt-5 rounded-[15px] border border-black/5 bg-[#fffbfb] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between gap-3 text-sm text-[#6c757d]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#343a40]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-[#6c757d]">
              <span>Ongkir</span>
              <span className="font-semibold text-[#495057]">Gratis</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-4 text-base">
              <span className="font-semibold text-[#343a40]">Total</span>
              <span className="font-semibold text-[#343a40]">{formatCurrency(subtotal)}</span>
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
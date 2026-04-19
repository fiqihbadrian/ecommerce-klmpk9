"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const addItem = useCartStore((state) => state.addItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalBought = items.reduce((total, item) => total + item.quantity, 0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = items.map((item) => item.id);

    setSelectedIds((prev) => {
      const kept = prev.filter((id) => ids.includes(id));
      const added = ids.filter((id) => !kept.includes(id));
      return [...kept, ...added];
    });
  }, [items]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds],
  );

  const selectedSubtotal = useMemo(
    () => selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [selectedItems],
  );

  const selectedTotalBought = useMemo(
    () => selectedItems.reduce((total, item) => total + item.quantity, 0),
    [selectedItems],
  );

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  function toggleSelectAll() {
    if (isAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(items.map((item) => item.id));
  }

  function toggleSelectItem(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id);
      }

      return [...prev, id];
    });
  }

  function handleCheckoutSelected() {
    if (selectedIds.length === 0) {
      return;
    }

    const selectedIdSet = new Set(selectedIds);
    const unselectedItems = items.filter((item) => !selectedIdSet.has(item.id));

    if (unselectedItems.length === 0) {
      router.push("/checkout");
      return;
    }

    clearCart();
    selectedItems.forEach((item) => {
      addItem(item, item.quantity);
    });
    router.push("/checkout");
  }

  function handleBack() {
    if (typeof window === "undefined") {
      router.push("/home");
      return;
    }

    const params = new URLSearchParams(window.location.search);

    // Jika cart dibuka dari checkout, tombol back harus ke home.
    if (params.get("from") === "checkout") {
      router.push("/home");
      return;
    }

    const referrer = document.referrer;

    if (!referrer) {
      router.push("/home");
      return;
    }

    try {
      const referrerUrl = new URL(referrer);
      const isSameOrigin = referrerUrl.origin === window.location.origin;

      if (!isSameOrigin) {
        router.push("/home");
        return;
      }

      // Jangan kembali ke checkout, langsung arahkan ke home.
      if (referrerUrl.pathname.startsWith("/checkout")) {
        router.push("/home");
        return;
      }

      router.back();
    } catch {
      router.push("/home");
    }
  }

  return (
    <PageShell showBottomNav={false} noTopPadding className="pb-44">
    
      <section className="sticky top-0 z-20 -mx-4 mb-5 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali ke halaman sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40] transition hover:bg-[#e9ecef]"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
          </button>
          <h1 className="flex-1 text-xl font-bold text-[#0b0b0b]">Keranjang Saya</h1>

          <button
            type="button"
            aria-label="Buka pesan"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40] transition hover:bg-[#e9ecef]"
          >
            <FontAwesomeIcon icon={faMessage} className="h-4 w-4" />
          </button>

          <Link
            href="/favorites"
            aria-label="Buka favorit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40] transition hover:bg-[#e9ecef]"
          >
            <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
          </Link>
        </div>
        {items.length > 0 ? (
          <label className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#343a40]">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border border-[#ced4da] text-[#495057]"
            />
            Pilih semua produk
          </label>
        ) : null}
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
                  <label className="mt-1 inline-flex h-6 w-6 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 rounded border border-[#ced4da] text-[#495057]"
                    />
                  </label>
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
        <section className="fixed inset-x-0 bottom-0 z-30">
          <div className="mx-auto w-full max-w-md bg-white px-4 py-3 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
            <div className="grid grid-cols-2 gap-3 rounded-[12px] bg-[#f4f5f7] px-3 py-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total checkout</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{formatCurrency(selectedSubtotal)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c757d]">Total dibeli</p>
                <p className="mt-1 text-sm font-bold text-[#343a40]">{selectedTotalBought} item</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                type="button"
                className="h-10 text-xs text-white"
                disabled={selectedIds.length === 0}
                onClick={handleCheckoutSelected}
              >
                Lanjut checkout
              </Button>
              <Button type="button" variant="secondary" className="h-10 text-xs text-[#343a40]" onClick={clearCart}>
                Kosongkan cart
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
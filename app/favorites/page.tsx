"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavoritesStore } from "@/store/favorites";

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickIdRef = useRef<string | null>(null);

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return items;
    }

    return items.filter((product) =>
      [product.title, product.category, product.description].join(" ").toLowerCase().includes(keyword),
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => items.some((item) => item.id === id)));
  }, [items]);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, []);

  function toggleSelect(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }

  function clearHoldTimer() {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }

  function handleLongPressStart(id: string) {
    if (selectedIds.length > 0) {
      return;
    }

    clearHoldTimer();
    holdTimerRef.current = setTimeout(() => {
      suppressClickIdRef.current = id;
      setSelectedIds([id]);
      holdTimerRef.current = null;
    }, 450);
  }

  function handleSelectAll() {
    const filteredIds = filteredItems.map((item) => item.id);
    const allFilteredSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedIds.includes(id));

    if (allFilteredSelected) {
      setSelectedIds((current) => current.filter((id) => !filteredIds.includes(id)));
      return;
    }

    setSelectedIds((current) => Array.from(new Set([...current, ...filteredIds])));
  }

  function handleRemoveSelected() {
    selectedIds.forEach((id) => removeFavorite(id));
    setSelectedIds([]);
  }

  const allFilteredSelected =
    filteredItems.length > 0 && filteredItems.every((item) => selectedIds.includes(item.id));

  return (
    <PageShell noTopPadding>
      <section className="sticky top-0 z-20 -mx-4 mb-5 bg-[#fffbfb] px-4 py-3 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-[#0b0b0b]">Favorit Saya</h1>
          <button
            type="button"
            aria-label="Cari produk favorit"
            onClick={() => setShowSearch((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40]"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-xs text-[#6c757d]">Cari hanya di daftar produk favorit kamu.</p>
        {showSearch ? (
          <div className="mt-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari produk favorit..."
              className="h-11 border-[#d6d9dd] bg-white text-[#343a40]"
            />
          </div>
        ) : null}
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada favorit"
          description="Tekan ikon hati pada kartu produk untuk menyimpan item ke halaman ini."
          actionLabel="Jelajahi produk"
          actionHref="/home"
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="Produk tidak ditemukan"
          description="Coba kata kunci lain untuk mencari di daftar favorit kamu."
          actionLabel="Lihat semua favorit"
          actionHref="/favorites"
        />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[#fffbfb]">{filteredItems.length} item tersimpan</p>
            {selectedIds.length > 0 ? (
              <p className="text-xs font-medium text-[#fffbfb]">{selectedIds.length} dipilih</p>
            ) : null}
          </div>
          {selectedIds.length > 0 ? (
            <div className="mb-4 grid grid-cols-2 gap-2">
              <Button type="button" variant="secondary" onClick={handleSelectAll}>
                <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                {allFilteredSelected ? "Batal pilih semua" : "Pilih semua"}
              </Button>
              <Button type="button" variant="danger" onClick={handleRemoveSelected}>
                <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
                Hapus favorit
              </Button>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((product) => (
              <div
                key={product.id}
                className="relative"
                onPointerDown={() => handleLongPressStart(product.id)}
                onPointerUp={clearHoldTimer}
                onPointerLeave={clearHoldTimer}
                onPointerCancel={clearHoldTimer}
                onClickCapture={(event) => {
                  if (suppressClickIdRef.current === product.id) {
                    event.preventDefault();
                    event.stopPropagation();
                    suppressClickIdRef.current = null;
                    return;
                  }

                  if (selectedIds.length > 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleSelect(product.id);
                  }
                }}
              >
                {selectedIds.length > 0 ? (
                  <div className="pointer-events-none absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-[0_6px_12px_rgba(0,0,0,0.2)]">
                    <span
                      className={
                        selectedIds.includes(product.id)
                          ? "h-4 w-4 rounded-full bg-[#495057]"
                          : "h-4 w-4 rounded-full border border-[#adb5bd] bg-white"
                      }
                    />
                  </div>
                ) : null}
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
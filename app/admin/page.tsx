"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/layout/page-shell";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { formatCurrency } from "@/lib/format";

type ProductRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image_url: string;
};

const CREATE_PRODUCTS_TABLE_SQL = `create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text not null,
  price integer not null default 0,
  stock integer not null default 0,
  rating numeric(2,1) not null default 4.8,
  image_url text default '/placeholder-product.svg',
  created_at timestamptz not null default now()
);`;

function isMissingProductsTable(message: string | null) {
  if (!message) {
    return false;
  }

  return /could not find the table ['\"]?public\.products['\"]?/i.test(message);
}

export default function AdminPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [error, setError] = useState<string | null>(null);
  const hasMissingTableError = isMissingProductsTable(error);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    rating: "4.8",
    image_url: "",
  });

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setError(null);
      const supabase = getSupabaseClient();
      if (!supabase) {
        const msg = "Supabase client not initialized";
        console.error(msg);
        setError(msg);
        setLoading(false);
        return;
      }

      const { data, error: dbError } = await supabase.from("products").select("*").order("id", { ascending: false });

      if (dbError) {
        const msg = `Database error: ${dbError.message || JSON.stringify(dbError)}`;
        console.error(msg);
        setError(msg);
        setLoading(false);
        return;
      }

      setProducts(data || []);
    } catch (err) {
      const msg = `Error: ${err instanceof Error ? err.message : String(err)}`;
      console.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setIsAdding(true);
    setMessage("");

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessageType("error");
      setMessage("Supabase env tidak tersedia.");
      setIsAdding(false);
      return;
    }

    // Validasi
    if (!formData.title || !formData.price || !formData.category) {
      setMessageType("error");
      setMessage("Isi semua field wajib: judul, kategori, dan harga.");
      setIsAdding(false);
      return;
    }

    const newProduct = {
      title: formData.title,
      description: formData.description || "Belum ada deskripsi",
      category: formData.category,
      price: parseInt(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 4.8,
      image_url: formData.image_url || "/placeholder-product.svg",
    };

    const { error: dbError } = await supabase.from("products").insert([newProduct]);

    if (dbError) {
      if (isMissingProductsTable(dbError.message)) {
        setError(`Database error: ${dbError.message}`);
      }
      setMessageType("error");
      setMessage(`Error: ${dbError.message}`);
      setIsAdding(false);
      return;
    }

    setMessageType("success");
    setMessage("Produk berhasil ditambah.");
    setFormData({ title: "", description: "", category: "", price: "", stock: "", rating: "4.8", image_url: "" });
    loadProducts();
    setIsAdding(false);

    setTimeout(() => setMessage(""), 3000);
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { error: dbError } = await supabase.from("products").delete().eq("id", id);

    if (dbError) {
      if (isMissingProductsTable(dbError.message)) {
        setError(`Database error: ${dbError.message}`);
      }
      setMessageType("error");
      setMessage(`Error: ${dbError.message}`);
      return;
    }

    setMessageType("success");
    setMessage("Produk berhasil dihapus.");
    loadProducts();
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <PageShell showBottomNav={false}>
      <section className="mb-5 rounded-[15px] bg-[#6c757d] px-4 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">Admin</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Kelola produk</h1>
            <p className="mt-1 text-sm text-white/85">Sinkron langsung ke database Supabase.</p>
          </div>
          <Link href="/home" className="shrink-0">
            <Button variant="secondary" className="h-10 px-4">Kembali</Button>
          </Link>
        </div>
      </section>

      {message ? (
        <div
          className={
            messageType === "error"
              ? "mb-4 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              : "mb-4 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          }
        >
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {hasMissingTableError ? (
        <section className="mb-6 rounded-[15px] border border-amber-200 bg-amber-50 p-4 text-[#5f4b00] shadow-[0_10px_18px_rgba(0,0,0,0.08)]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Setup Required</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Table <strong>public.products</strong> belum ada. Jalankan SQL berikut di Supabase SQL Editor, lalu refresh halaman admin.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-amber-200 bg-white p-3 text-xs leading-relaxed text-amber-900">
            <code>{CREATE_PRODUCTS_TABLE_SQL}</code>
          </pre>
        </section>
      ) : null}

      <form onSubmit={handleAddProduct} className="mb-6 space-y-3 rounded-[15px] border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
        <h2 className="text-base font-semibold text-[#343a40]">Tambah produk baru</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Judul produk*"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
          />
          <Input
            placeholder="Kategori*"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
          />
        </div>

        <textarea
          placeholder="Deskripsi (opsional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-xl border border-[#d6d9dd] bg-white px-3 py-2 text-[#343a40] placeholder:text-[#98a0a8] focus:outline-none focus:ring-2 focus:ring-[#6c757d]/40"
          rows={3}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            placeholder="Harga*"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
          />
          <Input
            placeholder="Stok"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
          />
          <Input
            placeholder="Rating"
            type="number"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
          />
        </div>

        <Input
          placeholder="Image URL (opsional)"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="h-11 border-[#d6d9dd] bg-white text-[#343a40] placeholder:text-[#98a0a8]"
        />

        <Button type="submit" disabled={isAdding} className="w-full">
          {isAdding ? "Menambah produk..." : "Tambah produk"}
        </Button>
      </form>

      <section className="rounded-[15px] border border-black/5 bg-white p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
        <h2 className="mb-3 text-base font-semibold text-[#343a40]">Daftar produk ({products.length})</h2>

        {loading ? (
          <p className="text-sm text-[#5f6771]">Memuat data produk...</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-[#5f6771]">Belum ada produk. Tambahkan produk pertama dari form di atas.</p>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#ebedf0] bg-[#f8f9fa] px-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#343a40]">{product.title}</p>
                  <p className="text-xs text-[#5f6771]">
                    {formatCurrency(product.price)} • Stok: {product.stock} • Rating: {product.rating}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="rounded-full bg-[#ef4444] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#dc2626]"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function AdminPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

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
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setIsAdding(true);
    setMessage("");

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("❌ Supabase env tidak tersedia");
      setIsAdding(false);
      return;
    }

    // Validasi
    if (!formData.title || !formData.price || !formData.category) {
      setMessage("❌ Isi semua field (title, price, category)");
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

    const { error } = await supabase.from("products").insert([newProduct]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
      setIsAdding(false);
      return;
    }

    setMessage("✅ Produk berhasil ditambah");
    setFormData({ title: "", description: "", category: "", price: "", stock: "", rating: "4.8", image_url: "" });
    loadProducts();
    setIsAdding(false);

    setTimeout(() => setMessage(""), 3000);
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
      return;
    }

    setMessage("✅ Produk berhasil dihapus");
    loadProducts();
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 pb-24">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-400">Manage produk di database</p>
          </div>
          <Link href="/home">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 rounded-lg bg-slate-700 px-4 py-2 text-sm text-white">
            {message}
          </div>
        )}

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="mb-8 space-y-3 rounded-2xl bg-slate-800 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white">Tambah Produk Baru</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Judul produk*"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-700 text-white placeholder-slate-400"
            />
            <Input
              placeholder="Kategori*"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-slate-700 text-white placeholder-slate-400"
            />
          </div>

          <textarea
            placeholder="Deskripsi (opsional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={2}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <Input
              placeholder="Harga*"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-slate-700 text-white placeholder-slate-400"
            />
            <Input
              placeholder="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="bg-slate-700 text-white placeholder-slate-400"
            />
            <Input
              placeholder="Rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="bg-slate-700 text-white placeholder-slate-400"
            />
          </div>

          <Input
            placeholder="Image URL (opsional)"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="bg-slate-700 text-white placeholder-slate-400"
          />

          <Button type="submit" disabled={isAdding} className="w-full">
            {isAdding ? "Menambah..." : "Tambah Produk"}
          </Button>
        </form>

        {/* Products List */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Daftar Produk ({products.length})
          </h2>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-slate-400">Belum ada produk. Tambahkan yang pertama!</p>
          ) : (
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-slate-700 px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{product.title}</p>
                    <p className="text-sm text-slate-400">
                      {formatCurrency(product.price)} • Stock: {product.stock} • Rating: {product.rating}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="ml-2 rounded bg-red-500/20 px-3 py-1 text-sm text-red-300 hover:bg-red-500/30"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

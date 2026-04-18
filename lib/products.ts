import { getSupabaseClient } from "./supabaseClient";

export type Product = {
  id: string;
  title: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
  raw: Record<string, unknown>;
};

type ProductRow = Record<string, unknown>;

const PLACEHOLDER_IMAGE = "/placeholder-product.svg";

function toText(value: unknown, fallback = "") {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function toNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveImageUrl(row: ProductRow) {
  return (
    toText(row.image_url) ||
    toText(row.image) ||
    toText(row.thumbnail) ||
    toText(row.cover_image) ||
    PLACEHOLDER_IMAGE
  );
}

export function normalizeProduct(row: ProductRow): Product {
  const title = toText(row.title) || toText(row.name) || "Produk";

  return {
    id: toText(row.id) || toText(row.product_id) || title,
    title,
    name: title,
    description:
      toText(row.description) ||
      toText(row.short_description) ||
      "Belum ada deskripsi produk.",
    category: toText(row.category) || "General",
    price: toNumber(row.price) || toNumber(row.amount),
    rating: toNumber(row.rating, 4.8),
    stock: toNumber(row.stock, 24),
    imageUrl: resolveImageUrl(row),
    createdAt: toText(row.created_at) || toText(row.createdAt),
    raw: row,
  };
}

export async function fetchProducts() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row: ProductRow) => normalizeProduct(row));
}

export async function fetchProductById(id: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? normalizeProduct(data as ProductRow) : null;
}

export async function fetchRelatedProducts(product: Product, limit = 4) {
  const products = await fetchProducts();

  return products
    .filter((candidate: Product) => candidate.id !== product.id)
    .filter((candidate: Product) => candidate.category === product.category)
    .slice(0, limit);
}

export async function searchProducts(query: string) {
  const products = await fetchProducts();
  const lowered = query.trim().toLowerCase();

  if (!lowered) {
    return products;
  }

  return products.filter((product: Product) => {
    return [product.title, product.category, product.description]
      .join(" ")
      .toLowerCase()
      .includes(lowered);
  });
}
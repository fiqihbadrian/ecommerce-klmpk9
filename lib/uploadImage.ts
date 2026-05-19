import { getSupabaseClient } from "./supabaseClient";

export async function uploadProductImage(file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return { url: null, error: "Supabase client not initialized" };
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return { url: null, error: "Tipe file tidak valid. Gunakan JPG, PNG, WEBP, atau GIF." };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { url: null, error: "Ukuran file terlalu besar. Maksimal 5MB." };
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { url: null, error: `Upload gagal: ${uploadError.message}` };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return { url: null, error: "Gagal mendapatkan URL gambar" };
    }

    return { url: urlData.publicUrl, error: null };
  } catch (err) {
    console.error("Upload error:", err);
    return { url: null, error: err instanceof Error ? err.message : "Upload gagal" };
  }
}

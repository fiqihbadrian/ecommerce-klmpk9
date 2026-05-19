"use client";

import { useState, useRef } from "react";
import { uploadProductImage } from "@/lib/uploadImage";
import { Button } from "./ui/button";

type ImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
};

export function ImageUpload({ onUploadSuccess, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    setError(null);

    const { url, error: uploadError } = await uploadProductImage(file);

    if (uploadError) {
      setError(uploadError);
      setUploading(false);
      return;
    }

    if (url) {
      onUploadSuccess(url);
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        {preview ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#d6d9dd]">
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          </div>
        ) : null}

        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleButtonClick}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? "Mengupload..." : preview ? "Ganti gambar" : "Upload gambar"}
          </Button>
          <p className="text-xs text-[#6c757d]">
            JPG, PNG, WEBP, atau GIF. Maksimal 5MB.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}

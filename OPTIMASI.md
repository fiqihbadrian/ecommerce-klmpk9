# Optimasi Performance - Halaman /home

## Masalah yang Ditemukan & Diperbaiki

### 1. **BottomNav Component - Re-render Berlebihan**
**Masalah:**
- `buildCurvePath()` dipanggil setiap render
- ResizeObserver trigger update tanpa debounce
- requestAnimationFrame tidak optimal

**Solusi:**
- ✅ Memoize SVG path dengan `useMemo()`
- ✅ Debounce ResizeObserver dengan `requestAnimationFrame`
- ✅ Ganti `requestAnimationFrame` dengan `setTimeout` untuk bubble animation

### 2. **ProductCard - Zustand Store Subscription**
**Masalah:**
- Setiap card subscribe ke seluruh `items` array di favorites store
- 5 produk = 5 subscription yang re-render setiap ada perubahan

**Solusi:**
- ✅ Gunakan `state.isFavorite(product.id)` langsung
- ✅ Tambahkan `memo()` untuk prevent unnecessary re-renders
- ✅ Tambahkan `loading="lazy"` pada gambar produk

### 3. **HomeTopNav - Cart Count**
**Masalah:**
- Subscribe ke `getItemCount()` function yang recalculate setiap render

**Solusi:**
- ✅ Subscribe langsung ke calculation: `state.items.reduce(...)`

### 4. **Data Fetching - Force Dynamic**
**Masalah:**
- `export const dynamic = "force-dynamic"` memaksa fetch ulang setiap request
- Tidak ada caching sama sekali

**Solusi:**
- ✅ Ganti dengan `export const revalidate = 60` (cache 60 detik)
- ✅ Reduce database load

### 5. **Image Loading**
**Masalah:**
- Banner image tidak di-prioritize
- Product images load semua sekaligus

**Solusi:**
- ✅ Tambahkan `loading="eager"` dan `fetchPriority="high"` untuk banner
- ✅ Tambahkan `loading="lazy"` untuk product images

### 6. **Next.js Config**
**Solusi:**
- ✅ Enable `reactStrictMode` untuk detect performance issues
- ✅ Optimize image formats dengan WebP

## File yang Dimodifikasi

1. `/app/home/page.tsx` - Caching & image optimization
2. `/components/layout/bottom-nav.tsx` - Memoization & debouncing
3. `/components/product-card.tsx` - Store subscription optimization
4. `/components/layout/home-top-nav.tsx` - Store subscription optimization
5. `/next.config.ts` - React strict mode & image optimization

## Hasil yang Diharapkan

- ✅ Tidak ada freeze/lag saat scroll
- ✅ Animasi bottom nav lebih smooth
- ✅ Product cards tidak re-render saat favorite/cart berubah
- ✅ Load time lebih cepat dengan caching
- ✅ Images load progressively (lazy loading)

## Testing

Untuk test performa:
1. Buka Chrome DevTools > Performance
2. Record saat buka halaman /home
3. Check FPS (harus stabil 60fps)
4. Check re-renders di React DevTools Profiler

## Tips Tambahan

Jika masih ada masalah:
- Clear browser cache
- Restart Next.js dev server
- Check Network tab untuk slow requests
- Monitor console untuk warnings/errors

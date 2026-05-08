# E‑Commerce Mobile‑First – Kelompok 9

Aplikasi e‑commerce mobile‑first yang dibangun dengan Next.js (App Router), Tailwind CSS, Zustand, dan Supabase. UI dirancang khusus untuk perangkat mobile dengan lebar maksimum 430px, meniru pengalaman aplikasi seperti Tokopedia.

## 🚀 Cara Menjalankan Proyek

1. **Clone repositori**
   ```bash
   git clone <repo-url>
   cd ecommerce-klmpk9
   ```

2. **Instal dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan server pengembangan**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka di browser**
   - Buka [http://localhost:3000](http://localhost:3000)
   - Halaman pertama adalah `/welcome` (landing page login/register)

## 📁 Struktur Folder

```
/app
  /welcome          → Halaman landing (login/register)
  /login            → Halaman login
  /register         → Halaman registrasi
  /home             → Daftar produk utama
  /product/[id]     → Detail produk
  /search           → Pencarian produk
  /favorites        → Produk favorit
  /cart             → Keranjang belanja
  /checkout         → Halaman checkout (demo)
  /profile          → Profil pengguna
  /admin            → Halaman admin (opsional)

/components
  /layout           → Navbar, bottom‑nav, header
  /ui               → Button, Input, dll.
  product‑card.tsx  → Kartu produk
  empty‑state.tsx   → UI kosong

/lib
  supabaseClient.js → Klien Supabase
  products.ts       → Data produk (mock/API)
  format.ts         → Helper format

/store
  cart.ts           → State keranjang (Zustand)
  favorites.ts      → State favorit (Zustand)

/public             → Gambar, logo, ikon PWA
```

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4** (mobile‑first)
- **Zustand** (state management)
- **Supabase** (auth + database)
- **TypeScript** (opsional)
- **PWA** (Progressive Web App)

## ✨ Fitur Utama

- ✅ Autentikasi pengguna (login/register via Supabase)
- ✅ Daftar produk dari database
- ✅ Halaman detail produk
- ✅ Tambah ke keranjang
- ✅ Sistem favorit
- ✅ Profil pengguna (edit profil)
- ✅ Alur checkout (demo tanpa gateway pembayaran)
- ✅ Bottom navigation (Home, Search, Favorites, Profile)
- ✅ UI mobile‑first (max‑width 430px)

## 🔧 Integrasi Supabase

Proyek sudah dikonfigurasi dengan kredensial Supabase. Pastikan variabel lingkungan berikut ada di `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://aaelmacpizmfmbvpcbee.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_RNzGyfxwRRwEx4U60_RsCg__cl3yK1a
```

## 📱 UI/UX Guidelines

- **Mobile‑first** – semua halaman dirancang untuk lebar maksimum 430px
- **Layout** – gunakan `max‑w‑md mx‑auto` untuk container
- **Bottom navigation** – tetap muncul di halaman utama
- **Clean design** – mengacu pada referensi Figma di folder `layout‑from‑figma`

## 🧪 Testing & Lint

```bash
npm run lint      # Jalankan ESLint
# (belum ada test runner, bisa ditambahkan)
```

## 📄 Lisensi

Proyek ini dibuat untuk keperluan demo tugas UI/UX. Bebas digunakan dan dimodifikasi.

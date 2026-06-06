# 📦 Cara Upload APK untuk Download

## 🎯 Langkah-langkah

Sekarang tombol "Download APK" sudah ada di halaman welcome, tapi file APK-nya belum ada. Ada beberapa cara:

## Opsi 1: Host di Folder Public (Simpel)

### 1. Build APK dulu dari Android Studio

```bash
# Buka Android Studio
npm run android:open

# Di Android Studio:
# Build > Build Bundle(s) / APK(s) > Build APK(s)

# APK akan tersimpan di:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 2. Copy APK ke folder public

```bash
# Copy APK ke public folder
cp android/app/build/outputs/apk/debug/app-debug.apk public/app-release.apk

# Atau kalau sudah build release:
cp android/app/build/outputs/apk/release/app-release.apk public/app-release.apk
```

### 3. Deploy website

```bash
# Build Next.js untuk production
npm run build

# Deploy ke Vercel/Netlify/hosting lainnya
```

**Kelemahan**: File APK besar (~50-80MB), bisa bikin website lambat loading.

---

## Opsi 2: Host di CDN/Cloud Storage (RECOMMENDED)

Upload APK ke:

### A. Google Drive
1. Upload `app-release.apk` ke Google Drive
2. Set sharing ke "Anyone with the link"
3. Copy link download
4. Update link di `components/install-app-button.tsx`:
```tsx
href="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
```

### B. Dropbox
1. Upload APK ke Dropbox
2. Get shareable link
3. Change `?dl=0` menjadi `?dl=1`
4. Update link di component

### C. GitHub Releases
1. Push code ke GitHub
2. Buat Release baru
3. Upload APK sebagai asset
4. Copy download URL
5. Update link di component

### D. Firebase Storage / Supabase Storage
1. Upload APK ke Firebase/Supabase
2. Generate public URL
3. Update link di component

---

## Opsi 3: Build APK Sekarang (Debug)

Untuk testing cepat, saya bisa bantuin build APK debug sekarang:

```bash
# 1. Build debug APK
cd android && ./gradlew assembleDebug

# 2. Copy ke public
cp app/build/outputs/apk/debug/app-debug.apk ../public/app-release.apk
```

⚠️ **Catatan**: APK debug tidak bisa di-upload ke Play Store, hanya untuk testing.

---

## 🚀 Untuk Production (Play Store)

1. **Generate Keystore** (sekali saja):
```bash
keytool -genkey -v -keystore ecommerce-release.keystore -alias ecommerce -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing** di `android/app/build.gradle`

3. **Build Release AAB**:
```bash
cd android && ./gradlew bundleRelease
```

4. **Upload ke Play Console**:
   - File: `android/app/build/outputs/bundle/release/app-release.aab`
   - Play Store akan generate APK otomatis untuk user

---

## 📝 Update Link Download

Setelah upload APK, edit file:

**components/install-app-button.tsx**

Ganti:
```tsx
href="/app-release.apk"  // ← Link lokal
```

Menjadi:
```tsx
href="https://your-cdn-url.com/app-release.apk"  // ← Link CDN
```

---

## 💡 Rekomendasi

**Untuk Testing**: Opsi 1 (folder public)
**Untuk Production**: Opsi 2 (CDN) atau langsung ke Play Store

Mau saya bantuin build APK debug sekarang? Atau mau langsung setup untuk Play Store?

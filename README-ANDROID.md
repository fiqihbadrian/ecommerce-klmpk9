# E-Commerce Klmpk9 - Versi Android 📱

Ini adalah versi Android dari proyek e-commerce yang dibuat dengan **Capacitor**.

## 📁 Struktur Folder

```
ecommerce-klmpk9/          → Proyek web original (Next.js)
ecommerce-klmpk9-android/  → Proyek Android (Capacitor) ← FOLDER INI
```

## 🚀 Cara Menjalankan

### 1. Build Ulang Next.js (Jika Ada Perubahan)

```bash
npm run build
```

### 2. Sync ke Android

```bash
npx cap sync android
```

### 3. Buka Android Studio

```bash
npx cap open android
```

### 4. Run di Emulator atau Device

- Di Android Studio, klik tombol **Run** (▶️)
- Pilih emulator atau device fisik
- Aplikasi akan terinstall dan berjalan

## 📦 Build APK/AAB untuk Play Store

### Opsi 1: Build Debug APK (untuk testing)

1. Buka Android Studio
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. APK akan tersimpan di: `android/app/build/outputs/apk/debug/app-debug.apk`

### Opsi 2: Build Release AAB (untuk Play Store)

1. Generate keystore (sekali saja):
   ```bash
   keytool -genkey -v -keystore ecommerce-release.keystore -alias ecommerce -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Edit `android/app/build.gradle`, tambahkan di dalam `android {}`:
   ```gradle
   signingConfigs {
       release {
           storeFile file("../../ecommerce-release.keystore")
           storePassword "YOUR_PASSWORD"
           keyAlias "ecommerce"
           keyPassword "YOUR_PASSWORD"
       }
   }
   
   buildTypes {
       release {
           signingConfig signingConfigs.release
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
   }
   ```

3. Build AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

4. AAB akan tersimpan di: `android/app/build/outputs/bundle/release/app-release.aab`

## 🔧 Update Aplikasi

Jika ada perubahan di kode Next.js:

```bash
# 1. Build Next.js
npm run build

# 2. Sync ke Android
npx cap sync android

# 3. Run ulang di Android Studio
npx cap open android
```

## 📝 Konfigurasi

### App Name & Package

Edit `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.klmpk9.ecommerce',      // Package name
  appName: 'E-Commerce Klmpk9',       // Nama app
  webDir: 'out'                        // Output Next.js
};
```

### App Icon & Splash Screen

1. Ganti icon di: `android/app/src/main/res/`
   - `mipmap-hdpi/` → 72x72
   - `mipmap-mdpi/` → 48x48
   - `mipmap-xhdpi/` → 96x96
   - `mipmap-xxhdpi/` → 144x144
   - `mipmap-xxxhdpi/` → 192x192

2. Atau gunakan plugin:
   ```bash
   npm install @capacitor/assets --save-dev
   npx capacitor-assets generate
   ```

## 🎯 Fitur Native (Opsional)

### Push Notifications

```bash
npm install @capacitor/push-notifications
npx cap sync
```

### Camera

```bash
npm install @capacitor/camera
npx cap sync
```

### Geolocation

```bash
npm install @capacitor/geolocation
npx cap sync
```

## ⚠️ Catatan Penting

1. **Folder `android/`** hanya ada di `ecommerce-klmpk9-android/`
2. **Jangan edit kode di folder `android/app/src/main/assets/public/`** → Itu auto-generated
3. **Edit kode di folder `app/`, `components/`, `lib/`** → Lalu build ulang
4. **Perubahan di `.env.local`** perlu rebuild Next.js dan sync ulang

## 🐛 Troubleshooting

### Build error "SDK location not found"

Buat file `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### Error "Gradle sync failed"

```bash
cd android
./gradlew clean
```

### App tidak update setelah sync

```bash
npx cap sync android --inline
```

## 📱 Hasil Akhir

- UI **100% sama** dengan versi web
- Bisa diinstall di Android
- Bisa dipublish ke Google Play Store
- Ukuran app: ~50-80MB

## 📚 Dokumentasi

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Studio](https://developer.android.com/studio)
- [Google Play Console](https://play.google.com/console)

---

**Dibuat oleh Kelompok 9** 🚀

# 📱 Workflow Pengembangan Android

## 🎯 Cara Kerja

Sekarang project sudah **disatuin** dalam satu folder:
```
ecommerce-klmpk9/
├── android/          ← Project Android
├── app/              ← Source code Next.js
├── components/       ← Components React
├── lib/              ← Utils & API
├── out/              ← Build output (auto-generated)
└── capacitor.config.ts
```

## 🚀 Development Workflow

### 1. Untuk Web Development (Normal)

```bash
npm run dev
```
Buka http://localhost:3000 dan edit code seperti biasa.

### 2. Untuk Testing di Android

#### Opsi A: Build + Sync + Open (Lengkap)
```bash
npm run android:run
```
Ini akan:
1. Build Next.js → folder `out/`
2. Sync ke Android project
3. Buka Android Studio

#### Opsi B: Step by Step

```bash
# 1. Build Next.js
npm run build

# 2. Sync ke Android
npm run android:sync

# 3. Buka Android Studio
npm run android:open
```

#### Opsi C: Sync Aja (Kalau Sudah Build)

```bash
npm run android:sync
```

## 📝 Skenario Umum

### Scenario 1: Edit UI/Component
```bash
# 1. Edit file di app/ atau components/
# 2. Test di browser dulu
npm run dev

# 3. Kalau OK, build untuk Android
npm run android:build

# 4. Run di Android Studio
npm run android:open
```

### Scenario 2: Edit API/Logic
```bash
# 1. Edit file di lib/
# 2. Test di browser
npm run dev

# 3. Build + sync ke Android
npm run android:build
```

### Scenario 3: Perubahan Kecil (Hot Reload)
```bash
# Kalau lagi develop, edit → save → refresh browser
npm run dev

# Pas mau test di Android baru:
npm run android:run
```

## 🔄 Auto-Update?

**Tidak ada auto-sync otomatis**, tapi workflow-nya simpel:

1. **Edit code** di `app/`, `components/`, `lib/` (seperti biasa)
2. **Test di browser** dengan `npm run dev`
3. **Kalau OK**, jalankan `npm run android:build`
4. **Run di Android Studio**

## 📦 NPM Scripts Tersedia

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Development server (web) |
| `npm run build` | Build Next.js → folder `out/` |
| `npm run android:build` | Build Next.js + sync ke Android |
| `npm run android:sync` | Sync folder `out/` ke Android (tanpa build ulang) |
| `npm run android:open` | Buka Android Studio |
| `npm run android:run` | Build + sync + open (lengkap) |

## 🎨 Update Icon/Splash Screen

Edit file di:
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

Atau pakai tool:
```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

## 📱 Build APK untuk Testing

1. Buka Android Studio: `npm run android:open`
2. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. APK akan tersimpan di: `android/app/build/outputs/apk/debug/app-debug.apk`
4. Install manual di HP atau share ke teman

## 🚀 Build AAB untuk Play Store

Lihat panduan lengkap di: **README-ANDROID.md**

Singkatnya:
1. Generate keystore
2. Configure signing di `android/app/build.gradle`
3. Run: `cd android && ./gradlew bundleRelease`
4. Upload `app-release.aab` ke Play Console

## 🐛 Troubleshooting

### "Module not found" setelah edit code
```bash
rm -rf .next out
npm run build
npm run android:sync
```

### Android tidak update setelah sync
```bash
# Force sync
npx cap sync android --inline

# Atau clean build di Android Studio
cd android && ./gradlew clean
```

### Perubahan di .env.local tidak terapply
```bash
# Restart dev server
# ATAU rebuild untuk Android
npm run android:build
```

## 💡 Tips

1. **Selalu test di browser dulu** sebelum build ke Android
2. **Commit code sering** sebelum experiment di Android
3. **Folder `out/` dan `android/build/` sudah di-ignore** di git
4. **Folder `android/` bisa di-commit** kalau mau simpan konfigurasi Android
5. **Edit code hanya di `app/`, `components/`, `lib/`** - jangan edit di `out/` atau `android/app/src/main/assets/`

## 📚 File Penting

- `capacitor.config.ts` → Config app name, package ID
- `next.config.ts` → Config Next.js (sudah set `output: 'export'`)
- `README-ANDROID.md` → Panduan lengkap Android
- `.gitignore` → Sudah include Android build files

---

**Happy coding!** 🚀

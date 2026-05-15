# Mobile Performance Optimization

## Masalah di Mobile Device

Aplikasi freeze/patah-patah **hanya di HP**, tidak di laptop karena:

1. **Mobile CPU lebih lemah** - Tidak bisa handle banyak animasi sekaligus
2. **Touch events lebih berat** - Scroll + hover effects bersamaan
3. **GPU rendering** - Transform animations trigger repaints
4. **Memory constraints** - Mobile punya RAM lebih sedikit

## Optimasi Tambahan untuk Mobile

### 1. **Remove Hover Transform Animation**
```tsx
// BEFORE (berat di mobile)
className="transition hover:-translate-y-1 hover:shadow-[...]"

// AFTER (ringan)
className="transition-shadow hover:shadow-[...]"
style={{ willChange: 'auto' }}
```

### 2. **Optimize Bottom Nav Animation**
```tsx
// Pisahkan transform dari transition class
style={{
  transform: `translateX(-50%) scale(${bubbleVisible ? 1 : 0.9})`,
  willChange: 'opacity', // Hanya animate opacity
}}
```

### 3. **Remove Smooth Scroll**
```css
/* globals.css - BEFORE */
html {
  scroll-behavior: smooth; /* Berat di mobile */
}

/* AFTER */
html {
  /* scroll-behavior: smooth; */ /* Disabled */
}
```

### 4. **Add Mobile-Specific CSS**
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent; /* Remove tap flash */
}
```

### 5. **Prioritize LCP Image**
```tsx
// Logo di HomeTopNav
<Image src="/logo.png" alt="Logo" width={50} height={50} priority />
```

### 6. **Add data-scroll-behavior**
```tsx
// layout.tsx
<html data-scroll-behavior="smooth">
```

## Perubahan File

1. ✅ `components/product-card.tsx` - Remove hover transform
2. ✅ `components/layout/bottom-nav.tsx` - Optimize animation
3. ✅ `components/layout/home-top-nav.tsx` - Add priority to logo
4. ✅ `app/globals.css` - Remove smooth scroll, add mobile optimizations
5. ✅ `app/layout.tsx` - Add data-scroll-behavior

## Testing di Mobile

### Chrome DevTools Mobile Emulation:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" atau device lain
4. Throttle CPU: 4x slowdown
5. Test scroll performance

### Real Device Testing:
1. Connect HP ke same network
2. Access: http://192.168.101.5:3000/home
3. Test scroll, tap, animations

## Performance Metrics Target

- **FPS:** 60fps (smooth)
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

## Tips Debugging Mobile Performance

```bash
# Check bundle size
npm run build
npm run start

# Analyze bundle
npx @next/bundle-analyzer
```

### Chrome DevTools Performance:
1. Record while scrolling
2. Check "Main" thread
3. Look for long tasks (> 50ms)
4. Check "Frames" for dropped frames

## Common Mobile Performance Issues

❌ **Avoid:**
- Multiple transform animations
- Hover effects on touch devices
- Large images without optimization
- Too many re-renders
- Heavy JavaScript on scroll

✅ **Use:**
- CSS transitions (opacity, transform)
- `will-change` sparingly
- Lazy loading
- Memoization
- Debouncing/throttling

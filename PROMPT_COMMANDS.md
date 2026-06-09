# Prompt Commands untuk Generate Code

## Setup Awal Project

### Command 1: Setup Project Vite + React + TypeScript
```bash
npm create vite@latest recipe-app -- --template react-ts
cd recipe-app
npm install
```

### Command 2: Install Semua Dependencies Sekaligus
```bash
npm install react-router@latest lucide-react @mui/material @emotion/react @emotion/styled @mui/icons-material @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip canvas-confetti clsx tailwind-merge class-variance-authority motion date-fns react-hook-form sonner embla-carousel-react react-dnd react-dnd-html5-backend react-popper @popperjs/core cmdk input-otp react-day-picker react-resizable-panels react-slick recharts vaul next-themes react-responsive-masonry
```

### Command 3: Install Tailwind CSS v4
```bash
npm install tailwindcss@latest @tailwindcss/vite@latest
```

---

## Prompt untuk AI Code Generator

### Prompt 1: Generate Theme Context
```
Buatkan React Context untuk tema aplikasi dengan:
- 3 tema: fresh (hijau), pink (pink), dark (biru gelap)
- Setiap tema punya colors: primary, secondary, accent, background, cardBg, text, textSecondary, danger
- Simpan pilihan tema di localStorage
- Export useTheme hook
- TypeScript support
```

### Prompt 2: Generate Recipe Data Structure
```
Buatkan interface dan data untuk aplikasi resep masak dengan:
- Interface Recipe dengan: id, title, emoji, categoryId, categoryName, time, difficulty, description, ingredients (name & amount), steps, nutrition, tips
- Interface Category dengan: id, name, emoji, description, color, recipes array
- Interface KitchenTool dengan: id, title, category, emoji, videoUrl, content array, isDanger
- Export helper functions: getRecipeById, getRecipesByCategory, getCategoryById
- Minimal 4 kategori: sarapan, makan-siang, cemilan, minuman
- Setiap kategori ada 2-3 resep contoh
- TypeScript support
```

### Prompt 3: Generate VoiceOver Component
```
Buatkan komponen React VoiceOver untuk text-to-speech dengan:
- Props: text, autoPlay (default false), rate (default 1.0), onEnd callback
- Gunakan Web Speech API (speechSynthesis)
- Support bahasa Indonesia (id-ID)
- UI button untuk play, pause, resume, stop
- Animasi gelombang suara saat playing
- Icons dari lucide-react
- Styling dengan tema dari useTheme context
- TypeScript support
```

### Prompt 4: Generate BottomNav Component
```
Buatkan komponen Bottom Navigation dengan:
- 4 menu: Beranda (/kategori), Favorit (/favorit), Alat Dapur (/alat-dapur), Profil (/profil)
- Icons dari lucide-react: Home, Heart, Wrench, User
- Highlight menu yang aktif sesuai current path
- Fixed position di bottom
- Responsive untuk mobile & desktop
- Warna dari useTheme context
- TypeScript support
```

### Prompt 5: Generate SplashScreen
```
Buatkan halaman Splash Screen dengan:
- Logo/emoji chef besar (👨‍🍳)
- Judul app "Ayo Masak!"
- Subtitle "Belajar masak itu mudah dan menyenangkan! 🍳"
- Loading indicator (3 dots animasi)
- Auto redirect ke /kategori setelah 3 detik
- Background gradient dari tema
- Animasi bounce untuk logo
- TypeScript + React Router
```

### Prompt 6: Generate CategoryScreen
```
Buatkan halaman Category dengan:
- Header gradient dengan icon ChefHat dan judul
- Grid kategori (2 kolom di desktop, 1 kolom di mobile)
- Setiap card kategori: emoji besar, nama, deskripsi, jumlah resep
- Border kiri dengan warna kategori
- Hover effect scale emoji
- Navigate ke /kategori/:id saat di-klik
- Bottom Navigation
- Data dari categories array
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 7: Generate RecipeListScreen
```
Buatkan halaman Recipe List dengan:
- URL param categoryId
- Tombol back ke /kategori
- Header dengan emoji & nama kategori
- Grid card resep (2 kolom desktop, 1 kolom mobile)
- Card resep: emoji, title, description, time, difficulty badge
- Navigate ke /resep/:id saat di-klik
- Handle kategori tidak ditemukan
- Handle kategori kosong (belum ada resep)
- Bottom Navigation
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 8: Generate RecipeDetail (Singkat)
```
Buatkan halaman Recipe Detail dengan:
- URL param recipeId
- Tombol back
- Hero section: emoji besar, title, time, difficulty
- Tabs: Bahan & Langkah
- Tab Bahan: list ingredients dengan checkbox
- Tab Langkah: numbered steps dengan VoiceOver button per step
- Tombol "Mulai Masak" navigate ke /checklist/:id
- Handle resep tidak ditemukan
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 9: Generate ChecklistScreen
```
Buatkan halaman Checklist dengan:
- URL param recipeId
- Tombol back ke recipe detail
- Progress bar dengan percentage
- List bahan dengan checkbox interaktif
- State tracking untuk setiap checkbox
- Motivational text berdasarkan progress
- Bottom button "Lanjut Masak" (disabled jika belum semua di-check)
- Navigate ke /selesai?recipeId=xxx saat semua checked
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 10: Generate CompletionScreen
```
Buatkan halaman Completion dengan:
- Confetti background dengan warna tema
- Chef mascot dengan party hat (SVG)
- Judul "Yeay, Kamu Berhasil! 🎉"
- Achievement badge card dengan star icon
- Cooking summary: emoji resep, nama, waktu
- Action buttons: "Coba Resep Lain", "Kembali ke Menu"
- Share buttons: Instagram, WhatsApp
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 11: Generate ProfilScreen
```
Buatkan halaman Profil dengan:
- Header gradient
- Section pilih tema dengan 3 pilihan: fresh, pink, dark
- Setiap pilihan tema: emoji, nama, color preview, checkmark jika aktif
- Click tema untuk ganti (update context)
- Section "Tentang Aplikasi" dengan deskripsi
- Bottom Navigation
- Styling dengan useTheme
- TypeScript + React
```

### Prompt 12: Generate KitchenToolsListScreen
```
Buatkan halaman Kitchen Tools List dengan:
- Header "Pengenalan Alat Dapur"
- Grid card alat dapur (2 kolom desktop, 1 kolom mobile)
- Card: emoji, title, warning badge jika isDanger
- Navigate ke /alat/:toolId saat di-klik
- Bottom Navigation
- Data dari kitchenTools array
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 13: Generate KitchenToolsScreen
```
Buatkan halaman Kitchen Tool Detail dengan:
- URL param toolId
- Tombol back
- Header dengan emoji & title alat
- Danger warning jika isDanger = true
- Optional video embed dari YouTube
- Section langkah-langkah dengan:
  - Tombol "Dengarkan Semua"
  - Speed control (Lambat/Normal/Cepat)
  - List langkah dengan VoiceOver button per step
  - Highlight step yang sedang playing
- Success message di bawah
- Bottom Navigation
- Styling dengan useTheme
- TypeScript + React Router
```

### Prompt 14: Generate Main App Router
```
Buatkan App.tsx dengan:
- BrowserRouter wrapping semua routes
- ThemeProvider wrapping router
- Routes untuk:
  - / → SplashScreen
  - /kategori → CategoryScreen
  - /kategori/:categoryId → RecipeListScreen
  - /resep/:recipeId → RecipeDetail
  - /checklist/:recipeId → ChecklistScreen
  - /selesai → CompletionScreen
  - /favorit → FavoritScreen
  - /profil → ProfilScreen
  - /alat-dapur → KitchenToolsListScreen
  - /alat/:toolId → KitchenToolsScreen
- TypeScript + React Router v7
```

---

## Prompt untuk Styling

### Prompt 15: Generate theme.css
```
Buatkan file CSS dengan:
- Import Tailwind CSS (@import "tailwindcss")
- CSS reset: margin, padding, box-sizing
- Body font: system fonts
- Custom CSS variables untuk warna tema
- Smooth scrolling
- Anti-aliasing fonts
```

### Prompt 16: Generate Responsive Utilities
```
Buatkan utility classes Tailwind untuk:
- Container max-width 4xl
- Padding responsive (4 di mobile, 8 di desktop)
- Text size responsive (base di mobile, lg di desktop)
- Grid responsive (1 kolom mobile, 2 kolom desktop)
- Shadow levels: sm, md, lg, xl
```

---

## Prompt untuk Features

### Prompt 17: Generate Favorites System
```
Buatkan sistem favorit dengan:
- Custom hook useFavorites
- State tersimpan di localStorage
- Functions: addFavorite, removeFavorite, isFavorite, getFavorites
- FavoritScreen menampilkan grid recipe cards
- Tombol heart di RecipeDetail untuk toggle favorite
- TypeScript support
```

### Prompt 18: Generate Search Feature
```
Buatkan fitur search dengan:
- Search input di CategoryScreen
- Real-time filtering recipes
- Search by: title, ingredients, category
- Highlight matching text
- Clear button
- Debounced search (300ms)
- TypeScript support
```

### Prompt 19: Generate Timer Component
```
Buatkan komponen Timer dengan:
- Countdown timer (MM:SS format)
- Props: duration (seconds), onComplete callback
- UI: large time display, progress ring, pause/resume buttons
- Sound notification saat selesai
- Styling dengan tema
- TypeScript support
```

### Prompt 20: Generate Print Recipe
```
Buatkan fitur print recipe dengan:
- Button "Print Resep" di RecipeDetail
- Print-friendly CSS (@media print)
- Include: title, emoji, ingredients, steps
- Hide: navigation, buttons, decorative elements
- Page break antara sections
```

---

## Quick Reference Commands

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npx tsc --noEmit
```

### Lint Code
```bash
npm run lint
```

### Format Code (jika pakai Prettier)
```bash
npx prettier --write "src/**/*.{ts,tsx,css}"
```

---

## File Structure Generator Prompt

```
Buatkan struktur folder untuk project React dengan:

src/
├── app/
│   ├── components/
│   │   ├── ui/               (Reusable UI components)
│   │   ├── SplashScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── RecipeListScreen.tsx
│   │   ├── RecipeDetail.tsx
│   │   ├── ChecklistScreen.tsx
│   │   ├── CompletionScreen.tsx
│   │   ├── FavoritScreen.tsx
│   │   ├── ProfilScreen.tsx
│   │   ├── KitchenToolsListScreen.tsx
│   │   ├── KitchenToolsScreen.tsx
│   │   ├── VoiceOver.tsx
│   │   ├── BottomNav.tsx
│   │   └── ChefMascot.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── recipes.ts
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   └── useLocalStorage.ts
│   └── App.tsx
├── styles/
│   ├── theme.css
│   └── fonts.css
└── main.tsx
```

---

## Testing Prompts

### Prompt 21: Generate Unit Tests
```
Buatkan unit tests untuk komponen VoiceOver dengan:
- Test library: Vitest + React Testing Library
- Test cases:
  - Render component dengan text
  - Click play button memulai speech
  - Click pause button pause speech
  - Click stop button stop speech
  - onEnd callback dipanggil saat selesai
- Mock speechSynthesis API
- TypeScript support
```

### Prompt 22: Generate Integration Tests
```
Buatkan integration tests untuk flow masak dengan:
- Test library: Vitest + React Testing Library
- Test flow:
  1. Pilih kategori
  2. Pilih resep
  3. Centang semua bahan di checklist
  4. Klik "Lanjut Masak"
  5. Verify redirect ke completion screen
- Mock router navigation
- TypeScript support
```

---

## Deployment Prompts

### Prompt 23: Generate Vercel Config
```
Buatkan konfigurasi deployment Vercel dengan:
- vercel.json file
- Build command: npm run build
- Output directory: dist
- Node version: 18.x
- SPA routing support
- Environment variables template
```

### Prompt 24: Generate Netlify Config
```
Buatkan konfigurasi deployment Netlify dengan:
- netlify.toml file
- Build command: npm run build
- Publish directory: dist
- Redirect rules untuk SPA
- Headers untuk caching
```

---

## Performance Optimization Prompts

### Prompt 25: Add Code Splitting
```
Implementasikan code splitting untuk:
- Lazy load semua route components
- Suspense dengan loading fallback
- Error boundary untuk handle errors
- Preload critical routes
- TypeScript support
```

### Prompt 26: Add Image Optimization
```
Implementasikan image optimization dengan:
- Lazy loading images
- Responsive images (srcset)
- WebP format dengan fallback
- Blur placeholder saat loading
- Error handling untuk broken images
```

---

## Accessibility Prompts

### Prompt 27: Add A11y Features
```
Tambahkan accessibility features:
- ARIA labels untuk semua interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Focus indicators yang jelas
- Screen reader friendly text
- Color contrast yang baik (WCAG AA)
- Skip to main content link
```

### Prompt 28: Add Dark Mode
```
Implementasikan dark mode dengan:
- Toggle di ProfilScreen
- Persist preference di localStorage
- Smooth transition animasi
- Update semua warna tema
- Respect system preference (prefers-color-scheme)
```

---

## SEO & Meta Tags Prompts

### Prompt 29: Add Meta Tags
```
Tambahkan SEO meta tags untuk:
- Title tag per halaman
- Description tag
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) untuk recipes
- Favicon & app icons
```

### Prompt 30: Generate Sitemap
```
Generate sitemap.xml dengan:
- Semua static routes
- Dynamic routes untuk recipes & categories
- Priority & changefreq
- Lastmod timestamps
- Submit ke Google Search Console
```

---

## Kesimpulan

File ini berisi 30+ prompt yang bisa langsung digunakan untuk generate code atau sebagai panduan development. Gunakan prompt-prompt ini sesuai kebutuhan project kamu.

**Tips:**
- Copy-paste prompt ke ChatGPT/Claude untuk generate code
- Modifikasi prompt sesuai kebutuhan spesifik
- Kombinasikan beberapa prompt untuk fitur kompleks
- Selalu review & test code yang di-generate

**Selamat mengembangkan aplikasi! 💻✨**

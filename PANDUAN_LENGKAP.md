# Panduan Lengkap Membuat Aplikasi Resep Masak Anak

## 📋 Daftar Isi
1. [Setup Project Awal](#setup-project-awal)
2. [Instalasi Dependencies](#instalasi-dependencies)
3. [Struktur Folder](#struktur-folder)
4. [Konfigurasi](#konfigurasi)
5. [Sistem Tema](#sistem-tema)
6. [Data & Models](#data--models)
7. [Komponen UI](#komponen-ui)
8. [Halaman Utama](#halaman-utama)
9. [Routing](#routing)
10. [Fitur Audio](#fitur-audio)

---

## Setup Project Awal

### 1. Buat Project React + Vite

```bash
# Buat project baru
npm create vite@latest recipe-app -- --template react-ts

# Masuk ke folder project
cd recipe-app

# Install dependencies dasar
npm install
```

### 2. Install Tailwind CSS v4

```bash
npm install tailwindcss@latest @tailwindcss/vite@latest
```

---

## Instalasi Dependencies

### Dependencies Utama

```bash
# React Router untuk navigasi
npm install react-router@latest

# Lucide React untuk icons
npm install lucide-react

# Material UI (optional untuk komponen tambahan)
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Radix UI untuk komponen UI
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip

# Utility libraries
npm install clsx tailwind-merge class-variance-authority

# Canvas Confetti untuk efek perayaan
npm install canvas-confetti

# Motion untuk animasi
npm install motion

# Date utilities
npm install date-fns

# Form handling
npm install react-hook-form

# Toast notifications
npm install sonner

# Carousel
npm install embla-carousel-react

# Drag and drop
npm install react-dnd react-dnd-html5-backend

# Popper untuk positioning
npm install react-popper @popperjs/core

# Command palette
npm install cmdk

# Input OTP
npm install input-otp

# Day picker
npm install react-day-picker

# Resizable panels
npm install react-resizable-panels

# Slick carousel
npm install react-slick

# Charts
npm install recharts

# Drawer component
npm install vaul

# Theme provider
npm install next-themes

# Masonry layout
npm install react-responsive-masonry
```

---

## Struktur Folder

```
src/
├── app/
│   ├── components/
│   │   ├── ui/               # Komponen UI reusable
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── figma/            # Komponen Figma
│   │   │   └── ImageWithFallback.tsx
│   │   ├── BottomNav.tsx     # Navigasi bawah
│   │   ├── CategoryScreen.tsx
│   │   ├── RecipeListScreen.tsx
│   │   ├── RecipeDetail.tsx
│   │   ├── ChecklistScreen.tsx
│   │   ├── CompletionScreen.tsx
│   │   ├── FavoritScreen.tsx
│   │   ├── ProfilScreen.tsx
│   │   ├── KitchenToolsListScreen.tsx
│   │   ├── KitchenToolsScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── VoiceOver.tsx
│   │   ├── DangerWarning.tsx
│   │   ├── ChefMascot.tsx
│   │   └── MiniChefAvatar.tsx
│   ├── context/
│   │   └── ThemeContext.tsx  # Context untuk tema
│   ├── data/
│   │   └── recipes.ts        # Data resep & alat dapur
│   └── App.tsx               # Main app component
├── styles/
│   ├── theme.css             # CSS variables untuk tema
│   └── fonts.css             # Font imports
├── imports/                  # Assets imported
└── main.tsx                  # Entry point
```

---

## Konfigurasi

### 1. vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### 2. postcss.config.mjs

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

### 3. tsconfig.json (tambahkan path alias)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## Sistem Tema

### 1. ThemeContext.tsx

```typescript
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Theme = "fresh" | "pink" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  danger: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeConfigs: Record<Theme, ThemeColors> = {
  fresh: {
    primary: "#2E7D32",
    secondary: "#FF7043",
    accent: "#FFD600",
    background: "#F9F9F9",
    cardBg: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#757575",
    danger: "#D32F2F",
  },
  pink: {
    primary: "#E91E63",
    secondary: "#FF6B9D",
    accent: "#FFD54F",
    background: "#FFF0F5",
    cardBg: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#757575",
    danger: "#C2185B",
  },
  dark: {
    primary: "#1976D2",
    secondary: "#42A5F5",
    accent: "#FFC107",
    background: "#121212",
    cardBg: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    danger: "#F44336",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("app-theme");
    return (saved as Theme) || "fresh";
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const colors = themeConfigs[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

### 2. theme.css

```css
@import "tailwindcss";

/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Theme Variables */
:root {
  --color-primary: #2E7D32;
  --color-secondary: #FF7043;
  --color-accent: #FFD600;
  --color-background: #F9F9F9;
  --color-card: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-secondary: #757575;
  --color-danger: #D32F2F;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

---

## Data & Models

### recipes.ts

```typescript
// Types
export interface Recipe {
  id: string;
  title: string;
  emoji: string;
  categoryId: string;
  categoryName: string;
  time: string;
  difficulty: "mudah" | "sedang" | "sulit";
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  tips?: string[];
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  recipes: Recipe[];
}

export interface KitchenTool {
  id: string;
  title: string;
  category: string;
  emoji: string;
  videoUrl?: string;
  content: string[];
  isDanger?: boolean;
}

// Categories Data
export const categories: Category[] = [
  {
    id: "sarapan",
    name: "Sarapan",
    emoji: "🍳",
    description: "Resep sarapan sehat & praktis",
    color: "#FFD54F",
    recipes: [
      {
        id: "telur-orak-arik",
        title: "Telur Orak-Arik Simple",
        emoji: "🍳",
        categoryId: "sarapan",
        categoryName: "Sarapan",
        time: "~10 menit",
        difficulty: "mudah",
        description: "Telur orak-arik lembut yang cocok untuk sarapan",
        ingredients: [
          { name: "Telur", amount: "2 butir" },
          { name: "Garam", amount: "Sejumput" },
          { name: "Mentega", amount: "1 sdm" },
          { name: "Susu cair", amount: "2 sdm" }
        ],
        steps: [
          "Kocok telur dengan garpu di mangkuk",
          "Tambahkan garam dan susu, aduk rata",
          "Panaskan wajan dengan mentega api kecil",
          "Tuang kocokan telur",
          "Aduk perlahan dengan spatula sampai matang",
          "Angkat dan sajikan hangat"
        ],
        nutrition: {
          calories: "180 kcal",
          protein: "13g",
          carbs: "2g",
          fat: "14g"
        },
        tips: [
          "Gunakan api kecil agar telur tidak gosong",
          "Jangan terlalu lama diaduk agar tetap lembut"
        ]
      }
      // Tambahkan resep lainnya...
    ]
  },
  {
    id: "makan-siang",
    name: "Makan Siang",
    emoji: "🍱",
    description: "Menu makan siang mengenyangkan",
    color: "#4CAF50",
    recipes: []
  },
  {
    id: "cemilan",
    name: "Cemilan",
    emoji: "🍪",
    description: "Cemilan enak & mudah dibuat",
    color: "#FF7043",
    recipes: []
  },
  {
    id: "minuman",
    name: "Minuman",
    emoji: "🥤",
    description: "Minuman segar & menyehatkan",
    color: "#42A5F5",
    recipes: []
  }
];

// Kitchen Tools Data
export const kitchenTools: KitchenTool[] = [
  {
    id: "cara-memegang-pisau",
    title: "Cara Memegang Pisau yang Benar",
    category: "pengenalan-alat",
    emoji: "🔪",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: [
      "Pilih pisau yang tajam dan bersih.",
      "Pegang gagang pisau dengan nyaman menggunakan tangan dominan (kanan/kiri).",
      "Jempol dan telunjuk mencubit pangkal mata pisau untuk kontrol lebih baik.",
      "Tangan satunya memegang bahan makanan dengan jari-jari menekuk ke dalam (seperti cakar kucing).",
      "Ujung pisau tetap menempel di talenan, gerakkan hanya bagian belakang pisau naik-turun.",
      "Potong dengan gerakan mendorong dan menarik, jangan menekan terlalu keras."
    ],
    isDanger: true
  },
  {
    id: "teknik-memotong-bahan",
    title: "Teknik Memotong Bahan Makanan",
    category: "pengenalan-alat",
    emoji: "🥕",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: [
      "Gunakan talenan yang stabil dan tidak licin.",
      "Cuci bersih bahan makanan sebelum dipotong.",
      "Untuk bawang: potong ujungnya, belah dua, kupas kulitnya, lalu iris tipis atau dadu.",
      "Untuk wortel: kupas kulitnya, potong ujung-ujungnya, iris bulat atau korek api.",
      "Untuk sayuran daun: gulung beberapa lembar jadi satu, iris melintang (chiffonade).",
      "Selalu potong menjauhi tubuh, jangan mengarah ke diri sendiri.",
      "Jika bahan bulat (tomat, kentang), potong dulu menjadi dua agar stabil di talenan."
    ],
    isDanger: true
  }
];

// Helper Functions
export function getRecipeById(id: string): Recipe | undefined {
  for (const category of categories) {
    const recipe = category.recipes.find((r) => r.id === id);
    if (recipe) return recipe;
  }
  return undefined;
}

export function getRecipesByCategory(categoryId: string): Recipe[] {
  const category = categories.find((c) => c.id === categoryId);
  return category?.recipes || [];
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
```

---

## Komponen UI

### VoiceOver.tsx (Text-to-Speech)

```typescript
import { useState, useEffect } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface VoiceOverProps {
  text: string;
  autoPlay?: boolean;
  rate?: number;
  onEnd?: () => void;
}

export function VoiceOver({ text, autoPlay = false, rate = 1.0, onEnd }: VoiceOverProps) {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    if (autoPlay && isSupported) {
      speak();
    }
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay, rate]);

  const speak = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {!isPlaying ? (
        <button
          onClick={speak}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: colors.primary, color: "white" }}
        >
          <Volume2 size={18} />
          <span className="text-sm font-semibold">Dengarkan</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {isPaused ? (
            <button
              onClick={resume}
              className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              <Play size={18} />
            </button>
          ) : (
            <button
              onClick={pause}
              className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              <Pause size={18} />
            </button>
          )}
          <button
            onClick={stop}
            className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: colors.danger, color: "white" }}
          >
            <VolumeX size={18} />
          </button>
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-1 h-4 rounded-full animate-pulse delay-75" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-1 h-3 rounded-full animate-pulse delay-150" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### BottomNav.tsx

```typescript
import { Home, Heart, User, Wrench } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../context/ThemeContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const navItems = [
    { icon: Home, label: "Beranda", path: "/kategori" },
    { icon: Heart, label: "Favorit", path: "/favorit" },
    { icon: Wrench, label: "Alat Dapur", path: "/alat-dapur" },
    { icon: User, label: "Profil", path: "/profil" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t shadow-lg z-50"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: `${colors.primary}30`,
      }}
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 transition-all"
            >
              <item.icon
                size={24}
                style={{
                  color: isActive ? colors.primary : colors.textSecondary,
                }}
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color: isActive ? colors.primary : colors.textSecondary,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Halaman Utama

### App.tsx (Main Router)

```typescript
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { SplashScreen } from "./components/SplashScreen";
import { CategoryScreen } from "./components/CategoryScreen";
import { RecipeListScreen } from "./components/RecipeListScreen";
import { RecipeDetail } from "./components/RecipeDetail";
import { ChecklistScreen } from "./components/ChecklistScreen";
import { CompletionScreen } from "./components/CompletionScreen";
import { FavoritScreen } from "./components/FavoritScreen";
import { ProfilScreen } from "./components/ProfilScreen";
import { KitchenToolsListScreen } from "./components/KitchenToolsListScreen";
import { KitchenToolsScreen } from "./components/KitchenToolsScreen";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/kategori" element={<CategoryScreen />} />
          <Route path="/kategori/:categoryId" element={<RecipeListScreen />} />
          <Route path="/resep/:recipeId" element={<RecipeDetail />} />
          <Route path="/checklist/:recipeId" element={<ChecklistScreen />} />
          <Route path="/selesai" element={<CompletionScreen />} />
          <Route path="/favorit" element={<FavoritScreen />} />
          <Route path="/profil" element={<ProfilScreen />} />
          <Route path="/alat-dapur" element={<KitchenToolsListScreen />} />
          <Route path="/alat/:toolId" element={<KitchenToolsScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

### main.tsx (Entry Point)

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## Cara Menjalankan Project

### Development Mode

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Buka browser di http://localhost:5173
```

### Build untuk Production

```bash
# Build project
npm run build

# Preview build
npm run preview
```

---

## Fitur-Fitur Utama

### 1. **Sistem Tema Multi-Warna**
- Fresh Theme (Hijau)
- Pink Theme (Pink)
- Dark Theme (Biru Gelap)
- Simpan pilihan tema di localStorage

### 2. **Text-to-Speech (Audio)**
- Baca langkah resep otomatis
- Pengaturan kecepatan (Lambat/Normal/Cepat)
- Mode "Dengarkan Semua" untuk auto-play semua langkah

### 3. **Navigasi & Routing**
- React Router untuk navigasi antar halaman
- Bottom navigation bar
- Breadcrumb & back buttons

### 4. **Interaktif**
- Checklist bahan masakan
- Progress tracking
- Animasi & transisi smooth
- Hover effects

### 5. **Responsive Design**
- Mobile-first approach
- Responsive di tablet & desktop
- Touch-friendly buttons

### 6. **Data Management**
- Recipes data terstruktur
- Category-based organization
- Kitchen tools tutorials
- Helper functions untuk akses data

---

## Tips & Best Practices

### 1. **Optimasi Performance**
```typescript
// Gunakan lazy loading untuk komponen besar
const RecipeDetail = lazy(() => import('./components/RecipeDetail'));

// Wrap dengan Suspense
<Suspense fallback={<LoadingSpinner />}>
  <RecipeDetail />
</Suspense>
```

### 2. **Error Handling**
```typescript
// Tambahkan error boundary
class ErrorBoundary extends Component {
  // ... error boundary logic
}
```

### 3. **SEO & Meta Tags**
```typescript
// Install react-helmet
npm install react-helmet

// Gunakan di setiap halaman
<Helmet>
  <title>Resep Masak Anak - {recipeName}</title>
  <meta name="description" content={recipeDescription} />
</Helmet>
```

### 4. **Testing**
```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Buat test files
# RecipeDetail.test.tsx
```

---

## Troubleshooting

### Issue: Module not found
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind classes tidak bekerja
```bash
# Pastikan postcss config benar
# Restart dev server
```

### Issue: TypeScript errors
```bash
# Update tsconfig.json
# Tambahkan type definitions yang hilang
npm install -D @types/react @types/react-dom
```

---

## Resources & Dokumentasi

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Lucide Icons**: https://lucide.dev
- **Material UI**: https://mui.com
- **Radix UI**: https://www.radix-ui.com

---

## Lisensi & Credits

Project ini dibuat untuk pembelajaran dan pengembangan keterampilan memasak anak-anak.

**Tech Stack:**
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Lucide Icons

---

## Kontak & Support

Untuk pertanyaan atau bantuan, silakan buka issue di repository atau hubungi developer.

**Happy Coding! 👨‍💻🍳**

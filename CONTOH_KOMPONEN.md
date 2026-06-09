# Contoh Kode Komponen Lengkap

## 1. SplashScreen.tsx

```typescript
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";

export function SplashScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/kategori");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      }}
    >
      {/* Logo / Mascot */}
      <div className="text-8xl mb-6 animate-bounce">👨‍🍳</div>

      {/* App Title */}
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Ayo Masak!
      </h1>
      <p className="text-lg text-white/90 text-center px-8">
        Belajar masak itu mudah dan menyenangkan! 🍳
      </p>

      {/* Loading indicator */}
      <div className="mt-8 flex gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
}
```

---

## 2. CategoryScreen.tsx

```typescript
import { useNavigate } from "react-router";
import { BottomNav } from "./BottomNav";
import { categories } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";
import { ChefHat } from "lucide-react";

export function CategoryScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      {/* Header */}
      <div
        className="py-8 px-4 md:px-8 shadow-md"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat size={32} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Ayo Masak!
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-base">
            Pilih kategori resep yang ingin kamu coba
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/kategori/${category.id}`)}
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
              style={{
                backgroundColor: colors.cardBg,
                borderLeft: `6px solid ${category.color}`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
                    {category.name}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {category.description}
                  </p>
                  <p className="text-xs mt-2 font-semibold" style={{ color: category.color }}>
                    {category.recipes.length} resep tersedia
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
```

---

## 3. RecipeListScreen.tsx

```typescript
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Clock, ChefHat } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { getCategoryById, getRecipesByCategory } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function RecipeListScreen() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { colors } = useTheme();

  const category = getCategoryById(categoryId || "");
  const recipes = getRecipesByCategory(categoryId || "");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Kategori tidak ditemukan
          </h2>
          <button
            onClick={() => navigate("/kategori")}
            className="px-6 py-3 rounded-full text-white font-semibold shadow-lg"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Kembali ke Kategori
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      {/* Header */}
      <div className="py-6 px-4 md:px-8 shadow-md" style={{ backgroundColor: colors.cardBg }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/kategori")}
            className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: colors.background }}
          >
            <ArrowLeft size={20} style={{ color: colors.primary }} />
            <span className="font-semibold" style={{ color: colors.text }}>Kembali</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-5xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
                {category.name}
              </h1>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Belum ada resep di kategori ini
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => navigate(`/resep/${recipe.id}`)}
                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
                style={{ backgroundColor: colors.cardBg }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{recipe.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>
                      {recipe.title}
                    </h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: colors.textSecondary }}>
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock size={14} style={{ color: colors.primary }} />
                        <span style={{ color: colors.textSecondary }}>{recipe.time}</span>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full font-semibold"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.primary,
                        }}
                      >
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
```

---

## 4. ChecklistScreen.tsx (Sederhana)

```typescript
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check, ArrowLeft } from "lucide-react";
import { getRecipeById } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function ChecklistScreen() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors } = useTheme();

  const recipe = getRecipeById(recipeId || "");

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="text-center">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>
            Resep tidak ditemukan
          </h2>
          <button
            onClick={() => navigate("/kategori")}
            className="mt-4 px-6 py-3 rounded-full text-white font-semibold"
            style={{ backgroundColor: colors.primary }}
          >
            Kembali ke Kategori
          </button>
        </div>
      </div>
    );
  }

  const ingredients = recipe.ingredients;
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(ingredients.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const checkedCount = checkedItems.filter(Boolean).length;
  const allChecked = checkedCount === ingredients.length;
  const percentage = Math.round((checkedCount / ingredients.length) * 100);

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/resep/${recipeId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: colors.cardBg }}
          >
            <ArrowLeft size={20} style={{ color: colors.primary }} />
            <span className="font-semibold" style={{ color: colors.text }}>Kembali</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text }}>
          Siap Masak?
        </h1>
        <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
          Centang semua bahan sebelum lanjut
        </p>

        {/* Progress section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {checkedCount} dari {ingredients.length} bahan siap
            </p>
            <p className="text-sm font-bold" style={{ color: colors.primary }}>
              {percentage}%
            </p>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${percentage}%`, backgroundColor: colors.primary }}
            />
          </div>
        </div>

        {/* Checklist cards */}
        <div className="space-y-3 mb-6">
          {ingredients.map((ingredient, index) => {
            const isChecked = checkedItems[index];

            return (
              <button
                key={index}
                onClick={() => toggleCheck(index)}
                className="w-full rounded-2xl p-5 shadow-lg flex items-center gap-4 transition-all duration-300"
                style={{
                  backgroundColor: isChecked ? `${colors.primary}20` : colors.cardBg,
                  borderLeft: isChecked ? `4px solid ${colors.primary}` : "none",
                }}
              >
                {/* Checkbox circle */}
                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: isChecked ? colors.primary : colors.cardBg,
                    borderColor: isChecked ? colors.primary : colors.textSecondary,
                  }}
                >
                  {isChecked && <Check size={16} className="text-white" strokeWidth={3} />}
                </div>

                {/* Ingredient name */}
                <span
                  className={`flex-1 text-left font-bold transition-all ${
                    isChecked ? "line-through" : ""
                  }`}
                  style={{ color: isChecked ? colors.textSecondary : colors.text }}
                >
                  {ingredient.name}
                </span>

                {/* Quantity */}
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {ingredient.amount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom button */}
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-6 shadow-lg" style={{ backgroundColor: colors.cardBg }}>
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <button
              onClick={() => allChecked && navigate(`/selesai?recipeId=${recipeId}`)}
              disabled={!allChecked}
              className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all ${
                allChecked ? "animate-pulse" : "opacity-50 cursor-not-allowed"
              }`}
              style={{
                background: allChecked
                  ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                  : colors.textSecondary,
                color: "white",
              }}
            >
              {allChecked ? "Lanjut Masak! →" : "Centang semua dulu..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. ProfilScreen.tsx (Ganti Tema)

```typescript
import { BottomNav } from "./BottomNav";
import { useTheme } from "../context/ThemeContext";
import { Palette, User } from "lucide-react";

export function ProfilScreen() {
  const { colors, theme, setTheme } = useTheme();

  const themes = [
    { id: "fresh", name: "Hijau Fresh", color: "#2E7D32", emoji: "🌿" },
    { id: "pink", name: "Pink Ceria", color: "#E91E63", emoji: "💖" },
    { id: "dark", name: "Biru Gelap", color: "#1976D2", emoji: "🌙" },
  ] as const;

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      {/* Header */}
      <div
        className="py-8 px-4 md:px-8 shadow-md"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <User size={32} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Profil</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Theme Selection */}
        <div className="rounded-2xl p-6 shadow-lg mb-6" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center gap-3 mb-4">
            <Palette size={24} style={{ color: colors.primary }} />
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>
              Pilih Tema
            </h2>
          </div>

          <div className="space-y-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="w-full rounded-xl p-4 flex items-center gap-4 transition-all shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: theme === t.id ? `${t.color}20` : colors.background,
                  border: `2px solid ${theme === t.id ? t.color : "transparent"}`,
                }}
              >
                <div className="text-3xl">{t.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold" style={{ color: colors.text }}>
                    {t.name}
                  </h3>
                </div>
                {theme === t.id && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: t.color }}
                  >
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: colors.cardBg }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Tentang Aplikasi
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
            Aplikasi resep masak untuk anak-anak yang ingin belajar memasak dengan cara yang
            menyenangkan dan aman. Dilengkapi dengan panduan langkah demi langkah dan fitur
            audio untuk membantu proses belajar.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
```

---

## 6. ImageWithFallback.tsx

```typescript
import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20'%3EImage%3C/text%3E%3C/svg%3E",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
    />
  );
}
```

---

## Tips Implementasi

### 1. Cara Menambahkan Resep Baru

Buka `src/app/data/recipes.ts` dan tambahkan ke array `recipes` dalam kategori yang sesuai:

```typescript
{
  id: "nasi-goreng-simple",
  title: "Nasi Goreng Simple",
  emoji: "🍚",
  categoryId: "makan-siang",
  categoryName: "Makan Siang",
  time: "~20 menit",
  difficulty: "mudah",
  description: "Nasi goreng enak dan mudah dibuat",
  ingredients: [
    { name: "Nasi putih", amount: "2 piring" },
    { name: "Telur", amount: "1 butir" },
    { name: "Bawang putih", amount: "2 siung" },
    { name: "Kecap manis", amount: "2 sdm" },
    { name: "Garam", amount: "Secukupnya" },
  ],
  steps: [
    "Panaskan minyak di wajan",
    "Tumis bawang putih sampai harum",
    "Masukkan telur, orak-arik",
    "Tambahkan nasi, aduk rata",
    "Beri kecap dan garam, aduk lagi",
    "Sajikan hangat"
  ],
  nutrition: {
    calories: "450 kcal",
    protein: "12g",
    carbs: "65g",
    fat: "15g"
  },
  tips: [
    "Gunakan nasi yang sudah dingin agar tidak lengket",
    "Api harus besar agar nasi tidak lembek"
  ]
}
```

### 2. Cara Menambahkan Kategori Baru

```typescript
{
  id: "dessert",
  name: "Dessert",
  emoji: "🍰",
  description: "Makanan penutup manis",
  color: "#F06292",
  recipes: []
}
```

### 3. Cara Kustomisasi Warna Tema

Edit `ThemeContext.tsx`:

```typescript
const themeConfigs: Record<Theme, ThemeColors> = {
  // ... tema lainnya
  custom: {
    primary: "#YOUR_COLOR",
    secondary: "#YOUR_COLOR",
    accent: "#YOUR_COLOR",
    background: "#YOUR_COLOR",
    cardBg: "#YOUR_COLOR",
    text: "#YOUR_COLOR",
    textSecondary: "#YOUR_COLOR",
    danger: "#YOUR_COLOR",
  }
};
```

---

## Kesimpulan

Dengan mengikuti panduan ini, kamu bisa membuat aplikasi resep masak yang interaktif dan user-friendly. Setiap komponen dirancang modular sehingga mudah di-maintain dan dikembangkan lebih lanjut.

**Selamat coding! 🚀**

import { ArrowLeft, Bookmark, Check, AlertTriangle, Lightbulb } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { getRecipeById } from "../data/recipes";
import { BottomNav } from "./BottomNav";
import { useTheme } from "../context/ThemeContext";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";
import { substitutions } from "../data/substitutions";

export function RecipeDetail() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors, mode } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(() => isFavorite(recipeId || ""));

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeFavorite(recipeId || "");
      setIsBookmarked(false);
    } else {
      addFavorite(recipeId || "");
      setIsBookmarked(true);
    }
  };
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [showAlternatives, setShowAlternatives] = useState<number | null>(null);
  const allChecked = checkedIngredients.length > 0 && checkedIngredients.every(Boolean);


  const recipe = getRecipeById(recipeId || "");

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="text-center">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>Resep tidak ditemukan</h2>
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

  // Initialize checked ingredients array
  if (checkedIngredients.length === 0) {
    setCheckedIngredients(new Array(recipe.ingredients.length).fill(false));
  }

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  const hasDanger = recipe.steps.some(step => step.isDanger);

  return (
    <div className="min-h-screen pt-20 pb-32" style={{ background: colors.background }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Hero Image Area or Gradient Banner */}
        {recipe.image ? (
          <div className="relative w-full pb-[56.25%] h-0 rounded-[2.5rem] overflow-hidden shadow-xl mb-8 group">
            {/* The real food photo */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Bottom dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

            {/* Content overlaid on top of image */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
              {/* Top Row: back, bookmark, emoji */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowLeft size={22} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleBookmark}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                  >
                    <Bookmark
                      size={20}
                      className="text-white"
                      style={{
                        fill: isBookmarked ? "white" : "none"
                      }}
                    />
                  </button>
                  {/* Floating emoji */}
                  <div className="text-4xl md:text-5xl animate-float select-none pointer-events-none drop-shadow-md">
                    {recipe.emoji}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Title and category/time info */}
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide mb-3"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {recipe.title}
                </h1>
                
                {/* Info chips row */}
                <div className="flex gap-2 flex-wrap">
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    ⏱ {recipe.time}
                  </div>
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    🔥 {recipe.categoryName}
                  </div>
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    🥚 {recipe.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback beautiful gradient header */
          <div
            className="px-6 md:px-12 pt-8 pb-8 rounded-[2.5rem] shadow-xl overflow-hidden relative mb-8"
            style={{ backgroundColor: colors.primary }}
          >
            {/* Decorative background blobs */}
            <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute left-[-30px] bottom-[-60px] w-48 h-48 rounded-full bg-black/5 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowLeft size={22} className="text-white" />
                </button>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {recipe.title}
                  </h1>
                </div>
                <button
                  onClick={handleToggleBookmark}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <Bookmark
                    size={20}
                    className="text-white"
                    style={{
                      fill: isBookmarked ? "white" : "none"
                    }}
                  />
                </button>
                
                {/* Animated floating recipe emoji */}
                <div className="text-5xl md:text-7xl animate-float select-none pointer-events-none ml-2">
                  {recipe.emoji}
                </div>
              </div>

              {/* Info chips */}
              <div className="flex gap-2.5 flex-wrap mt-6">
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  ⏱ {recipe.time}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  🔥 {recipe.categoryName}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  🥚 {recipe.difficulty}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  💰 Bahan Murah
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-2 md:px-6 max-w-4xl mx-auto mt-2">
        {/* Warning card - if fire/knife involved */}
        {hasDanger && (
          <div className="mb-6 animate-fade-in">
            <div className="rounded-[16px] p-4 shadow-lg flex items-center gap-4 border" style={{ backgroundColor: `${colors.danger}12`, borderColor: `${colors.danger}30`, borderLeft: `6px solid ${colors.danger}` }}>
              <AlertTriangle size={28} className="animate-shake-danger flex-shrink-0" style={{ color: colors.danger }} />
              <div>
                <p className="text-sm font-bold" style={{ color: colors.danger }}>Perlu Perhatian Ekstra!</p>
                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                  Gunakan peralatan tajam atau panas dengan bantuan atau pengawasan orang dewasa ya.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bahan-bahan section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>🛒 Bahan-bahan</h2>
            <div className="px-4 py-1.5 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
              <span className="text-xs md:text-sm font-semibold" style={{ color: colors.primary }}>Semua ada di dapur rumah!</span>
            </div>
          </div>

          <p className="text-xs md:text-sm font-semibold mb-4 text-left leading-relaxed" style={{ color: colors.textSecondary }}>
            💡 <span className="font-bold" style={{ color: colors.secondary }}>Penting:</span> Centang semua bahan di bawah ini terlebih dahulu ya untuk membuka tombol <span className="font-bold" style={{ color: colors.primary }}>"Mulai Masak!"</span>.
          </p>

          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => {
              // Lookup in substitutions database using helper function
              const getAlternativeForIngredient = (ingName: string) => {
                const nameLower = ingName.toLowerCase().trim();
                // 1. Exact match
                if (substitutions[nameLower]) {
                  return substitutions[nameLower];
                }
                // 2. Substring match (e.g. "roti tawar kupas" matches "roti tawar")
                const keys = Object.keys(substitutions).sort((a, b) => b.length - a.length);
                for (const key of keys) {
                  if (nameLower.includes(key)) {
                    return substitutions[key];
                  }
                }
                return null;
              };

              const alternative = getAlternativeForIngredient(ingredient.name) || "Gunakan bahan sejenis yang ada di dapurmu ATAU lewati saja jika tidak terlalu penting.";
              const isChecked = checkedIngredients[index];

              return (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-transparent"
                    style={{ 
                      backgroundColor: isChecked ? `${colors.primary}12` : colors.cardBg,
                      borderColor: isChecked ? `${colors.primary}30` : 'transparent',
                      opacity: isChecked ? 0.75 : 1
                    }}
                  >
                    <button
                      onClick={() => toggleIngredient(index)}
                      className="flex items-center gap-4 flex-1 cursor-pointer"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isChecked ? colors.primary : colors.cardBg,
                          borderColor: isChecked ? colors.primary : colors.textSecondary,
                          transform: isChecked ? "scale(1.05)" : "scale(1)"
                        }}
                      >
                        {isChecked && (
                          <Check size={14} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span
                        className="flex-1 text-left font-semibold transition-all duration-300 text-sm md:text-base"
                        style={{ 
                          color: isChecked ? colors.textSecondary : colors.text,
                          textDecoration: isChecked ? "line-through" : "none"
                        }}
                      >
                        {ingredient.name}
                      </span>
                      <span className="text-xs md:text-sm font-medium" style={{ color: colors.textSecondary }}>{ingredient.amount}</span>
                    </button>
                    <button
                      onClick={() => setShowAlternatives(showAlternatives === index ? null : index)}
                      className="p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: showAlternatives === index ? `${colors.accent}30` : `${colors.primary}10`,
                        color: showAlternatives === index ? colors.accent : colors.primary,
                      }}
                      title="Lihat Alternatif Bahan"
                    >
                      <Lightbulb size={18} className={showAlternatives === index ? "fill-current" : ""} />
                    </button>
                  </div>

                  {/* Alternatives card with slide-down animation */}
                  {showAlternatives === index && (
                    <div
                      className="rounded-2xl p-4 ml-10 border-2 shadow-md flex gap-3 items-start animate-slide-down transition-all duration-300"
                      style={{ 
                        backgroundColor: `${colors.accent}12`, 
                        borderColor: colors.primary 
                      }}
                    >
                      <Lightbulb size={20} className="flex-shrink-0 mt-0.5" style={{ color: colors.secondary, fill: colors.secondary }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-left" style={{ color: colors.text }}>
                          Tidak punya <span className="font-bold">{ingredient.name}</span>? Coba ini:
                        </p>
                        <p className="text-sm font-bold mt-1 leading-relaxed text-left" style={{ color: colors.primary }}>
                          {alternative}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.primary}15` }}>
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            {/* Main CTA button */}
            <button
              onClick={() => navigate(`/masak/${recipe.id}`)}
              disabled={!allChecked}
              className={`w-full py-4 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 ${
                allChecked ? "animate-pulse-scale" : "opacity-60"
              }`}
              style={{ 
                backgroundColor: allChecked ? colors.primary : (mode === "dark" ? "#374151" : "#D1D5DB"),
                color: allChecked ? "#FFFFFF" : (mode === "dark" ? "#9CA3AF" : "#6B7280"),
                fontFamily: "'Fredoka', sans-serif",
                cursor: allChecked ? "pointer" : "not-allowed"
              }}
            >
              {allChecked ? "Mulai Masak! 🍴" : "Ceklis Semua Bahan Dulu Ya! 🛒"}
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

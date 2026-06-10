import { ArrowLeft, Clock, ChefHat } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { BottomNav } from "./BottomNav";
import { useTheme } from "../context/ThemeContext";
import { getRecipesByCategory } from "../data/recipes";

export function RecipeListScreen() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { colors } = useTheme();

  const recipes = getRecipesByCategory(categoryId || "");

  const categoryNames: Record<string, string> = {
    "tanpa-api": "Memasak Tanpa Api",
    "api-kecil": "Memasak dengan Api Kecil",
    "alat-listrik": "Memasak dengan Alat Listrik",
  };

  const categoryDescriptions: Record<string, string> = {
    "tanpa-api": "Panduan pembuatan makanan sederhana tanpa menggunakan sumber panas, seperti membuat sandwich. Modul ini dirancang sebagai titik masuk yang paling aman dan tidak mengintimidasi bagi pemula.",
    "api-kecil": "Instruksi memasak menggunakan kompor dengan api kecil, mencakup cara merebus air dan memasak telur. Dilengkapi panduan keselamatan dasar dalam penggunaan kompor.",
    "alat-listrik": "Panduan penggunaan Rice Cooker sebagai alat masak elektronik paling umum yang dimiliki rumah tangga, mencakup cara pengoperasian yang benar dan aman.",
  };

  const categoryName = categoryNames[categoryId || ""] || "Resep";

  return (
    <div className="min-h-screen pt-16 pb-8" style={{ background: colors.background }}>
      {/* Header Banner with gradient and decorative blobs */}
      <div
        className="px-6 md:px-12 pt-8 pb-10 rounded-b-[2.5rem] shadow-xl overflow-hidden relative"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Decorative background blobs */}
        <div className="absolute right-[-30px] top-[-30px] w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-[-20px] bottom-[-40px] w-36 h-36 rounded-full bg-black/5 blur-xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/kategori")}
              className="w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
            >
              <ArrowLeft size={22} className="text-white" />
            </button>
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {categoryName}
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-lg font-medium ml-15 max-w-3xl leading-relaxed">
            {categoryDescriptions[categoryId || ""] || "Pilih resep seru yang ingin kamu coba hari ini!"}
          </p>
        </div>
      </div>

      {/* Grid List of Recipes */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            const isEasy = recipe.difficulty === "Mudah";
            return (
              <button
                key={recipe.id}
                onClick={() => navigate(`/resep/${recipe.id}`)}
                className="w-full rounded-[24px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-transparent hover:border-[#2E7D32]20 hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-4 text-left group cursor-pointer"
                style={{ backgroundColor: colors.cardBg }}
              >
                {/* Recipe Image or Emoji Icon */}
                {recipe.image ? (
                  <div className="w-16 h-16 rounded-[20px] flex-shrink-0 overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {recipe.emoji}
                  </div>
                )}

                {/* Recipe Title & Metadata */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-[#1A1A1A] truncate tracking-wide" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>
                    {recipe.title}
                  </h3>
                  <div className="flex gap-3 mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} style={{ color: colors.textSecondary }} />
                      <span className="text-xs font-semibold" style={{ color: colors.textSecondary }}>
                        {recipe.time}
                      </span>
                    </div>
                    
                    {/* Styled Difficulty Badge */}
                    <span 
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full`}
                      style={{ 
                        backgroundColor: isEasy ? "#E8F5E9" : "#E3F2FD",
                        color: isEasy ? "#2E7D32" : "#0277BD"
                      }}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Interactive Navigation Arrow */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                  style={{ backgroundColor: `${colors.primary}15` }}
                >
                  <span 
                    className="text-lg font-bold transition-transform duration-300 group-hover:translate-x-1.5"
                    style={{ color: colors.primary }}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-20 col-span-full">
            <span className="text-5xl block mb-4">🥣</span>
            <p className="text-lg font-bold" style={{ color: colors.textSecondary, fontFamily: "'Fredoka', sans-serif" }}>
              Belum ada resep di kategori ini
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

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

  const categoryName = categoryNames[categoryId || ""] || "Resep";

  return (
    <div className="min-h-screen pt-16 pb-8" style={{ background: colors.background }}>
      <div
        className="px-4 md:px-8 lg:px-12 pt-8 pb-6 rounded-b-[2rem]"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/kategori")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{categoryName}</h1>
          </div>
          <p className="text-white/90 text-sm md:text-base">
            Pilih resep yang ingin kamu coba!
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => navigate(`/resep/${recipe.id}`)}
              className="w-full rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all flex items-center gap-4"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                {recipe.emoji}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                  {recipe.title}
                </h3>
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Clock size={14} style={{ color: colors.textSecondary }} />
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      {recipe.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat size={14} style={{ color: colors.textSecondary }} />
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <span style={{ color: colors.primary }}>→</span>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Belum ada resep di kategori ini
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

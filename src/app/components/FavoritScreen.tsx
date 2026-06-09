import { Heart, Search, Clock, ChefHat, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { ChefMascot } from "./ChefMascot";
import { useTheme } from "../context/ThemeContext";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { getRecipeById } from "../data/recipes";

export function FavoritScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const updateFavorites = () => {
      setFavoriteIds(getFavorites());
    };

    updateFavorites();

    // Listen for favorites updates
    window.addEventListener("favorites-updated", updateFavorites);

    return () => {
      window.removeEventListener("favorites-updated", updateFavorites);
    };
  }, []);

  const favoriteRecipes = favoriteIds
    .map((id) => getRecipeById(id))
    .filter((recipe) => recipe !== undefined);

  const filteredRecipes = searchQuery.trim()
    ? favoriteRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favoriteRecipes;

  const handleRemoveFavorite = (recipeId: string) => {
    removeFavorite(recipeId);
    setFavoriteIds(getFavorites());
  };

  return (
    <div className="min-h-screen pt-16 pb-8" style={{ background: colors.background }}>
      <div
        className="px-4 md:px-8 lg:px-12 pt-8 pb-6 rounded-b-[2rem]"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
          Resep Favorit 💖
        </h1>
        <p className="text-white/90">Resep yang udah kamu save</p>

        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari di favorit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/95 backdrop-blur-sm border-2 border-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 shadow-lg placeholder:text-gray-400"
            style={{ focusRing: colors.accent }}
          />
        </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 max-w-6xl mx-auto mt-6">
        {filteredRecipes.length > 0 ? (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="w-full rounded-2xl p-5 shadow-lg transition-all flex items-center gap-4"
                style={{ backgroundColor: colors.cardBg }}
              >
                <button
                  onClick={() => navigate(`/resep/${recipe.id}`)}
                  className="flex items-center gap-4 flex-1"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
                    style={{ backgroundColor: colors.primary }}
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
                    <div
                      className="text-xs mt-2 px-2 py-1 rounded-full inline-block"
                      style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
                    >
                      {recipe.categoryName}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleRemoveFavorite(recipe.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${colors.danger}20` }}
                >
                  <Trash2 size={20} style={{ color: colors.danger }} />
                </button>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="text-center py-16">
            <ChefMascot size="medium" />
            <h3 className="text-xl font-bold mt-6" style={{ color: colors.text }}>
              Tidak Ada Hasil
            </h3>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              Coba kata kunci lain
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <ChefMascot size="medium" />
            <h3 className="text-xl font-bold mt-6" style={{ color: colors.text }}>
              Belum Ada Favorit
            </h3>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              Yuk, save resep favorit kamu!
            </p>
            <button
              onClick={() => navigate("/kategori")}
              className="mt-6 px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: colors.primary }}
            >
              Cari Resep
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

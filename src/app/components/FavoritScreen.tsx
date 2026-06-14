import { Heart, Search, Clock, ChefHat, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { ChefMascot } from "./ChefMascot";
import { useTheme } from "../context/ThemeContext";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { getRecipeById } from "../data/recipes";
import { resolveImagePath } from "../utils/imagePaths";

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

  const [recipeToDelete, setRecipeToDelete] = useState<{ id: string; title: string } | null>(null);

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
                  {recipe.image ? (
                    <div className="w-16 h-16 rounded-2xl flex-shrink-0 overflow-hidden shadow-md">
                      <img
                        src={resolveImagePath(recipe.image)}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {recipe.emoji}
                    </div>
                  )}
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
                  onClick={() => setRecipeToDelete({ id: recipe.id, title: recipe.title })}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
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

      {recipeToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="w-full max-w-sm rounded-[24px] p-6 shadow-2xl text-center border"
            style={{ backgroundColor: colors.cardBg, borderColor: `${colors.primary}20` }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
              style={{ backgroundColor: `${colors.danger}15` }}
            >
              🗑️
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
              Hapus dari Favorit?
            </h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
              Apakah kamu yakin ingin menghapus <strong style={{ color: colors.text }}>"{recipeToDelete.title}"</strong> dari resep favoritmu?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setRecipeToDelete(null)}
                className="flex-1 py-3 rounded-full font-semibold transition-all border cursor-pointer active:scale-95 text-sm"
                style={{ 
                  borderColor: '#E5E7EB',
                  color: colors.textSecondary,
                  backgroundColor: 'transparent'
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  removeFavorite(recipeToDelete.id);
                  setFavoriteIds(getFavorites());
                  setRecipeToDelete(null);
                }}
                className="flex-1 py-3 rounded-full font-semibold text-white transition-all cursor-pointer active:scale-95 text-sm shadow-md"
                style={{ backgroundColor: colors.danger }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

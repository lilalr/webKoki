import { Search, Sandwich, Flame, Zap, UtensilsCrossed, Sparkles, Clock, ChefHat, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { BottomNav } from "./BottomNav";
import { recipes } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function CategoryScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = [
    {
      id: "pengenalan-alat",
      title: "Pengenalan Alat",
      subtitle: "Pelajari Dulu!",
      icon: UtensilsCrossed,
      badge: "Panduan",
      count: 7,
      isTools: true,
      color: "#00796B",
      bgColor: "#E0F2F1",
    },
    {
      id: "tanpa-api",
      title: "Tanpa Api",
      subtitle: "Paling Mudah!",
      icon: Sandwich,
      badge: "Termudah",
      count: 12,
      color: "#F9A825",
      bgColor: "#FFFDE7",
    },
    {
      id: "api-kecil",
      title: "Api Kecil",
      subtitle: "Mudah Kok!",
      icon: Flame,
      badge: "Mudah",
      count: 8,
      color: "#FF7043",
      bgColor: "#FFF3E0",
    },
    {
      id: "alat-listrik",
      title: "Alat Listrik",
      subtitle: "Perlu Fokus",
      icon: Zap,
      badge: "Menengah",
      count: 7,
      color: "#0277BD",
      bgColor: "#E3F2FD",
    },
  ];

  // Filter recipes based on search query or active filter
  const getFilteredRecipes = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return recipes.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(query)
        );
        return titleMatch || ingredientMatch;
      });
    }

    if (activeFilter === "populer") {
      return recipes.filter((r) => r.category === "tanpa-api" || r.category === "api-kecil").slice(0, 8);
    }

    if (activeFilter === "mudah") {
      return recipes.filter((r) => r.difficulty === "Mudah");
    }

    if (activeFilter === "cepat") {
      return recipes.filter((r) => {
        const minutes = parseInt(r.time);
        return minutes <= 15;
      });
    }

    return [];
  };

  const filteredRecipes = getFilteredRecipes();
  const hasSearchResults = (searchQuery.trim() || activeFilter) && filteredRecipes.length > 0;

  const getResultTitle = () => {
    if (searchQuery.trim()) {
      return `Hasil Pencarian "${searchQuery}"`;
    }
    if (activeFilter === "populer") return "Resep Populer 🌟";
    if (activeFilter === "mudah") return "Resep Mudah 🔥";
    if (activeFilter === "cepat") return "Resep Cepat ⚡";
    return "";
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      {/* Header with gradient */}
      <div
        className="px-4 md:px-8 pt-8 pb-8 rounded-b-[2rem] shadow-lg overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
              Halo, Chef Muda! 👋
            </h1>
            <p className="text-white/90 text-base md:text-lg">Mau belajar apa hari ini?</p>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#757575]" size={20} />
            <input
              type="text"
              placeholder="Cari resep dari bahan yang kamu punya"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-full py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl placeholder:text-[#BDBDBD] text-[#1A1A1A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757575] hover:text-[#1A1A1A]"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => {
                setActiveFilter(activeFilter === "populer" ? null : "populer");
                setSearchQuery("");
              }}
              className={`flex items-center gap-1 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeFilter === "populer" ? "bg-white/40 ring-2 ring-white" : "bg-white/20"
              }`}
            >
              <Sparkles size={14} className="fill-white text-white" />
              <span>Populer</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter(activeFilter === "mudah" ? null : "mudah");
                setSearchQuery("");
              }}
              className={`backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeFilter === "mudah" ? "bg-white/40 ring-2 ring-white" : "bg-white/20"
              }`}
            >
              🔥 Mudah
            </button>
            <button
              onClick={() => {
                setActiveFilter(activeFilter === "cepat" ? null : "cepat");
                setSearchQuery("");
              }}
              className={`backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeFilter === "cepat" ? "bg-white/40 ring-2 ring-white" : "bg-white/20"
              }`}
            >
              ⚡ Cepat
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        {hasSearchResults ? (
          // Search results
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                  {getResultTitle()}
                </h2>
                <p className="text-sm text-[#757575]">
                  Ditemukan {filteredRecipes.length} resep
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter(null);
                }}
                className="text-sm px-4 py-2 rounded-full font-semibold text-white transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                Lihat Kategori
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => navigate(`/resep/${recipe.id}`)}
                  className="rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-16 h-16 rounded-[16px] flex items-center justify-center text-3xl shadow-md"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                    >
                      {recipe.emoji}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-lg text-[#1A1A1A]">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#757575]">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat size={14} />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="mt-3 inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs px-3 py-1 rounded-full font-semibold">
                    {recipe.categoryName}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (searchQuery.trim() || activeFilter) ? (
          // No results
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
              Tidak ada resep yang ditemukan
            </h2>
            <p className="text-sm text-[#757575] mb-6">
              Coba cari dengan kata kunci lain
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
              }}
              className="px-6 py-3 rounded-full font-bold bg-[#2E7D32] text-white shadow-lg hover:bg-[#1B5E20] transition-all"
            >
              Kembali ke Kategori
            </button>
          </div>
        ) : (
          // Categories grid
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-6">Pilih Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (category.isTools) {
                        navigate("/alat-dapur");
                      } else {
                        navigate(`/kategori/${category.id}`);
                      }
                    }}
                    className="rounded-[24px] p-6 relative shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-all"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <div
                      className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-md text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.badge}
                    </div>

                    <div className="flex flex-col items-center gap-3 mt-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-[16px] p-3">
                        <Icon size={40} strokeWidth={2} style={{ color: category.color }} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-base text-[#1A1A1A]">
                          {category.title}
                        </p>
                        <p className="text-xs text-[#757575] mt-1">
                          {category.count} {category.isTools ? "panduan" : "resep"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

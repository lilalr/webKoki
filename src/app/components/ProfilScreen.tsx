import { User, Award, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { ChefMascot } from "./ChefMascot";
import { useTheme } from "../context/ThemeContext";
import { getFavorites } from "../utils/favorites";
import { getCompletedRecipes } from "../utils/completedRecipes";
import { recipes } from "../data/recipes";

export function ProfilScreen() {
  const { mode, setMode, colors } = useTheme();
  const [stats, setStats] = useState([
    { label: "Resep Selesai", value: "0", emoji: "✅" },
    { label: "Badge", value: "0", emoji: "🏆" },
    { label: "Favorit", value: "0", emoji: "💖" },
  ]);
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Chef Pemula",
      desc: "Selesaikan 1 resep Tanpa Api",
      unlocked: false,
    },
    {
      id: 2,
      name: "Penakluk Api",
      desc: "Selesaikan 1 resep Api Kecil",
      unlocked: false,
    },
    {
      id: 3,
      name: "Master Elektronik",
      desc: "Selesaikan 1 resep Alat Listrik",
      unlocked: false,
    },
  ]);

  useEffect(() => {
    const updateStats = () => {
      const completedRecipes = getCompletedRecipes();
      const favoriteRecipes = getFavorites();

      // Count completed recipes by category
      const completedByCategory = {
        "tanpa-api": 0,
        "api-kecil": 0,
        "alat-listrik": 0,
      };

      completedRecipes.forEach((id) => {
        const recipe = recipes.find((r) => r.id === id);
        if (recipe && recipe.category in completedByCategory) {
          completedByCategory[recipe.category as keyof typeof completedByCategory]++;
        }
      });

      // Update badges
      const newBadges = [
        {
          id: 1,
          name: "Chef Pemula",
          desc: "Selesaikan 1 resep Tanpa Api",
          unlocked: completedByCategory["tanpa-api"] >= 1,
        },
        {
          id: 2,
          name: "Penakluk Api",
          desc: "Selesaikan 1 resep Api Kecil",
          unlocked: completedByCategory["api-kecil"] >= 1,
        },
        {
          id: 3,
          name: "Master Elektronik",
          desc: "Selesaikan 1 resep Alat Listrik",
          unlocked: completedByCategory["alat-listrik"] >= 1,
        },
      ];

      const unlockedBadgeCount = newBadges.filter((b) => b.unlocked).length;

      setBadges(newBadges);
      setStats([
        { label: "Resep Selesai", value: completedRecipes.length.toString(), emoji: "✅" },
        { label: "Badge", value: unlockedBadgeCount.toString(), emoji: "🏆" },
        { label: "Favorit", value: favoriteRecipes.length.toString(), emoji: "💖" },
      ]);
    };

    updateStats();

    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", updateStats);

    // Listen for focus event to update when returning to tab
    window.addEventListener("focus", updateStats);

    // Listen for custom events when favorites or recipes are updated
    window.addEventListener("favorites-updated", updateStats);
    window.addEventListener("recipes-completed", updateStats);

    return () => {
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("focus", updateStats);
      window.removeEventListener("favorites-updated", updateStats);
      window.removeEventListener("recipes-completed", updateStats);
    };
  }, []);

  const themeOptions = [
    { id: "fresh", name: "Fresh", color: "#646B41", desc: "Hijau Natural & Tenang" },
    { id: "pink", name: "Pink", color: "#D6336C", desc: "Ceria & Manis" },
    { id: "dark", name: "Dark", color: "#133E87", desc: "Elegan & Modern" },
  ] as const;

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      <div
        className="px-4 md:px-8 lg:px-12 pt-8 pb-8 rounded-b-[2rem]"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <User size={40} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">Chef Muda</h1>
            <p className="text-white/90 text-sm">Level: Pemula 🌱</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border-2 border-white/30"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/90 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 max-w-4xl mx-auto mt-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette size={20} style={{ color: colors.primary }} />
            <h2 className="text-lg font-bold" style={{ color: colors.text }}>
              Pilih Tema Warna
            </h2>
          </div>
          <div className="space-y-3">
            {themeOptions.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setMode(theme.id)}
                className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-all shadow-md hover:shadow-lg ${
                  mode === theme.id ? "ring-4" : ""
                }`}
                style={{
                  backgroundColor: colors.cardBg,
                  ringColor: mode === theme.id ? colors.primary : "transparent",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full shadow-lg"
                  style={{ backgroundColor: theme.color }}
                ></div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold" style={{ color: colors.text }}>
                    {theme.name}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {theme.desc}
                  </p>
                </div>
                {mode === theme.id && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award size={20} style={{ color: colors.primary }} />
            <h2 className="text-lg font-bold" style={{ color: colors.text }}>
              Badge Kamu
            </h2>
          </div>

          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 flex items-center gap-4 shadow-lg mb-3 ${
                !badge.unlocked && "opacity-50"
              }`}
              style={{ backgroundColor: colors.cardBg }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                style={{
                  background: badge.unlocked
                    ? "linear-gradient(135deg, #FFD700, #FFA000)"
                    : "#E0E0E0",
                }}
              >
                <Award size={32} className="text-white fill-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                  {badge.name}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {badge.desc}
                </p>
              </div>
              {badge.unlocked && <div className="text-2xl">✅</div>}
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-center">
          <ChefMascot size="medium" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

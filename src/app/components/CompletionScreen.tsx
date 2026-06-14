import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getRecipeById } from "../data/recipes";
import { resolveImagePath } from "../utils/imagePaths";
import { useTheme } from "../context/ThemeContext";
import { addCompletedRecipe, getChefLevel, getCompletedRecipes } from "../utils/completedRecipes";
import chefGirl from "../../imports/chef_girl_celebrating.png";
import chefBoy from "../../imports/chef_boy_celebrating.png";

export function CompletionScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colors } = useTheme();
  const recipeId = searchParams.get("recipeId");
  const recipe = recipeId ? getRecipeById(recipeId) : null;
  const [mascotGender, setMascotGender] = useState("perempuan");

  useEffect(() => {
    const saved = localStorage.getItem("mascot-gender");
    if (saved) {
      setMascotGender(saved);
    }
  }, []);

  useEffect(() => {
    if (recipeId) {
      addCompletedRecipe(recipeId);
    }
  }, [recipeId]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${colors.primary}12` }}>
      {/* Confetti shapes scattered */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colorful dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
        {/* Triangles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`triangle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: `15px solid ${[colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)]}`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 z-10">
        {/* Chef mascot - CELEBRATION pose */}
        <div className="flex justify-center mb-6 relative">
          {/* Sparkles around mascot */}
          <div className="absolute -top-2 -left-2 text-2xl animate-ping">✨</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-ping delay-75">✨</div>
          <div className="absolute top-10 -left-4 text-xl animate-bounce">⭐</div>
          <div className="absolute top-10 -right-4 text-xl animate-bounce delay-100">⭐</div>

          {/* Chef with celebration pose */}
          <img
            src={mascotGender === "laki-laki" ? chefBoy : chefGirl}
            alt="Chef Mascot"
            className="w-44 h-44 object-contain animate-bounce drop-shadow-xl"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: colors.primary }}>
          Yeay, Kamu Berhasil! 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-center italic mb-8" style={{ color: colors.textSecondary }}>
          {recipe ? `${recipe.title} kamu pasti enak banget!` : "Masakanmu pasti enak banget!"}
        </p>

        {/* Achievement badge card */}
        <div className="rounded-3xl p-8 shadow-xl mb-6 border-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.accent }}>
          {/* Gold star icon */}
          <div className="flex justify-center mb-3">
            <div className="text-[48px] animate-bounce">{getChefLevel(getCompletedRecipes().length).emoji}</div>
          </div>

          {/* Badge title */}
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: colors.text }}>
            {getChefLevel(getCompletedRecipes().length).name}
          </h2>

          {/* Badge subtitle */}
          <p className="text-sm text-center mb-5" style={{ color: colors.primary }}>
            Modul {recipe?.categoryName || "Masak"} selesai! 🍳
          </p>

          {/* XP bar */}
          <div className="px-5 py-3 rounded-full inline-flex items-center gap-2 mx-auto w-full justify-center" style={{ backgroundColor: `${colors.secondary}20` }}>
            <span className="font-bold" style={{ color: colors.secondary }}>🔥 +50 XP earned</span>
          </div>
        </div>

        {/* Cooking summary card */}
        <div className="rounded-2xl p-6 shadow-lg mb-8" style={{ backgroundColor: colors.cardBg }}>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>Tadi kamu masak:</p>

          <div className="flex items-center gap-4 mb-4 text-left">
            {recipe?.image ? (
              <img
                src={resolveImagePath(recipe.image)}
                alt={recipe?.title}
                className="w-16 h-16 rounded-2xl object-cover shadow-md border-2"
                style={{ borderColor: colors.secondary }}
              />
            ) : (
              <span className="text-4xl">{recipe?.emoji || "🍳"}</span>
            )}
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>
              {recipe?.title || "Masakan Lezat"}
            </h3>
          </div>

          <div className="mb-4">
            <p className="text-sm" style={{ color: colors.textSecondary }}>⏱ Selesai dalam {recipe?.time || "~15 menit"}</p>
          </div>

          {/* Ingredients used chips */}
          <div className="flex flex-wrap gap-2">
            {recipe?.ingredients.slice(0, 4).map((ingredient, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
              >
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 mb-8">
          {/* Primary button */}
          <button
            onClick={() => navigate("/kategori")}
            className="w-full py-4 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: colors.primary }}
          >
            Coba Resep Lain 🍳
          </button>

          {/* Secondary button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-full font-bold text-lg border-2 transition-all"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.primary,
              color: colors.primary
            }}
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}

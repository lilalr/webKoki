import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check, ArrowLeft } from "lucide-react";
import { getRecipeById } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";
import { ChefMascot } from "./ChefMascot";


export function ChecklistScreen() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors } = useTheme();

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

  const getMotivationText = () => {
    if (checkedCount === 0) {
      return { text: "Belum ada yang disiapkan nih 😅", color: colors.textSecondary };
    }
    if (allChecked) {
      return { text: "Yeay semua siap! Ayo masak! 🎉", color: colors.primary };
    }
    return { text: "Hampir siap! Semangat! 💪", color: colors.secondary };
  };

  const motivation = getMotivationText();

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

        {/* Top card with chef mascot + speech bubble */}
        <div className="rounded-2xl p-5 shadow-lg mb-6 flex items-start gap-4" style={{ backgroundColor: colors.cardBg }}>
          {/* Chef mascot - small, encouraging pose */}
          <div className="flex-shrink-0">
            <ChefMascot size="small" />
          </div>

          {/* Speech bubble */}
          <div className="flex-1 rounded-xl p-4 shadow-md relative" style={{ backgroundColor: `${colors.primary}10` }}>
            <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
              Cek dulu semua bahannya ya, baru mulai masak! 😊
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text }}>Siap Masak?</h1>
        <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
          Centang semua bahan sebelum lanjut
        </p>

        {/* Progress section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {checkedCount} dari {ingredients.length} bahan siap
            </p>
            <p className="text-sm font-bold" style={{ color: colors.primary }}>{percentage}%</p>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.primary}20` }}>
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${percentage}%`, backgroundColor: colors.primary }}
            />
          </div>
        </div>

        {/* Section label */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-1" style={{ color: colors.text }}>Daftar Bahan</h3>
          <p className="text-sm" style={{ color: colors.primary }}>🛒 Semua bahan ada di dapur rumah!</p>
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
                  className={`flex-1 text-left font-bold transition-all ${isChecked ? "line-through" : ""}`}
                  style={{ color: isChecked ? colors.textSecondary : colors.text }}
                >
                  {ingredient.name}
                </span>

                {/* Quantity */}
                <span className="text-sm" style={{ color: colors.textSecondary }}>{ingredient.amount}</span>
              </button>
            );
          })}
        </div>

        {/* Motivational text */}
        <div className="text-center mb-24">
          <p
            className={`text-base ${allChecked ? "font-bold" : "font-normal"}`}
            style={{ color: motivation.color }}
          >
            {motivation.text}
          </p>
        </div>

        {/* Bottom button - fixed */}
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-6 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.primary}30` }}>
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <button
              onClick={() => allChecked && navigate(`/selesai?recipeId=${recipeId}`)}
              disabled={!allChecked}
              className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all ${
                allChecked ? "animate-pulse" : "opacity-50 cursor-not-allowed"
              }`}
              style={{
                backgroundColor: allChecked ? colors.primary : colors.textSecondary,
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

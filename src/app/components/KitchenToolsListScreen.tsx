import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { BottomNav } from "./BottomNav";
import { kitchenTools } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function KitchenToolsListScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen pt-16 pb-8" style={{ background: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/kategori")}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.cardBg }}
            >
              <ArrowLeft size={24} style={{ color: colors.primary }} />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold" style={{ color: colors.text }}>
                Pengenalan Alat Dapur
              </h1>
            </div>
          </div>
          <p className="text-base md:text-lg ml-16" style={{ color: colors.textSecondary }}>
            Pelajari cara menggunakan alat dapur dengan aman!
          </p>
        </div>

        {/* Tools grid - responsive 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {kitchenTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(`/alat/${tool.id}`)}
              className="w-full rounded-[24px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-all"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="w-[80px] h-[80px] rounded-[20px] flex items-center justify-center text-5xl flex-shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  {tool.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: colors.text }}>
                    {tool.title}
                  </h3>

                  {tool.isDanger && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full inline-flex" style={{ backgroundColor: `${colors.danger}20` }}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.danger }}></div>
                      <span className="text-xs font-semibold" style={{ color: colors.danger }}>
                        Perlu Perhatian Ekstra
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight size={24} className="flex-shrink-0" style={{ color: colors.primary }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

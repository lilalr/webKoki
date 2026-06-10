import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { BottomNav } from "./BottomNav";
import { kitchenTools } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function KitchenToolsListScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const coverImage = "/images/cover-pengenalan-alat.png";

  return (
    <div className="min-h-screen pt-16 pb-8" style={{ background: colors.background }}>
      {/* Header Banner with gradient and decorative blobs */}
      <div
        className="px-6 md:px-12 pt-8 pb-10 rounded-b-[2.5rem] shadow-xl overflow-hidden relative bg-cover bg-center"
        style={{ 
          backgroundColor: colors.primary,
          backgroundImage: `url(${coverImage})`,
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        {/* Decorative background blobs */}
        <div className="absolute right-[-30px] top-[-30px] w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none z-0" />
        <div className="absolute left-[-20px] bottom-[-40px] w-36 h-36 rounded-full bg-black/5 blur-xl pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/kategori")}
              className="w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
            >
              <ArrowLeft size={22} className="text-white" />
            </button>
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Pengenalan Alat Dapur
            </h1>
          </div>
          <p className="text-white/90 text-sm md:text-lg font-medium ml-15 max-w-3xl leading-relaxed">
            Edukasi mengenai alat-alat dapur dasar sebelum memulai memasak. Pelajari cara menggunakan alat dapur dengan aman!
          </p>
        </div>
      </div>

      {/* Tools grid - responsive 2 columns on desktop */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {kitchenTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => navigate(`/alat/${tool.id}`)}
            className="w-full rounded-[24px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-transparent hover:border-[#2E7D32]20 hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-4 text-left group cursor-pointer"
            style={{ backgroundColor: colors.cardBg }}
          >
            {tool.image ? (
              <div className="relative w-20 h-20 rounded-[20px] overflow-hidden shadow-md flex-shrink-0 bg-white">
                <img src={tool.image} alt={tool.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                {tool.emoji}
              </div>
            )}

            {/* Tool Title & Danger Indicator */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-[#1A1A1A] truncate tracking-wide" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>
                {tool.title}
              </h3>
              {tool.isDanger && (
                <div className="flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full w-fit" style={{ backgroundColor: `${colors.danger}15` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.danger }}></div>
                  <span className="text-[10px] font-bold" style={{ color: colors.danger }}>
                    Perlu Perhatian Ekstra
                  </span>
                </div>
              )}
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
        ))}
      </div>

      <BottomNav />
    </div>
  );
}


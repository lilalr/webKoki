import { ArrowLeft, Bookmark, Check, Play, ChevronDown, ChevronUp, Volume2, Settings, Pause, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { getRecipeById } from "../data/recipes";
import { BottomNav } from "./BottomNav";
import { useTheme } from "../context/ThemeContext";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

export function RecipeDetail() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(() => isFavorite(recipeId || ""));

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeFavorite(recipeId || "");
      setIsBookmarked(false);
    } else {
      addFavorite(recipeId || "");
      setIsBookmarked(true);
    }
  };
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [expandedCuttingCard, setExpandedCuttingCard] = useState<number | null>(null);
  const [showAlternatives, setShowAlternatives] = useState<number | null>(null);
  const [playingStep, setPlayingStep] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);


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

  // Initialize checked ingredients array
  if (checkedIngredients.length === 0) {
    setCheckedIngredients(new Array(recipe.ingredients.length).fill(false));
  }

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  const hasDanger = recipe.steps.some(step => step.isDanger);

  return (
    <div className="min-h-screen pt-20 pb-32" style={{ background: colors.background }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Hero Image Area or Gradient Banner */}
        {recipe.image ? (
          <div className="relative w-full pb-[56.25%] h-0 rounded-[2.5rem] overflow-hidden shadow-xl mb-8 group">
            {/* The real food photo */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Bottom dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

            {/* Content overlaid on top of image */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
              {/* Top Row: back, bookmark, emoji */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowLeft size={22} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleBookmark}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                  >
                    <Bookmark
                      size={20}
                      className="text-white"
                      style={{
                        fill: isBookmarked ? "white" : "none"
                      }}
                    />
                  </button>
                  {/* Floating emoji */}
                  <div className="text-4xl md:text-5xl animate-float select-none pointer-events-none drop-shadow-md">
                    {recipe.emoji}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Title and category/time info */}
              <div>
                <h1
                  className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide mb-3"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {recipe.title}
                </h1>
                
                {/* Info chips row */}
                <div className="flex gap-2 flex-wrap">
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    ⏱ {recipe.time}
                  </div>
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    🔥 {recipe.categoryName}
                  </div>
                  <div className="rounded-full px-3.5 py-1 bg-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                    🥚 {recipe.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback beautiful gradient header */
          <div
            className="px-6 md:px-12 pt-8 pb-8 rounded-[2.5rem] shadow-xl overflow-hidden relative mb-8"
            style={{ backgroundColor: colors.primary }}
          >
            {/* Decorative background blobs */}
            <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute left-[-30px] bottom-[-60px] w-48 h-48 rounded-full bg-black/5 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowLeft size={22} className="text-white" />
                </button>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {recipe.title}
                  </h1>
                </div>
                <button
                  onClick={handleToggleBookmark}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                >
                  <Bookmark
                    size={20}
                    className="text-white"
                    style={{
                      fill: isBookmarked ? "white" : "none"
                    }}
                  />
                </button>
                
                {/* Animated floating recipe emoji */}
                <div className="text-5xl md:text-7xl animate-float select-none pointer-events-none ml-2">
                  {recipe.emoji}
                </div>
              </div>

              {/* Info chips */}
              <div className="flex gap-2.5 flex-wrap mt-6">
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  ⏱ {recipe.time}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  🔥 {recipe.categoryName}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  🥚 {recipe.difficulty}
                </div>
                <div className="rounded-full px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-md transition-colors shadow-sm text-xs md:text-sm font-semibold text-white">
                  💰 Bahan Murah
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-2 md:px-6 max-w-4xl mx-auto mt-2">
        {/* Warning card - if fire/knife involved */}
        {hasDanger && (
          <div className="mb-6 animate-fade-in">
            <div className="rounded-[16px] p-4 shadow-lg flex items-center gap-4 border" style={{ backgroundColor: `${colors.danger}12`, borderColor: `${colors.danger}30`, borderLeft: `6px solid ${colors.danger}` }}>
              <AlertTriangle size={28} className="animate-shake-danger flex-shrink-0" style={{ color: colors.danger }} />
              <div>
                <p className="text-sm font-bold" style={{ color: colors.danger }}>Perlu Perhatian Ekstra!</p>
                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                  Gunakan peralatan tajam atau panas dengan bantuan atau pengawasan orang dewasa ya.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bahan-bahan section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>🛒 Bahan-bahan</h2>
            <div className="px-4 py-1.5 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
              <span className="text-xs md:text-sm font-semibold" style={{ color: colors.primary }}>Semua ada di dapur rumah!</span>
            </div>
          </div>

          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => {
              // Alternative ingredients mapping
              const alternatives: Record<string, string> = {
                "Roti tawar": "Roti gandum / Roti burger",
                "Telur": "Telur puyuh (3-4 butir)",
                "Keju": "Keju parut / Keju cheddar",
                "Mentega": "Margarin / Minyak zaitun",
                "Susu": "Susu kental manis / Santan",
                "Tomat": "Saus tomat",
                "Selada": "Kubis / Sawi",
                "Mayones": "Greek yogurt",
                "Bawang bombay": "Bawang merah (lebih banyak)",
                "Paprika": "Cabai merah (tidak pedas)"
              };

              const hasAlternative = alternatives[ingredient.name];
              const isChecked = checkedIngredients[index];

              return (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-transparent"
                    style={{ 
                      backgroundColor: isChecked ? `${colors.primary}12` : colors.cardBg,
                      borderColor: isChecked ? `${colors.primary}30` : 'transparent',
                      opacity: isChecked ? 0.75 : 1
                    }}
                  >
                    <button
                      onClick={() => toggleIngredient(index)}
                      className="flex items-center gap-4 flex-1 cursor-pointer"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isChecked ? colors.primary : colors.cardBg,
                          borderColor: isChecked ? colors.primary : colors.textSecondary,
                          transform: isChecked ? "scale(1.05)" : "scale(1)"
                        }}
                      >
                        {isChecked && (
                          <Check size={14} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span
                        className="flex-1 text-left font-semibold transition-all duration-300 text-sm md:text-base"
                        style={{ 
                          color: isChecked ? colors.textSecondary : colors.text,
                          textDecoration: isChecked ? "line-through" : "none"
                        }}
                      >
                        {ingredient.name}
                      </span>
                      <span className="text-xs md:text-sm font-medium" style={{ color: colors.textSecondary }}>{ingredient.amount}</span>
                    </button>
                    {hasAlternative && (
                      <button
                        onClick={() => setShowAlternatives(showAlternatives === index ? null : index)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                        style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
                      >
                        {showAlternatives === index ? "Tutup" : "Gak ada?"}
                      </button>
                    )}
                  </div>

                  {/* Alternatives dropdown */}
                  {hasAlternative && showAlternatives === index && (
                    <div
                      className="rounded-2xl p-4 ml-10 shadow-inner border-l-4 transition-all duration-300"
                      style={{ 
                        backgroundColor: `${colors.secondary}10`, 
                        borderColor: colors.secondary 
                      }}
                    >
                      <p className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: colors.secondary }}>
                        💡 Bisa diganti dengan:
                      </p>
                      <p className="text-sm font-semibold" style={{ color: colors.text }}>
                        {alternatives[ingredient.name]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Langkah Memasak section */}
        <div className="mb-32">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>👨‍🍳 Cara Masak</h2>

            {/* Audio controls card */}
            <div className="rounded-2xl p-4 shadow-lg mb-4" style={{ backgroundColor: colors.cardBg }}>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setPlayingAll(!playingAll)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  {playingAll ? (
                    <>
                      <Pause size={18} />
                      <span>Berhenti</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={18} />
                      <span>Dengarkan Semua</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.primary}20` }}
                >
                  <Settings size={20} style={{ color: colors.primary }} />
                </button>
              </div>

              {/* Voice settings expandable */}
              {showVoiceSettings && (
                <div className="pt-3 border-t space-y-3" style={{ borderColor: `${colors.primary}30` }}>
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: colors.text }}>
                      Kecepatan Suara
                    </p>
                    <div className="flex gap-2">
                      {[
                        { speed: 0.75 as const, label: "🐢 Lambat" },
                        { speed: 1 as const, label: "▶️ Normal" },
                        { speed: 1.25 as const, label: "⚡ Cepat" }
                      ].map(({ speed, label }) => (
                        <button
                          key={speed}
                          onClick={() => setVoiceSpeed(speed)}
                          className="flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                          style={{
                            backgroundColor: voiceSpeed === speed ? colors.primary : `${colors.primary}15`,
                            color: voiceSpeed === speed ? "white" : colors.primary
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 relative">
            {recipe.steps.map((step, index) => {
              // Detect if step involves cutting based on keywords
              const isCuttingStep = step.text.toLowerCase().includes('iris') ||
                                   step.text.toLowerCase().includes('potong') ||
                                   step.text.toLowerCase().includes('cincang');

              // Steps that need video demonstration (cutting, stove lighting, etc)
              const needsVideo = index === 1 || isCuttingStep;
              const isActiveStep = playingStep === index;

              return (
                <div key={index} className="relative flex gap-4">
                  {/* Left: step number circle + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 z-10 ${
                        isActiveStep ? 'scale-110 ring-4' : ''
                      }`}
                      style={{ 
                        backgroundColor: colors.primary,
                        // @ts-ignore
                        '--tw-ring-color': `${colors.primary}40`,
                        boxShadow: isActiveStep ? `0 0 15px ${colors.primary}` : 'none'
                      }}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    {index < recipe.steps.length - 1 && (
                      <div
                        className="w-0.5 flex-1 border-l-2 border-dashed my-1 min-h-[50px] opacity-40"
                        style={{ borderColor: colors.primary }}
                      />
                    )}
                  </div>

                  {/* Right: step card */}
                  <div className="flex-1 space-y-2">
                    <div 
                      className="rounded-[24px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" 
                      style={{ 
                        backgroundColor: colors.cardBg,
                        borderColor: isActiveStep ? colors.primary : 'transparent',
                        boxShadow: isActiveStep ? `0 12px 25px -8px ${colors.primary}30` : ''
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <p className="text-sm md:text-base leading-relaxed flex-1 font-medium" style={{ color: colors.text }}>
                          {step.text}
                        </p>
                        {/* Audio button per step */}
                        <button
                          onClick={() => setPlayingStep(playingStep === index ? null : index)}
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all active:scale-90 cursor-pointer"
                          style={{
                            backgroundColor: playingStep === index ? colors.primary : `${colors.primary}15`
                          }}
                        >
                          {playingStep === index ? (
                            <Pause size={16} className="text-white" />
                          ) : (
                            <Volume2 size={16} style={{ color: colors.primary }} />
                          )}
                        </button>
                      </div>

                      {/* Pills and thumbnail */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="flex gap-2 flex-wrap">
                            {step.isDanger && (
                              <div className="px-3 py-1 rounded-full animate-pulse flex items-center gap-1" style={{ backgroundColor: `${colors.danger}15` }}>
                                <span className="text-xs font-bold" style={{ color: colors.danger }}>⚠️ Hati-hati!</span>
                              </div>
                            )}

                            {isCuttingStep && (
                              <button
                                onClick={() => setExpandedCuttingCard(expandedCuttingCard === index ? null : index)}
                                className="px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                                style={{ backgroundColor: `${colors.secondary}15` }}
                              >
                                <span className="text-xs font-bold" style={{ color: colors.secondary }}>✂️ Teknik Potong</span>
                                {expandedCuttingCard === index ? (
                                  <ChevronUp size={12} style={{ color: colors.secondary }} />
                                ) : (
                                  <ChevronDown size={12} style={{ color: colors.secondary }} />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Video thumbnail - 16:9 ratio */}
                          {needsVideo && (
                            <button
                              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md group mt-2 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                              style={{ backgroundColor: colors.primary }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl">{recipe.emoji}</span>
                              </div>
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-all" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                                  <Play size={20} style={{ color: colors.primary }} className="ml-1" />
                                </div>
                                <p className="text-xs text-white font-bold mt-2.5 drop-shadow-md">▶ Tonton Video Tutorial</p>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cutting technique expandable card */}
                    {isCuttingStep && expandedCuttingCard === index && (
                      <div className="rounded-[20px] p-5 shadow-lg border-l-4 transition-all duration-300" style={{ backgroundColor: `${colors.secondary}10`, borderColor: colors.secondary }}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-bold mb-2" style={{ color: colors.secondary, fontFamily: "'Fredoka', sans-serif" }}>✂️ Teknik Potong: Iris Tipis</h4>
                            <p className="text-sm leading-relaxed mb-4 font-medium" style={{ color: colors.text }}>
                              Tekuk jari seperti cakar kucing, ujung kuku menempel pada bahan. Sisi pisau menyentuh buku jari agar aman.
                            </p>

                            {/* Mini diagram - finger position */}
                            <div className="rounded-2xl p-4 flex items-center justify-center shadow-inner" style={{ backgroundColor: colors.cardBg }}>
                              <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                                {/* Cutting board */}
                                <rect x="10" y="40" width="100" height="10" fill="#CD7F32" rx="2"/>

                                {/* Ingredient/food */}
                                <rect x="35" y="32" width="25" height="8" fill="#FFE0B2" rx="2"/>

                                {/* Hand/fingers (simplified) */}
                                <ellipse cx="48" cy="24" rx="14" ry="7" fill="#F5CBA7"/>
                                <rect x="44" y="16" width="3" height="8" fill="#E59866" rx="1.5"/>
                                <rect x="48" y="16" width="3" height="8" fill="#E59866" rx="1.5"/>

                                {/* Knife */}
                                <rect x="70" y="18" width="3" height="26" fill="#7F8C8D" rx="1"/>
                                <path d="M 66 18 L 77 18 L 71 12 Z" fill="#BDC3C7"/>

                                {/* Safety indicator arrow */}
                                <path d="M 55 14 L 60 14 L 58 12 M 60 14 L 58 16" stroke="#2E7D32" strokeWidth="1.5" fill="none"/>
                                <text x="62" y="16" fontSize="7" fill="#2E7D32" fontWeight="bold">Aman!</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.primary}15` }}>
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            {/* Main CTA button */}
            <button
              onClick={() => navigate(`/checklist/${recipe.id}`)}
              className="w-full py-4 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.01] cursor-pointer"
              style={{ 
                backgroundColor: colors.primary,
                fontFamily: "'Fredoka', sans-serif"
              }}
            >
              Mulai Masak! 🍴
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

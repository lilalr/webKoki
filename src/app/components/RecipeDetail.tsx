import { ArrowLeft, Bookmark, Check, Play, ChevronDown, ChevronUp, Volume2, Settings, Pause } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { getRecipeById } from "../data/recipes";
import { BottomNav } from "./BottomNav";
import { useTheme } from "../context/ThemeContext";

export function RecipeDetail() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [expandedCuttingCard, setExpandedCuttingCard] = useState<number | null>(null);
  const [showAlternatives, setShowAlternatives] = useState<number | null>(null);
  const [playingStep, setPlayingStep] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

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
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      {/* Header */}
      <div
        className="px-4 md:px-8 lg:px-12 pt-8 pb-32 rounded-b-[2rem]"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                {recipe.title}
              </h1>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/20 backdrop-blur-sm"
            >
              <Bookmark
                size={24}
                className="text-white"
                style={{
                  fill: isBookmarked ? "white" : "none"
                }}
              />
            </button>
            <div className="text-6xl md:text-7xl">{recipe.emoji}</div>
          </div>

          {/* Info chips */}
          <div className="flex gap-2 flex-wrap mt-4">
            <div className="rounded-full px-4 py-2 bg-white/20 backdrop-blur-sm">
              <span className="text-sm text-white">⏱ {recipe.time}</span>
            </div>
            <div className="rounded-full px-4 py-2 bg-white/20 backdrop-blur-sm">
              <span className="text-sm text-white">🔥 {recipe.categoryName}</span>
            </div>
            <div className="rounded-full px-4 py-2 bg-white/20 backdrop-blur-sm">
              <span className="text-sm text-white">🥚 {recipe.difficulty}</span>
            </div>
            <div className="rounded-full px-4 py-2 bg-white/20 backdrop-blur-sm">
              <span className="text-sm text-white">💰 Bahan Murah</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 max-w-6xl mx-auto -mt-24">
        {/* Warning card - if fire/knife involved */}
        {hasDanger && (
          <div className="mb-6">
            <div className="rounded-[16px] p-4 shadow-lg" style={{ backgroundColor: `${colors.danger}15`, borderLeft: `4px solid ${colors.danger}` }}>
              <div className="flex gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                  <span className="font-bold">Hati-hati!</span> Gunakan kompor dengan pengawasan pertama kali ya.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bahan-bahan section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>🛒 Bahan-bahan</h2>
            <div className="px-4 py-2 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}>
              <span className="text-sm font-semibold" style={{ color: colors.primary }}>Semua ada di dapur rumah!</span>
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

              return (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full rounded-2xl p-4 shadow-lg flex items-center gap-4 transition-all"
                    style={{ backgroundColor: checkedIngredients[index] ? `${colors.primary}20` : colors.cardBg }}
                  >
                    <button
                      onClick={() => toggleIngredient(index)}
                      className="flex items-center gap-4 flex-1"
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: checkedIngredients[index] ? colors.primary : colors.cardBg,
                          borderColor: checkedIngredients[index] ? colors.primary : colors.textSecondary
                        }}
                      >
                        {checkedIngredients[index] && (
                          <Check size={14} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span
                        className="flex-1 text-left font-semibold"
                        style={{ color: checkedIngredients[index] ? colors.primary : colors.text }}
                      >
                        {ingredient.name}
                      </span>
                      <span className="text-sm" style={{ color: colors.textSecondary }}>{ingredient.amount}</span>
                    </button>
                    {hasAlternative && (
                      <button
                        onClick={() => setShowAlternatives(showAlternatives === index ? null : index)}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
                      >
                        {showAlternatives === index ? "Tutup" : "Gak ada?"}
                      </button>
                    )}
                  </div>

                  {/* Alternatives dropdown */}
                  {hasAlternative && showAlternatives === index && (
                    <div
                      className="rounded-xl p-4 ml-10 shadow-md"
                      style={{ backgroundColor: `${colors.secondary}15`, borderLeft: `3px solid ${colors.secondary}` }}
                    >
                      <p className="text-sm font-semibold mb-1" style={{ color: colors.text }}>
                        💡 Bisa diganti dengan:
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
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
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
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

          <div className="space-y-4 relative">
            {recipe.steps.map((step, index) => {
              // Detect if step involves cutting based on keywords
              const isCuttingStep = step.text.toLowerCase().includes('iris') ||
                                   step.text.toLowerCase().includes('potong') ||
                                   step.text.toLowerCase().includes('cincang');

              // Steps that need video demonstration (cutting, stove lighting, etc)
              const needsVideo = index === 1 || isCuttingStep;

              return (
                <div key={index} className="relative flex gap-3">
                  {/* Left: step number circle + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    {index < recipe.steps.length - 1 && (
                      <div
                        className="w-0.5 flex-1 border-l-2 border-dashed my-1 min-h-[40px]"
                        style={{ borderColor: colors.primary }}
                      />
                    )}
                  </div>

                  {/* Right: step card */}
                  <div className="flex-1 space-y-2">
                    <div className="rounded-2xl p-4 shadow-lg" style={{ backgroundColor: colors.cardBg }}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <p className="text-sm leading-relaxed flex-1" style={{ color: colors.text }}>
                          {step.text}
                        </p>
                        {/* Audio button per step */}
                        <button
                          onClick={() => setPlayingStep(playingStep === index ? null : index)}
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                          style={{
                            backgroundColor: playingStep === index ? colors.primary : `${colors.primary}20`
                          }}
                        >
                          {playingStep === index ? (
                            <Pause size={18} className="text-white" />
                          ) : (
                            <Volume2 size={18} style={{ color: colors.primary }} />
                          )}
                        </button>
                      </div>

                      {/* Pills and thumbnail */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="flex gap-2 flex-wrap">
                            {step.isDanger && (
                              <div className="px-3 py-1 rounded-full animate-pulse" style={{ backgroundColor: `${colors.danger}20` }}>
                                <span className="text-xs font-semibold" style={{ color: colors.danger }}>⚠️ Hati-hati</span>
                              </div>
                            )}

                            {isCuttingStep && (
                              <button
                                onClick={() => setExpandedCuttingCard(expandedCuttingCard === index ? null : index)}
                                className="px-3 py-1 rounded-full transition-all flex items-center gap-1"
                                style={{ backgroundColor: `${colors.secondary}20` }}
                              >
                                <span className="text-xs font-semibold" style={{ color: colors.secondary }}>✂️ Teknik Potong</span>
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
                              className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group mt-2"
                              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl">{recipe.emoji}</span>
                              </div>
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                                  <Play size={24} style={{ color: colors.primary }} className="ml-1" />
                                </div>
                                <p className="text-sm text-white font-bold mt-3 drop-shadow-md">▶ Tonton Video Tutorial</p>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cutting technique expandable card */}
                    {isCuttingStep && expandedCuttingCard === index && (
                      <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: `${colors.secondary}15`, borderLeft: `4px solid ${colors.secondary}` }}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-bold mb-2" style={{ color: colors.secondary }}>✂️ Teknik Potong: Iris Tipis</h4>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: colors.text }}>
                              Tekuk jari seperti cakar, ujung jari menempel di bahan. Pisau mengikuti buku jari.
                            </p>

                            {/* Mini diagram - finger position */}
                            <div className="rounded-lg p-3 flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                              <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                                {/* Cutting board */}
                                <rect x="10" y="40" width="100" height="15" fill="#D2691E" rx="2"/>

                                {/* Ingredient/food */}
                                <rect x="30" y="30" width="30" height="10" fill="#FFE0B2" rx="2"/>

                                {/* Hand/fingers (simplified) */}
                                <ellipse cx="45" cy="25" rx="15" ry="8" fill="#FFE0B2"/>
                                <rect x="42" y="17" width="3" height="8" fill="#FFE0B2" rx="1.5"/>
                                <rect x="46" y="17" width="3" height="8" fill="#FFE0B2" rx="1.5"/>

                                {/* Knife */}
                                <rect x="70" y="20" width="2" height="25" fill="#424242" rx="1"/>
                                <path d="M 65 20 L 77 20 L 71 15 Z" fill="#9E9E9E"/>

                                {/* Safety indicator arrow */}
                                <path d="M 55 15 L 60 15 L 58 13 M 60 15 L 58 17" stroke="#2E7D32" strokeWidth="1.5" fill="none"/>
                                <text x="62" y="17" fontSize="6" fill="#2E7D32" fontWeight="bold">Aman!</text>
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
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-20 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.primary}30` }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
            {/* Main CTA button */}
            <button
              onClick={() => navigate(`/checklist/${recipe.id}`)}
              className="w-full py-4 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
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

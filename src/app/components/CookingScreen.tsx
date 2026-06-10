import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Volume2, Pause, Play, Check, Settings, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { getRecipeById } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";
import { VoiceOver } from "./VoiceOver";
import { BottomNav } from "./BottomNav";

export function CookingScreen() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { colors, mode } = useTheme();

  const recipe = getRecipeById(recipeId || "");

  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [playingStepIndex, setPlayingStepIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [expandedCuttingCard, setExpandedCuttingCard] = useState<number | null>(null);

  useEffect(() => {
    if (recipe) {
      setCompletedSteps(new Array(recipe.steps.length).fill(false));
    }
  }, [recipe]);

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

  const toggleStepComplete = (index: number) => {
    const newCompleted = [...completedSteps];
    newCompleted[index] = !newCompleted[index];
    setCompletedSteps(newCompleted);
  };

  const handleStepAudioToggle = (stepIndex: number) => {
    if (playingStepIndex === stepIndex) {
      setPlayingStepIndex(null);
    } else {
      setPlayingStepIndex(stepIndex);
      setIsPlayingAll(false);
    }
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      setPlayingStepIndex(null);
    } else {
      setIsPlayingAll(true);
      setPlayingStepIndex(0);
    }
  };

  const handleStepAudioComplete = (stepIndex: number) => {
    if (isPlayingAll && stepIndex < recipe.steps.length - 1) {
      setPlayingStepIndex(stepIndex + 1);
    } else {
      setPlayingStepIndex(null);
      setIsPlayingAll(false);
    }
  };

  const checkedStepsCount = completedSteps.filter(Boolean).length;
  const allStepsCompleted = checkedStepsCount === recipe.steps.length;
  const percentage = Math.round((checkedStepsCount / recipe.steps.length) * 100);

  const hasDanger = recipe.steps.some(step => step.isDanger);

  return (
    <div className="min-h-screen pt-20 pb-32" style={{ background: colors.background }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Banner with gradient and decorative blobs */}
        <div
          className="px-6 md:px-12 pt-8 pb-8 rounded-[2.5rem] shadow-xl overflow-hidden relative mb-8"
          style={{ backgroundColor: colors.primary }}
        >
          {/* Decorative background blobs */}
          <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute left-[-30px] bottom-[-60px] w-48 h-48 rounded-full bg-black/5 blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                onClick={() => navigate(`/resep/${recipeId}`)}
                className="w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md text-white"
              >
                <ArrowLeft size={22} />
              </button>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Mulai Masak! 👨‍🍳
                </h1>
              </div>
              
              {/* Animated floating recipe emoji */}
              <div className="text-5xl md:text-7xl animate-float select-none pointer-events-none ml-2">
                {recipe.emoji}
              </div>
            </div>

            <h2 className="text-white/95 text-lg md:text-2xl font-bold ml-15 mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {recipe.title}
            </h2>
            <p className="text-white/90 text-xs md:text-sm font-medium ml-15 max-w-3xl leading-relaxed">
              Ikuti panduan langkah demi langkah di bawah ini. Centang setiap langkah setelah kamu menyelesaikannya!
            </p>
          </div>
        </div>
      </div>

      <div className="px-2 md:px-6 max-w-4xl mx-auto mt-2">
        {/* Progress Bar */}
        <div className="rounded-2xl p-4 shadow-lg mb-6" style={{ backgroundColor: colors.cardBg }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
              Progres Memasak: {checkedStepsCount} dari {recipe.steps.length} langkah selesai
            </p>
            <p className="text-sm font-bold" style={{ color: colors.primary }}>{percentage}%</p>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.primary}20` }}>
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${percentage}%`, backgroundColor: colors.primary }}
            />
          </div>
          <p className="text-xs font-semibold mt-3 text-left leading-relaxed animate-fade-in" style={{ color: colors.textSecondary }}>
            📌 <span className="font-bold">Tips:</span> Centang lingkaran nomor di sebelah kiri atau ketuk isi langkah setelah kamu selesai mengerjakannya agar kamu tahu langkah mana yang sudah dilakukan!
          </p>
        </div>

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

        {/* Steps section */}
        <div className="mb-32">
          {/* Audio controls card */}
          <div className="rounded-2xl p-4 shadow-lg mb-6" style={{ backgroundColor: colors.cardBg }}>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white shadow-md active:scale-95 transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                {isPlayingAll ? (
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
                      { speed: 0.75, label: "🐢 Lambat" },
                      { speed: 1.0, label: "▶️ Normal" },
                      { speed: 1.25, label: "⚡ Cepat" }
                    ].map(({ speed, label }) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackRate(speed)}
                        className="flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
                        style={{
                          backgroundColor: playbackRate === speed ? colors.primary : `${colors.primary}15`,
                          color: playbackRate === speed ? "white" : colors.primary
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

          {/* Steps list */}
          <div className="space-y-6 relative">
            {recipe.steps.map((step, index) => {
              // Detect if step involves cutting based on keywords
              const isCuttingStep = step.text.toLowerCase().includes('iris') ||
                                   step.text.toLowerCase().includes('potong') ||
                                   step.text.toLowerCase().includes('cincang');

              // Steps that need video demonstration (cutting, stove lighting, etc)
              const needsVideo = index === 1 || isCuttingStep;
              const isPlaying = playingStepIndex === index;
              const isChecked = completedSteps[index];

              return (
                <div key={index} className="relative flex gap-4">
                  {/* Left: step number circle + connecting line */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => toggleStepComplete(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 z-10 ${
                        isPlaying ? 'scale-110 ring-4' : ''
                      } cursor-pointer`}
                      style={{ 
                        backgroundColor: isChecked ? colors.primary : colors.textSecondary,
                        // @ts-ignore
                        '--tw-ring-color': `${colors.primary}40`,
                        boxShadow: isPlaying ? `0 0 15px ${colors.primary}` : 'none'
                      }}
                    >
                      {isChecked ? (
                        <Check size={18} className="text-white font-bold" strokeWidth={3} />
                      ) : (
                        <span className="text-white font-bold">{index + 1}</span>
                      )}
                    </button>
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
                        backgroundColor: isChecked ? `${colors.primary}10` : colors.cardBg,
                        borderColor: isPlaying ? colors.primary : isChecked ? `${colors.primary}40` : 'transparent',
                        boxShadow: isPlaying ? `0 12px 25px -8px ${colors.primary}30` : '',
                        opacity: isChecked ? 0.85 : 1
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <button
                          onClick={() => toggleStepComplete(index)}
                          className="text-sm md:text-base leading-relaxed flex-1 font-semibold text-left cursor-pointer"
                          style={{ 
                            color: isChecked ? colors.textSecondary : colors.text,
                            textDecoration: isChecked ? "line-through" : "none"
                          }}
                        >
                          {step.text}
                          {isChecked && (
                            <span className="text-xs font-bold block mt-1.5 transition-all duration-300 animate-fade-in" style={{ color: colors.primary }}>
                              Sudah dilakukan! ✅
                            </span>
                          )}
                        </button>
                        
                        {/* Audio button per step */}
                        <button
                          onClick={() => handleStepAudioToggle(index)}
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all active:scale-90 cursor-pointer"
                          style={{
                            backgroundColor: isPlaying ? colors.primary : `${colors.primary}15`
                          }}
                        >
                          {isPlaying ? (
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

                    {/* VoiceOver component for each step */}
                    {isPlaying && (
                      <VoiceOver
                        text={`Langkah ${index + 1}. ${step.text}`}
                        rate={playbackRate}
                        autoPlay={true}
                        onEnd={() => handleStepAudioComplete(index)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 pt-4 pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.primary}15` }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <button
              onClick={() => allStepsCompleted && navigate(`/selesai?recipeId=${recipeId}`)}
              disabled={!allStepsCompleted}
              className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95 hover:scale-[1.01] flex items-center justify-center gap-2 ${
                allStepsCompleted ? "animate-pulse-scale" : "opacity-60"
              }`}
              style={{
                backgroundColor: allStepsCompleted ? colors.primary : (mode === "dark" ? "#374151" : "#D1D5DB"),
                color: allStepsCompleted ? "#FFFFFF" : (mode === "dark" ? "#9CA3AF" : "#6B7280"),
                fontFamily: "'Fredoka', sans-serif",
                cursor: allStepsCompleted ? "pointer" : "not-allowed"
              }}
            >
              {allStepsCompleted ? "Selesai Masak! 🏁" : "Selesaikan semua langkah..."}
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

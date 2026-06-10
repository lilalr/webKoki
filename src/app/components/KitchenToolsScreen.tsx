import { useState } from "react";
import { ArrowLeft, Volume2, Pause } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { BottomNav } from "./BottomNav";
import { kitchenTools } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";
import { VoiceOver } from "./VoiceOver";

export function KitchenToolsScreen() {
  const navigate = useNavigate();
  const { toolId } = useParams();
  const { colors } = useTheme();
  const [playingStepIndex, setPlayingStepIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const tool = kitchenTools.find((t) => t.id === toolId);

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

  const handleStepComplete = (stepIndex: number) => {
    if (isPlayingAll && stepIndex < tool!.content.length - 1) {
      setPlayingStepIndex(stepIndex + 1);
    } else {
      setPlayingStepIndex(null);
      setIsPlayingAll(false);
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
            Panduan tidak ditemukan
          </h2>
          <button
            onClick={() => navigate("/alat-dapur")}
            className="mt-4 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all"
            style={{ backgroundColor: colors.primary }}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32" style={{ background: colors.background }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Fallback beautiful gradient header */}
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
                onClick={() => navigate("/alat-dapur")}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
              >
                <ArrowLeft size={22} className="text-white" />
              </button>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  {tool.title}
                </h1>
              </div>
              
              {/* Animated floating recipe emoji */}
              <div className="text-5xl md:text-7xl animate-float select-none pointer-events-none ml-2">
                {tool.emoji}
              </div>
            </div>

            {/* Subtext description */}
            <p className="text-white/90 text-sm md:text-lg font-medium max-w-3xl leading-relaxed">
              Pelajari cara menggunakan alat ini dengan aman dan benar
            </p>
          </div>
        </div>
      </div>

      <div className="px-2 md:px-6 max-w-4xl mx-auto mt-2">
        {/* Tool Photo */}
        {tool.image && (
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-xl mb-8 group">
            <img
              src={tool.image}
              alt={tool.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Danger warning */}
        {tool.isDanger && (
          <div className="mb-8 animate-fade-in">
            <div className="rounded-[16px] p-4 shadow-lg flex items-center gap-4 border" style={{ backgroundColor: `${colors.danger}12`, borderColor: `${colors.danger}30`, borderLeft: `6px solid ${colors.danger}` }}>
              <span className="text-2xl inline-block animate-shake-danger flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-bold" style={{ color: colors.danger }}>Perlu Perhatian Ekstra!</p>
                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                  Panduan ini melibatkan penggunaan alat yang memerlukan perhatian ekstra. Selalu lakukan dengan hati-hati dan minta bantuan orang dewasa jika perlu!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Video section */}
        {tool.videoUrl && (
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl mb-8" style={{ backgroundColor: colors.cardBg }}>
            <div className="p-5 flex items-center gap-3" style={{ backgroundColor: colors.primary }}>
              <div className="text-3xl">📹</div>
              <div>
                <h3 className="font-bold text-white text-lg" style={{ fontFamily: "'Fredoka', sans-serif" }}>Video Tutorial</h3>
                <p className="text-sm text-white/95">Tonton dulu untuk lebih jelas!</p>
              </div>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={tool.videoUrl}
                title={`Video Tutorial ${tool.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Steps section */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>
                📋 Panduan Langkah Demi Langkah
              </h2>

              {/* Play All Button */}
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white shadow-md active:scale-95 transition-all self-start sm:self-auto"
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
            </div>

            {/* Speed Control */}
            <div className="rounded-2xl p-4 shadow-lg mb-6" style={{ backgroundColor: colors.cardBg }}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs md:text-sm font-semibold" style={{ color: colors.textSecondary }}>
                  Kecepatan suara:
                </span>
                {[
                  { label: "Lambat", value: 0.75 },
                  { label: "Normal", value: 1 },
                  { label: "Cepat", value: 1.25 }
                ].map((speed) => (
                  <button
                    key={speed.value}
                    onClick={() => setPlaybackRate(speed.value)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
                    style={{
                      backgroundColor: playbackRate === speed.value ? colors.primary : `${colors.primary}15`,
                      color: playbackRate === speed.value ? "white" : colors.primary,
                    }}
                  >
                    {speed.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 relative">
            {tool.content.map((step, index) => {
              const isPlaying = playingStepIndex === index;

              return (
                <div key={index} className="relative flex gap-4">
                  {/* Left: step number circle + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 z-10 ${
                        isPlaying ? 'scale-110 ring-4' : ''
                      }`}
                      style={{ 
                        backgroundColor: colors.primary,
                        // @ts-ignore
                        '--tw-ring-color': `${colors.primary}40`,
                        boxShadow: isPlaying ? `0 0 15px ${colors.primary}` : 'none'
                      }}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    {index < tool.content.length - 1 && (
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
                        borderColor: isPlaying ? colors.primary : 'transparent',
                        boxShadow: isPlaying ? `0 12px 25px -8px ${colors.primary}30` : ''
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm md:text-base leading-relaxed flex-1 font-medium" style={{ color: colors.text }}>
                          {step}
                        </p>
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
                    </div>

                    {/* VoiceOver component for each step */}
                    {isPlaying && (
                      <VoiceOver
                        text={`Langkah ${index + 1}. ${step}`}
                        rate={playbackRate}
                        autoPlay={true}
                        onEnd={() => handleStepComplete(index)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success message */}
        <div
          className="mt-8 text-center rounded-[2.5rem] p-8 shadow-xl mb-12"
          style={{ backgroundColor: `${colors.primary}12`, border: `1px dashed ${colors.primary}40` }}
        >
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: colors.primary, fontFamily: "'Fredoka', sans-serif" }}>
            Hebat, Kamu Sudah Paham!
          </p>
          <p className="text-sm md:text-base mb-6 font-semibold" style={{ color: colors.textSecondary }}>
            Sekarang kamu sudah tahu cara menggunakan {tool.title} dengan aman!
          </p>
          <button
            onClick={() => navigate("/alat-dapur")}
            className="px-8 py-4 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
            style={{ backgroundColor: colors.primary, fontFamily: "'Fredoka', sans-serif" }}
          >
            Kembali ke Daftar Alat 🏠
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

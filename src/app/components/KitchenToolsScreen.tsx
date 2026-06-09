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
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: colors.background }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/alat-dapur")}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.cardBg }}
            >
              <ArrowLeft size={24} style={{ color: colors.primary }} />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
                {tool.title}
              </h1>
            </div>
            <div className="text-6xl md:text-7xl">{tool.emoji}</div>
          </div>

          <p className="text-base md:text-lg ml-16" style={{ color: colors.textSecondary }}>
            Pelajari cara menggunakan alat ini dengan aman dan benar
          </p>
        </div>

        {/* Danger warning */}
        {tool.isDanger && (
          <div className="rounded-[16px] p-4 mb-6 shadow-md" style={{ backgroundColor: `${colors.danger}15`, borderLeft: `4px solid ${colors.danger}` }}>
            <div className="flex gap-3">
              <span className="text-2xl animate-pulse">⚠️</span>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text }}>Perlu Perhatian Ekstra!</p>
                <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                  Panduan ini melibatkan penggunaan alat yang memerlukan perhatian ekstra.
                  Selalu lakukan dengan hati-hati dan minta bantuan orang dewasa jika perlu!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Video section */}
        {tool.videoUrl && (
          <div className="rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] mb-6" style={{ backgroundColor: colors.cardBg }}>
            <div className="p-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <div className="text-3xl">📹</div>
              <div>
                <h3 className="font-bold text-white text-lg">Video Tutorial</h3>
                <p className="text-sm text-white/90">Tonton dulu untuk lebih jelas!</p>
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
        <div className="rounded-[24px] p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]" style={{ backgroundColor: colors.cardBg }}>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text }}>
                  Panduan Langkah Demi Langkah
                </h2>
                <p className="text-sm md:text-base" style={{ color: colors.textSecondary }}>
                  Ikuti dengan seksama ya!
                </p>
              </div>

              {/* Play All Button */}
              <button
                onClick={handlePlayAll}
                className="px-6 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                style={{ background: isPlayingAll ? colors.secondary : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                {isPlayingAll ? (
                  <>
                    <Pause size={20} />
                    <span>Berhenti</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={20} />
                    <span>Dengarkan Semua</span>
                  </>
                )}
              </button>
            </div>

            {/* Speed Control */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
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
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: playbackRate === speed.value ? colors.primary : colors.background,
                    color: playbackRate === speed.value ? "white" : colors.text,
                    border: `2px solid ${playbackRate === speed.value ? colors.primary : colors.textSecondary}30`
                  }}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {tool.content.map((step, index) => {
              const isPlaying = playingStepIndex === index;

              return (
                <div key={index}>
                  <div
                    className="rounded-[16px] p-5 shadow-sm hover:shadow-md transition-all"
                    style={{
                      backgroundColor: isPlaying ? `${colors.primary}10` : colors.background,
                      borderLeft: `4px solid ${colors.primary}`
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg leading-relaxed" style={{ color: colors.text }}>
                          {step}
                        </p>
                      </div>

                      {/* Audio button for each step */}
                      <button
                        onClick={() => handleStepAudioToggle(index)}
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-all"
                        style={{
                          backgroundColor: isPlaying ? colors.secondary : colors.primary
                        }}
                      >
                        {isPlaying ? (
                          <Pause size={18} className="text-white" />
                        ) : (
                          <Volume2 size={18} className="text-white" />
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
              );
            })}
          </div>
        </div>

        {/* Success message */}
        <div
          className="mt-8 text-center rounded-[24px] p-8 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` }}
        >
          <div className="text-6xl mb-4">✅</div>
          <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            Selamat!
          </p>
          <p className="text-base md:text-lg mb-6" style={{ color: colors.text }}>
            Kamu sudah mempelajari cara menggunakan {tool.title}!
          </p>
          <button
            onClick={() => navigate("/alat-dapur")}
            className="px-8 py-4 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Kembali ke Daftar Alat 🏠
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

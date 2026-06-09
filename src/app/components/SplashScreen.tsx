import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../../imports/image-17.png";

export function SplashScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}
    >
      {/* Desktop/Mobile responsive container */}
      <div className="w-full max-w-6xl relative">
        {/* Background decorations for desktop */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content - responsive layout */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 py-12 lg:py-20 px-6">
          {/* Left side - mascot (desktop) / top (mobile) */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            {/* Top badge */}
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <span className="text-white text-sm md:text-base font-semibold">
                Belajar Masak Yuk! 🍳
              </span>
            </div>

            {/* Hero illustration */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-3xl"></div>
              <div className="relative w-72 md:w-80 lg:w-96">
                <ImageWithFallback
                  src={heroImage}
                  alt="Ilustrasi chef muda memasak dengan peralatan ajaib"
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>

            {/* Stats row - desktop horizontal */}
            <div className="flex gap-3">
              <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm whitespace-nowrap">🍽️ 4 Modul</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm whitespace-nowrap">⏱️ Step-by-step</span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm whitespace-nowrap">✅ Bahan Rumahan</span>
              </div>
            </div>
          </div>

          {/* Right side - content */}
          <div className="flex flex-col items-center lg:items-start max-w-xl">
            {/* App title */}
            <h1 className="text-white text-4xl lg:text-6xl font-bold text-center lg:text-left mb-4 leading-tight drop-shadow-lg">
              Kemandirian di Dapur
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl italic text-center lg:text-left mb-8"
              style={{ color: colors.accent }}
            >
              Masak sendiri itu bisa banget!
            </p>

            {/* Description */}
            <p className="text-white/90 text-base lg:text-lg text-center lg:text-left mb-8 leading-relaxed">
              Belajar masak dengan panduan step-by-step khusus untuk remaja.
              Semua resep menggunakan bahan yang pasti ada di dapur rumah!
            </p>

            {/* CTA button */}
            <button
              onClick={() => navigate("/kategori")}
              className="w-full lg:w-auto px-12 py-4 bg-white rounded-full font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
              style={{ color: colors.primary }}
            >
              Ayo Mulai! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

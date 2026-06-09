import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import chefImage from "../../imports/chef_girl_transparent_v2.png";

export function SplashScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background SVG Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* On desktop: beautiful vertical wave transition */}
        <svg
          className="absolute right-0 top-0 bottom-0 h-full w-[60%] hidden lg:block"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M220,0 C120,180 80,320 160,480 C240,620 90,800 90,800 L600,800 L600,0 Z"
            fill="url(#themeGrad)"
          />
          <defs>
            <linearGradient id="themeGrad" x1="600" y1="0" x2="100" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
          </defs>
        </svg>

        {/* On mobile: beautiful horizontal wave transition */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[55%] lg:hidden"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C120,40 280,180 400,80 L400,500 L0,500 Z"
            fill="url(#themeGradMobile)"
          />
          <defs>
            <linearGradient id="themeGradMobile" x1="200" y1="500" x2="200" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 py-4 md:px-12 md:py-6 select-none">
        {/* Brand logo */}
        <div 
          className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-wider drop-shadow-sm transition-colors duration-300"
          style={{ color: colors.primary }}
        >
          <span className="text-xl md:text-2xl animate-wiggle inline-block">🍳</span>
          <span>WEB KOKI</span>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto py-2 drop-shadow-sm scrollbar-none">
          <button
            onClick={() => navigate("/")}
            className="text-foreground lg:text-white hover:opacity-80 transition-all text-xs md:text-sm font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap pb-1 border-b-2 border-current lg:border-white"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/kategori")}
            className="text-foreground/80 lg:text-white/80 hover:text-foreground lg:hover:text-white hover:scale-105 transition-all text-xs md:text-sm font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap pb-1 border-b-2 border-transparent hover:border-current lg:hover:border-white/50"
          >
            Kategori
          </button>

          <button
            onClick={() => navigate("/favorit")}
            className="text-foreground/80 lg:text-white/80 hover:text-foreground lg:hover:text-white hover:scale-105 transition-all text-xs md:text-sm font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap pb-1 border-b-2 border-transparent hover:border-current lg:hover:border-white/50"
          >
            Favorit
          </button>
          <button
            onClick={() => navigate("/profil")}
            className="text-foreground/80 lg:text-white/80 hover:text-foreground lg:hover:text-white hover:scale-105 transition-all text-xs md:text-sm font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap pb-1 border-b-2 border-transparent hover:border-current lg:hover:border-white/50"
          >
            Profil
          </button>
        </nav>
      </header>

      {/* Left Column (Content) */}
      <div className="z-10 flex-1 flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 lg:pt-32 lg:pb-16 lg:pl-20 lg:w-[40%]">
        {/* Spacer on desktop to push main content down */}
        <div className="hidden lg:block"></div>

        {/* Main Content */}
        <div className="flex flex-col items-start gap-4 lg:gap-6 my-auto max-w-xl">
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide uppercase leading-tight drop-shadow-sm transition-colors duration-300"
            style={{ color: colors.primary }}
          >
            KEMANDIRIAN <br />
            DI DAPUR
          </h1>
          
          <button
            onClick={() => navigate("/kategori")}
            className="px-8 py-3 text-white rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 select-none"
            style={{ backgroundColor: colors.primary }}
          >
            AYO MASAK! 🚀
          </button>

          <p 
            className="text-sm md:text-base leading-relaxed max-w-md font-medium transition-colors duration-300"
            style={{ color: colors.text }}
          >
            Masak sendiri itu bisa banget! Belajar masak dengan panduan step-by-step khusus untuk remaja.
            Semua resep menggunakan bahan yang pasti ada di dapur rumah!
          </p>
        </div>

        {/* Footer Page Indicators */}
        <div className="flex items-center gap-2 mt-8 lg:mt-0">
          <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors.primary, opacity: 1 }}></span>
          <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors.primary, opacity: 0.4 }}></span>
          <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors.primary, opacity: 0.4 }}></span>
        </div>
      </div>

      {/* Right Column (Mascot Illustration) */}
      <div className="z-10 lg:w-[60%] flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 min-h-[45vh] lg:min-h-screen relative">
        <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center animate-float">
          <img
            src={chefImage}
            alt="Chef Girl Mascot"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </div>
  );
}

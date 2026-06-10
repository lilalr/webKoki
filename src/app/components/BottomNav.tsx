import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../context/ThemeContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, mode } = useTheme();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Kategori", path: "/kategori" },

    { label: "Favorit", path: "/favorit" },
    { label: "Profil", path: "/profil" },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 h-16 z-50 flex justify-between items-center px-6 md:px-12 border-b backdrop-blur-lg transition-all duration-300 shadow-sm"
      style={{ 
        backgroundColor: mode === "dark" ? "rgba(15, 20, 25, 0.85)" : "rgba(255, 255, 255, 0.85)",
        borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"
      }}
    >
      {/* Brand logo */}
      <div 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-bold text-lg md:text-2xl tracking-wide cursor-pointer select-none group active:scale-95 transition-all duration-200"
        style={{ color: colors.primary, fontFamily: "'Fredoka', sans-serif" }}
      >
        <span className="text-xl md:text-2xl inline-block group-hover:animate-wiggle transition-transform duration-300">🍳</span>
        <span className="transition-colors duration-200" style={{ color: colors.primary }}>
          WEB KOKI
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex items-center gap-2 md:gap-4 py-2 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === "/kategori" && location.pathname.startsWith("/kategori")) ||
            (item.path === "/kategori" && location.pathname.startsWith("/resep")) ||
            (item.path === "/kategori" && location.pathname.startsWith("/masak")) ||
            (item.path === "/alat-dapur" && location.pathname.startsWith("/alat"));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-300 active:scale-95 group overflow-hidden"
              style={{ 
                color: isActive ? "white" : colors.text,
                backgroundColor: isActive ? colors.primary : "transparent",
                fontFamily: "'Fredoka', sans-serif"
              }}
            >
              {/* Hover Pill Background */}
              {!isActive && (
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                  style={{ backgroundColor: `${colors.primary}15` }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

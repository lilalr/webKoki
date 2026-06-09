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
      className="fixed top-0 left-0 right-0 h-16 z-50 flex justify-between items-center px-6 md:px-12 border-b backdrop-blur-md transition-colors duration-300"
      style={{ 
        backgroundColor: mode === "dark" ? "rgba(15, 20, 25, 0.9)" : "rgba(255, 255, 255, 0.9)",
        borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Brand logo */}
      <div 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-wider cursor-pointer select-none"
        style={{ color: colors.primary }}
      >
        <span className="text-xl md:text-2xl animate-wiggle inline-block">🍳</span>
        <span>WEB KOKI</span>
      </div>

      {/* Navigation links */}
      <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto py-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === "/kategori" && location.pathname.startsWith("/kategori")) ||
            (item.path === "/kategori" && location.pathname.startsWith("/resep")) ||
            (item.path === "/kategori" && location.pathname.startsWith("/checklist")) ||
            (item.path === "/alat-dapur" && location.pathname.startsWith("/alat"));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="hover:scale-105 transition-all text-xs md:text-sm font-bold tracking-wider uppercase cursor-pointer whitespace-nowrap pb-1 border-b-2"
              style={{ 
                color: isActive ? colors.primary : colors.textSecondary,
                borderColor: isActive ? colors.primary : "transparent"
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

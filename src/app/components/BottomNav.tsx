import { Home, BookOpen, Heart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../context/ThemeContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const navItems = [
    { icon: Home, label: "Home", path: "/", emoji: "🏠" },
    { icon: BookOpen, label: "Modul", path: "/kategori", emoji: "📚" },
    { icon: Heart, label: "Favorit", path: "/favorit", emoji: "❤️" },
    { icon: User, label: "Profil", path: "/profil", emoji: "👤" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] px-4 py-2 flex justify-around items-center z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path ||
          (item.path === "/kategori" && location.pathname.startsWith("/kategori")) ||
          (item.path === "/kategori" && location.pathname.startsWith("/resep")) ||
          (item.path === "/kategori" && location.pathname.startsWith("/checklist")) ||
          (item.path === "/kategori" && location.pathname.startsWith("/alat"));

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all relative"
          >
            <div className="relative">
              <span className="text-2xl">{item.emoji}</span>
              {/* Dot indicator for active tab */}
              {isActive && (
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: isActive ? colors.primary : colors.textSecondary }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

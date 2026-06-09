import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeMode = "fresh" | "pink" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    danger: string;
  };
}

const themeConfigs = {
  fresh: {
    primary: "#646B41", // Hijau tua (dari palette)
    secondary: "#99AD7A", // Hijau sedang (dari palette)
    accent: "#DCCCAC", // Krem/beige (dari palette)
    background: "#FFF8EC", // Krem sangat terang (dari palette)
    cardBg: "#FFFFFF", // Putih murni
    text: "#212121", // Hitam untuk teks
    textSecondary: "#646B41", // Hijau tua untuk teks sekunder
    danger: "#F44336", // Merah untuk peringatan bahaya
  },
  pink: {
    primary: "#D6336C", // Pink tua/magenta (dari palette baru)
    secondary: "#FF4081", // Pink cerah (dari palette baru)
    accent: "#FFB6C1", // Pink terang/pastel (dari palette baru)
    background: "#FFF5F8", // Pink sangat lembut (dari palette baru)
    cardBg: "#FFFFFF", // Putih murni
    text: "#1A1A2E", // Hitam untuk teks
    textSecondary: "#D6336C", // Pink tua untuk teks sekunder
    danger: "#F44336", // Merah untuk peringatan bahaya
  },
  dark: {
    primary: "#133E87", // Biru tua/navy (dari palette)
    secondary: "#608BC1", // Biru sedang (dari palette)
    accent: "#CBDCEB", // Biru terang (dari palette)
    background: "#0F1419", // Gelap (custom untuk dark mode)
    cardBg: "#1A2332", // Card gelap (custom)
    text: "#F3F3E0", // Cream terang untuk teks (dari palette)
    textSecondary: "#CBDCEB", // Biru terang untuk teks sekunder
    danger: "#F87171", // Merah terang untuk peringatan bahaya
  },
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "fresh",
  setMode: () => {},
  colors: themeConfigs.fresh,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem("theme-mode");
      if (saved && (saved === "fresh" || saved === "pink" || saved === "dark")) {
        return saved as ThemeMode;
      }
    } catch (error) {
      console.warn("localStorage not available:", error);
    }
    return "fresh";
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme-mode", mode);
    } catch (error) {
      console.warn("Cannot save to localStorage:", error);
    }
  }, [mode]);

  const colors = themeConfigs[mode];

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

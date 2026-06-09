import { AlertTriangle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface DangerWarningProps {
  text: string;
}

export function DangerWarning({ text }: DangerWarningProps) {
  const { colors } = useTheme();

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-2xl border-2 mt-2 animate-pulse"
      style={{
        backgroundColor: `${colors.danger}10`,
        borderColor: colors.danger,
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
          style={{ backgroundColor: colors.danger }}
        >
          <AlertTriangle size={18} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm mb-1" style={{ color: colors.danger }}>
          ⚠️ PERHATIAN!
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
          {text}
        </p>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface VoiceOverProps {
  text: string;
  autoPlay?: boolean;
  rate?: number;
  onEnd?: () => void;
}

export function VoiceOver({ text, autoPlay = false, rate = 1.0, onEnd }: VoiceOverProps) {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    if (autoPlay && isSupported) {
      speak();
    }
    // Cleanup: stop speech when component unmounts
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay]);

  const speak = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Indonesian language
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {!isPlaying ? (
        <button
          onClick={speak}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: colors.primary, color: "white" }}
        >
          <Volume2 size={18} />
          <span className="text-sm font-semibold">Dengarkan</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {isPaused ? (
            <button
              onClick={resume}
              className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              <Play size={18} />
            </button>
          ) : (
            <button
              onClick={pause}
              className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              <Pause size={18} />
            </button>
          )}
          <button
            onClick={stop}
            className="p-2 rounded-full shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: colors.danger, color: "white" }}
          >
            <VolumeX size={18} />
          </button>
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-1 h-4 rounded-full animate-pulse delay-75" style={{ backgroundColor: colors.primary }}></div>
            <div className="w-1 h-3 rounded-full animate-pulse delay-150" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

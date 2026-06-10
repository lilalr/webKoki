import chefGirl from "../../imports/chef_girl_transparent_v2.png";
import chefBoy from "../../imports/chef_boy_standing.png";
import { useState, useEffect } from "react";

interface ChefMascotProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export function ChefMascot({ size = "medium", className = "" }: ChefMascotProps) {
  const [mascot, setMascot] = useState("perempuan");

  useEffect(() => {
    const updateMascot = () => {
      const savedMascot = localStorage.getItem("mascot-gender");
      if (savedMascot) {
        setMascot(savedMascot);
      }
    };
    updateMascot();
    window.addEventListener("mascot-changed", updateMascot);
    return () => window.removeEventListener("mascot-changed", updateMascot);
  }, []);

  const sizeClasses = {
    small: "w-16 h-16 md:w-20 md:h-20",
    medium: "w-36 h-36 md:w-44 md:h-44",
    large: "w-48 h-48 md:w-56 md:h-56",
  };

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Glow background effect */}
      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-110" />

      {/* Chef Image */}
      <img
        src={mascot === "laki-laki" ? chefBoy : chefGirl}
        alt="Chef Mascot"
        className={`object-contain animate-float-slow drop-shadow-xl ${sizeClasses[size]}`}
      />
    </div>
  );
}


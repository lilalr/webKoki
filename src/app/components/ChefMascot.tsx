export function ChefMascot() {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-110" />

      {/* Chef SVG - Gender-neutral, friendly, simple 2D design */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Chef hat */}
        <ellipse cx="100" cy="60" rx="45" ry="15" fill="white" />
        <rect x="65" y="55" width="70" height="30" fill="white" rx="5" />
        <path
          d="M 70 40 Q 70 25 85 25 Q 90 15 100 15 Q 110 15 115 25 Q 130 25 130 40 L 130 60 L 70 60 Z"
          fill="white"
        />

        {/* Face - round, friendly */}
        <circle cx="100" cy="110" r="50" fill="#FFE0B2" />

        {/* Eyes - expressive, large, friendly */}
        <circle cx="85" cy="105" r="8" fill="#1A1A1A" />
        <circle cx="115" cy="105" r="8" fill="#1A1A1A" />
        <circle cx="87" cy="103" r="3" fill="white" />
        <circle cx="117" cy="103" r="3" fill="white" />

        {/* Smile - friendly, warm */}
        <path
          d="M 80 120 Q 100 135 120 120"
          stroke="#1A1A1A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Rosy cheeks */}
        <circle cx="70" cy="115" r="8" fill="#FF7043" opacity="0.3" />
        <circle cx="130" cy="115" r="8" fill="#FF7043" opacity="0.3" />

        {/* Body with green apron */}
        <path
          d="M 60 140 L 60 180 Q 60 190 70 190 L 130 190 Q 140 190 140 180 L 140 140"
          fill="#4CAF50"
        />

        {/* White apron on top */}
        <rect x="75" y="135" width="50" height="60" fill="white" opacity="0.9" rx="5" />

        {/* Apron pocket */}
        <rect x="85" y="160" width="30" height="20" fill="#2E7D32" opacity="0.2" rx="3" />

        {/* Arms - waving both hands */}
        <ellipse cx="45" cy="150" rx="12" ry="25" fill="#FFE0B2" transform="rotate(-20 45 150)" />
        <ellipse cx="155" cy="150" rx="12" ry="25" fill="#FFE0B2" transform="rotate(20 155 150)" />

        {/* Hands */}
        <circle cx="40" cy="135" r="10" fill="#FFE0B2" />
        <circle cx="160" cy="135" r="10" fill="#FFE0B2" />
      </svg>
    </div>
  );
}

export function MiniChefAvatar() {
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] p-1 shadow-md">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chef hat */}
          <ellipse cx="100" cy="60" rx="45" ry="15" fill="#2E7D32" />
          <rect x="65" y="55" width="70" height="30" fill="white" rx="5" />
          <path
            d="M 70 40 Q 70 25 85 25 Q 90 15 100 15 Q 110 15 115 25 Q 130 25 130 40 L 130 60 L 70 60 Z"
            fill="white"
          />
          {/* Face */}
          <circle cx="100" cy="120" r="40" fill="#FFE0B2" />
          {/* Eyes */}
          <circle cx="88" cy="115" r="5" fill="#1A1A1A" />
          <circle cx="112" cy="115" r="5" fill="#1A1A1A" />
          {/* Smile */}
          <path
            d="M 85 128 Q 100 138 115 128"
            stroke="#1A1A1A"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

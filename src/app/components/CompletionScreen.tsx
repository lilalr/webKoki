import { useNavigate, useSearchParams } from "react-router";
import { getRecipeById } from "../data/recipes";
import { useTheme } from "../context/ThemeContext";

export function CompletionScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colors } = useTheme();
  const recipeId = searchParams.get("recipeId");
  const recipe = recipeId ? getRecipeById(recipeId) : null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(to bottom, ${colors.primary}20, ${colors.secondary}20)` }}>
      {/* Confetti shapes scattered */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colorful dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
        {/* Triangles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`triangle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: `15px solid ${[colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)]}`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 z-10">
        {/* Chef mascot - CELEBRATION pose */}
        <div className="flex justify-center mb-6 relative">
          {/* Sparkles around mascot */}
          <div className="absolute -top-2 -left-2 text-2xl animate-ping">✨</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-ping delay-75">✨</div>
          <div className="absolute top-10 -left-4 text-xl animate-bounce">⭐</div>
          <div className="absolute top-10 -right-4 text-xl animate-bounce delay-100">⭐</div>

          {/* Chef with celebration pose - arms up, party hat */}
          <svg
            width="180"
            height="180"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Party hat */}
            <path d="M 100 10 L 70 50 L 130 50 Z" fill="#FF7043" />
            <ellipse cx="100" cy="50" rx="30" ry="8" fill="#FFD600" />
            <circle cx="100" cy="10" r="6" fill="#FFD600" />

            {/* Chef hat (under party hat) */}
            <ellipse cx="100" cy="65" rx="40" ry="12" fill="white" />
            <rect x="70" y="60" width="60" height="25" fill="white" rx="5" />

            {/* Face - VERY happy */}
            <circle cx="100" cy="110" r="45" fill="#FFE0B2" />

            {/* Eyes - wide and happy */}
            <circle cx="87" cy="105" r="7" fill="#1A1A1A" />
            <circle cx="113" cy="105" r="7" fill="#1A1A1A" />
            <circle cx="89" cy="103" r="3" fill="white" />
            <circle cx="115" cy="103" r="3" fill="white" />

            {/* HUGE smile */}
            <path
              d="M 75 115 Q 100 140 125 115"
              stroke="#1A1A1A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 80 120 Q 100 135 120 120"
              fill="#FF7043"
              opacity="0.3"
            />

            {/* Rosy cheeks */}
            <circle cx="68" cy="115" r="10" fill="#FF7043" opacity="0.4" />
            <circle cx="132" cy="115" r="10" fill="#FF7043" opacity="0.4" />

            {/* Body with apron */}
            <path d="M 60 140 L 60 180 Q 60 190 70 190 L 130 190 Q 140 190 140 180 L 140 140" fill="#4CAF50" />
            <rect x="75" y="135" width="50" height="60" fill="white" opacity="0.9" rx="5" />

            {/* Arms UP - celebration! */}
            <ellipse cx="35" cy="120" rx="12" ry="28" fill="#FFE0B2" transform="rotate(-40 35 120)" />
            <ellipse cx="165" cy="120" rx="12" ry="28" fill="#FFE0B2" transform="rotate(40 165 120)" />
            <circle cx="25" cy="95" r="11" fill="#FFE0B2" />
            <circle cx="175" cy="95" r="11" fill="#FFE0B2" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: colors.primary }}>
          Yeay, Kamu Berhasil! 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-center italic mb-8" style={{ color: colors.textSecondary }}>
          {recipe ? `${recipe.title} kamu pasti enak banget!` : "Masakanmu pasti enak banget!"}
        </p>

        {/* Achievement badge card */}
        <div className="rounded-3xl p-8 shadow-xl mb-6 border-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.accent }}>
          {/* Gold star icon */}
          <div className="flex justify-center mb-3">
            <div className="text-[48px] animate-bounce">⭐</div>
          </div>

          {/* Badge title */}
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: colors.text }}>
            Chef Pemula
          </h2>

          {/* Badge subtitle */}
          <p className="text-sm text-center mb-5" style={{ color: colors.primary }}>
            Modul {recipe?.categoryName || "Masak"} selesai! 🍳
          </p>

          {/* XP bar */}
          <div className="px-5 py-3 rounded-full inline-flex items-center gap-2 mx-auto w-full justify-center" style={{ backgroundColor: `${colors.secondary}20` }}>
            <span className="font-bold" style={{ color: colors.secondary }}>🔥 +50 XP earned</span>
          </div>
        </div>

        {/* Cooking summary card */}
        <div className="rounded-2xl p-6 shadow-lg mb-8" style={{ backgroundColor: colors.cardBg }}>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>Tadi kamu masak:</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{recipe?.emoji || "🍳"}</span>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>
              {recipe?.title || "Masakan Lezat"}
            </h3>
          </div>

          <div className="mb-4">
            <p className="text-sm" style={{ color: colors.textSecondary }}>⏱ Selesai dalam {recipe?.time || "~15 menit"}</p>
          </div>

          {/* Ingredients used chips */}
          <div className="flex flex-wrap gap-2">
            {recipe?.ingredients.slice(0, 4).map((ingredient, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
              >
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4 mb-8">
          {/* Primary button */}
          <button
            onClick={() => navigate("/kategori")}
            className="w-full py-4 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Coba Resep Lain 🍳
          </button>

          {/* Secondary button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-full font-bold text-lg border-2 transition-all"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.primary,
              color: colors.primary
            }}
          >
            Kembali ke Menu
          </button>
        </div>

        {/* Share section */}
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>Bagikan ke teman kamu! 📸</p>

          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-[#E1306C] to-[#F56040] text-white px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
              📸 Instagram
            </button>
            <button className="flex-1 bg-[#25D366] text-white px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

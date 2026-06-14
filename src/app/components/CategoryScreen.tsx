import { Search, Sandwich, Flame, Zap, UtensilsCrossed, Sparkles, Clock, ChefHat, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { recipes, kitchenTools } from "../data/recipes";
import { resolveImagePath } from "../utils/imagePaths";
import { useTheme } from "../context/ThemeContext";
import chefGirl from "../../imports/chef_girl_transparent_v2.png";
import chefBoy from "../../imports/chef_boy_standing.png";



export function CategoryScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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


  const categories = [
    {
      id: "pengenalan-alat",
      title: "Pengenalan Alat",
      subtitle: "Pelajari Dulu!",
      icon: UtensilsCrossed,
      badge: "Panduan",
      count: kitchenTools.length,
      isTools: true,
      color: "#00796B",
      bgColor: "#E0F2F1",
      image: "/images/cover-pengenalan-alat.png",
    },
    {
      id: "tanpa-api",
      title: "Tanpa Api",
      subtitle: "Paling Mudah!",
      icon: Sandwich,
      badge: "Termudah",
      count: recipes.filter((r) => r.category === "tanpa-api").length,
      color: "#F9A825",
      bgColor: "#FFFDE7",
      image: "/images/cover-tanpa-api.png",
    },
    {
      id: "api-kecil",
      title: "Api Kecil",
      subtitle: "Mudah Kok!",
      icon: Flame,
      badge: "Mudah",
      count: recipes.filter((r) => r.category === "api-kecil").length,
      color: "#FF7043",
      bgColor: "#FFF3E0",
      image: "/images/cover-api-kecil.jpg",
    },
    {
      id: "alat-listrik",
      title: "Alat Listrik",
      subtitle: "Perlu Fokus",
      icon: Zap,
      badge: "Menengah",
      count: recipes.filter((r) => r.category === "alat-listrik").length,
      color: "#0277BD",
      bgColor: "#E3F2FD",
      image: "/images/cover-alat-listrik.png",
    },
  ];

  // Filter recipes based on search query or active filter
  const getFilteredRecipes = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return recipes.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(query)
        );
        return titleMatch || ingredientMatch;
      });
    }

    if (activeFilter === "populer") {
      return recipes.filter((r) => r.category === "tanpa-api" || r.category === "api-kecil").slice(0, 8);
    }

    if (activeFilter === "mudah") {
      return recipes.filter((r) => r.difficulty === "Mudah");
    }

    if (activeFilter === "cepat") {
      return recipes.filter((r) => {
        const minutes = parseInt(r.time);
        return minutes >= 5 && minutes <= 10;
      });
    }

    return [];
  };

  const filteredRecipes = getFilteredRecipes();
  const hasSearchResults = (searchQuery.trim() || activeFilter) && filteredRecipes.length > 0;

  const getResultTitle = () => {
    if (searchQuery.trim()) {
      return `Hasil Pencarian "${searchQuery}"`;
    }
    if (activeFilter === "populer") return "Resep Populer 🌟";
    if (activeFilter === "mudah") return "Resep Mudah 🔥";
    if (activeFilter === "cepat") return "Resep Cepat ⚡";
    return "";
  };
  return (
    <div className="min-h-screen pt-16 pb-8 animate-fade-in" style={{ background: colors.background }}>
      {/* Header with gradient and decorative blobs */}
      <div
        className="px-6 md:px-12 pt-8 pb-10 rounded-b-[2.5rem] shadow-xl overflow-hidden relative"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Decorative background blobs */}
        <div className="absolute right-[-50px] top-[-50px] w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-[-30px] bottom-[-60px] w-48 h-48 rounded-full bg-black/5 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side: text, search, filters */}
            <div className="flex-1 w-full text-left">
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md tracking-wide">
                  Halo, Chef Muda! <span className="inline-block animate-wave-hand">👋</span>
                </h1>
                <p className="text-white/90 text-base md:text-xl font-medium">Mau belajar apa hari ini?</p>
              </div>

              {/* Search bar */}
              <div className="relative mb-5 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#757575] transition-colors group-focus-within:text-white" size={20} />
                <input
                  type="text"
                  placeholder="Cari resep dari bahan yang kamu punya"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white rounded-full py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-white/40 shadow-xl placeholder:text-[#9E9E9E] text-[#1A1A1A] font-medium transition-all duration-300 text-sm md:text-base hover:shadow-2xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757575] hover:text-[#1A1A1A] transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Filter chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => {
                    setActiveFilter(activeFilter === "populer" ? null : "populer");
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-1.5 backdrop-blur-md px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 cursor-pointer shadow-md ${
                    activeFilter === "populer" 
                      ? "bg-white text-primary font-bold shadow-lg scale-102" 
                      : "bg-white/15 hover:bg-white/25 text-white"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  <Sparkles size={14} className={activeFilter === "populer" ? "text-primary fill-primary animate-wiggle" : "text-white fill-white"} />
                  <span>Populer</span>
                </button>
                <button
                  onClick={() => {
                    setActiveFilter(activeFilter === "mudah" ? null : "mudah");
                    setSearchQuery("");
                  }}
                  className={`backdrop-blur-md px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 cursor-pointer shadow-md ${
                    activeFilter === "mudah" 
                      ? "bg-white text-primary font-bold shadow-lg scale-102" 
                      : "bg-white/15 hover:bg-white/25 text-white"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  🔥 Mudah
                </button>
                <button
                  onClick={() => {
                    setActiveFilter(activeFilter === "cepat" ? null : "cepat");
                    setSearchQuery("");
                  }}
                  className={`backdrop-blur-md px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 cursor-pointer shadow-md ${
                    activeFilter === "cepat" 
                      ? "bg-white text-primary font-bold shadow-lg scale-102" 
                      : "bg-white/15 hover:bg-white/25 text-white"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  ⚡ Cepat
                </button>
              </div>
            </div>

            {/* Right side: Mascot with swaying animation */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0 w-48 lg:w-56 select-none pointer-events-none">
              <img 
                src={mascot === "laki-laki" ? chefBoy : chefGirl} 
                alt="Chef Mascot" 
                className="w-full h-auto object-contain animate-sway drop-shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        {hasSearchResults ? (
          // Search results
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: colors.text }}>
                  {getResultTitle()}
                </h2>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Ditemukan {filteredRecipes.length} resep
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter(null);
                }}
                className="text-sm px-4 py-2 rounded-full font-semibold text-white transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                Lihat Kategori
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => navigate(`/resep/${recipe.id}`)}
                  className="rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    {recipe.image ? (
                      <div className="w-16 h-16 rounded-[16px] flex-shrink-0 overflow-hidden shadow-md">
                        <img
                          src={resolveImagePath(recipe.image)}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 rounded-[16px] flex items-center justify-center text-3xl shadow-md flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {recipe.emoji}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                        {recipe.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs" style={{ color: colors.textSecondary }}>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat size={14} />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="mt-3 inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs px-3 py-1 rounded-full font-semibold">
                    {recipe.categoryName}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (searchQuery.trim() || activeFilter) ? (
          // No results
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
              Tidak ada resep yang ditemukan
            </h2>
            <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
              Coba cari dengan kata kunci lain
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
              }}
              className="px-6 py-3 rounded-full font-bold bg-[#2E7D32] text-white shadow-lg hover:bg-[#1B5E20] transition-all"
            >
              Kembali ke Kategori
            </button>
          </div>
        ) : (
          // Categories grid
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-8" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>Pilih Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const isHovered = hoveredCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => {
                      if (category.isTools) {
                        navigate("/alat-dapur");
                      } else {
                        navigate(`/kategori/${category.id}`);
                      }
                    }}
                    className="rounded-[30px] p-6 relative transition-all duration-300 transform hover:-translate-y-2 active:scale-98 cursor-pointer select-none text-left w-full group overflow-hidden border border-transparent"
                    style={{ 
                      backgroundColor: category.bgColor,
                      boxShadow: isHovered 
                        ? `0 20px 35px -8px ${category.color}35` 
                        : '0 10px 25px -10px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Background subtle pattern or glow */}
                    <div 
                      className="absolute right-0 bottom-0 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none transition-all duration-500 group-hover:scale-150"
                      style={{ backgroundColor: category.color }}
                    />

                    {/* Badge */}
                    <div
                      className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm text-white transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: category.color,
                        fontFamily: "'Fredoka', sans-serif"
                      }}
                    >
                      {category.badge}
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-6">
                      {/* Icon or Image Container */}
                      <div 
                        className="w-20 h-20 bg-white rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 flex items-center justify-center"
                        style={{ 
                          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
                          boxShadow: isHovered ? `0 10px 20px -5px ${category.color}40` : '0 4px 10px rgba(0,0,0,0.02)'
                        }}
                      >
                        {category.image ? (
                          <img
                            src={resolveImagePath(category.image)}
                            alt={category.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon size={36} strokeWidth={2.5} style={{ color: category.color }} />
                        )}
                      </div>

                      {/* Text details */}
                      <div className="text-center w-full">
                        <p 
                          className="font-bold text-base text-[#1A1A1A] tracking-wide"
                          style={{ fontFamily: "'Fredoka', sans-serif" }}
                        >
                          {category.title}
                        </p>
                        <p className="text-xs text-[#757575] mt-1 font-medium">
                          {category.count} {category.isTools ? "panduan" : "resep"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB] my-12" />

            {/* Curriculum Info Section */}
            <div className="w-full mb-12">
              <h2 className="text-2xl font-bold mb-4 text-left" style={{ color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>
                Kurikulum & Pembagian Modul Belajar 📚
              </h2>
              <p className="text-sm md:text-base mb-8 text-left font-medium max-w-4xl" style={{ color: colors.textSecondary }}>
                Untuk membantu chef muda belajar dengan aman dan menyenangkan, materi pembelajaran di WebKoki dibagi menjadi 4 modul terstruktur berikut:
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                {/* Modul 1 */}
                <div className="rounded-[24px] p-6 shadow-sm border border-transparent hover:border-[#00796B]/20 transition-all duration-300 bg-[#E0F2F1]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-sm">
                      <UtensilsCrossed size={24} style={{ color: "#00796B" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        Modul Pengenalan Alat Dapur
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white bg-[#00796B]">
                        Mulai dari Sini
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed mb-4 font-medium">
                    Edukasi mengenai alat-alat dapur dasar sebelum memulai memasak.
                  </p>
                  <div className="bg-white/80 rounded-[16px] p-4 border border-[#00796B]/10">
                    <span className="text-xs font-bold text-[#00796B] uppercase block mb-1">Materi & Alat:</span>
                    <p className="text-xs text-[#212121] leading-relaxed font-semibold">
                      Cara Menggunakan Pisau, Cara Iris Bawang, Cara Ukur Beras, Teknik Potong, Talenan, Wajan, Panci, Sutil & Sodet, Magic Com, Ulekan dan Cobek, Blender.
                    </p>
                  </div>
                </div>

                {/* Modul 2 */}
                <div className="rounded-[24px] p-6 shadow-sm border border-transparent hover:border-[#F9A825]/20 transition-all duration-300 bg-[#FFFDE7]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-sm">
                      <Sandwich size={24} style={{ color: "#F9A825" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        Modul Memasak Tanpa Api
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white bg-[#F9A825]">
                        Sangat Aman
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed mb-4 font-medium">
                    Panduan pembuatan makanan sederhana tanpa menggunakan sumber panas, seperti membuat sandwich. Modul ini dirancang sebagai titik masuk yang paling aman dan tidak mengintimidasi bagi pemula.
                  </p>
                  <div className="bg-white/80 rounded-[16px] p-4 border border-[#F9A825]/10">
                    <span className="text-xs font-bold text-[#F9A825] uppercase block mb-1">Contoh Resep:</span>
                    <p className="text-xs text-[#212121] leading-relaxed font-semibold">
                      Sandwich Selai Kacang Pisang, Sandwich Sayur Mayo, Bola Coklat Biskuit, Bola Oat Madu, Oats Coklat Simpel, Salad Buah Yogurt, Roti Gulung Pisang Coklat, Wrap Sayur Mayo Pedas, Sereal Susu Buah, Roti Selai Coklat, Roti Gulung Sosis Keju, Es Susu Biskuit, Es Sirup Susu.
                    </p>
                  </div>
                </div>

                {/* Modul 3 */}
                <div className="rounded-[24px] p-6 shadow-sm border border-transparent hover:border-[#FF7043]/20 transition-all duration-300 bg-[#FFF3E0]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-sm">
                      <Flame size={24} style={{ color: "#FF7043" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        Modul Memasak dengan Api Kecil
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white bg-[#FF7043]">
                        Gunakan Kompor
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed mb-4 font-medium">
                    Instruksi memasak menggunakan kompor dengan api kecil, mencakup cara merebus air dan memasak telur. Dilengkapi panduan keselamatan dasar dalam penggunaan kompor.
                  </p>
                  <div className="bg-white/80 rounded-[16px] p-4 border border-[#FF7043]/10">
                    <span className="text-xs font-bold text-[#FF7043] uppercase block mb-1">Contoh Resep:</span>
                    <p className="text-xs text-[#212121] leading-relaxed font-semibold">
                      Telur Rebus, Roti Oles Mentega Gula, Roti Bakar, Orak-Arik Telur Wortel Buncis, Tumis Sawi Putih Bakso, Tomat Telur Kuah Segar, Kentang Tumbuk, Tumis Tauge Tahu, Sup Telur Air Kaldu Sederhana, Tempe Bakar Bumbu Kuning Instan, Singkong Kukus, Pisang Penyet Cokelat Messes.
                    </p>
                  </div>
                </div>

                {/* Modul 4 */}
                <div className="rounded-[24px] p-6 shadow-sm border border-transparent hover:border-[#0277BD]/20 transition-all duration-300 bg-[#E3F2FD]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-sm">
                      <Zap size={24} style={{ color: "#0277BD" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        Modul Memasak dengan Alat Listrik
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white bg-[#0277BD]">
                        Elektronik Dapur
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed mb-4 font-medium">
                    Panduan penggunaan Rice Cooker sebagai alat masak elektronik paling umum yang dimiliki rumah tangga, mencakup cara pengoperasian yang benar dan aman.
                  </p>
                  <div className="bg-white/80 rounded-[16px] p-4 border border-[#0277BD]/10">
                    <span className="text-xs font-bold text-[#0277BD] uppercase block mb-1">Contoh Resep:</span>
                    <p className="text-xs text-[#212121] leading-relaxed font-semibold">
                      Memasak Nasi Putih dengan Rice Cooker, Nasi Liwet Rice Cooker Sederhana, Sup Sayur Magic Com, Bubur Ayam Polos Instan, Smoothie Pisang Coklat, Jus Alpukat Susu, Jus Alpukat Kental Manis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>        )}
      </div>

      <BottomNav />
    </div>
  );
}

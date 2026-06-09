// Ingredient substitution tips

export const substitutions: Record<string, string> = {
  // Dairy & Eggs
  "telur": "1 sdm biji rami + 3 sdm air (diamkan 5 menit) ATAU 1/4 cup yogurt",
  "telur rebus": "Telur dadar dipotong kecil ATAU tahu rebus",
  "telur ayam": "Telur puyuh (2 butir = 1 telur ayam) ATAU 1/4 cup yogurt untuk adonan",
  "susu cair": "Susu kental manis dicairkan ATAU air kelapa ATAU susu kedelai",
  "susu kental manis": "Gula pasir 3 sdm + susu cair 100ml, didihkan hingga kental",
  "yogurt": "Susu cair + perasan lemon (diamkan 10 menit) ATAU susu kental manis",
  "yogurt plain": "Greek yogurt ATAU susu cair + 1 sdt perasan lemon",
  "keju": "Keju parut instan ATAU skip (kurangi garam sedikit)",
  "keju lembaran": "Keju parut dilelehkan ATAU skip",
  "keju parut": "Keju batangan diparut ATAU skip",
  "mentega": "Minyak goreng (3/4 takaran) ATAU margarin",
  "es krim vanilla": "Pisang beku diblender ATAU yogurt dingin",

  // Breads & Grains
  "roti tawar": "Roti sobek ATAU tortilla ATAU nasi dingin untuk alternatif",
  "tortilla": "Roti tawar yang dipipihkan ATAU kulit lumpia",
  "kulit lumpia": "Tortilla ATAU roti tawar tipis",
  "nasi putih": "Nasi merah ATAU kentang rebus",
  "beras": "Nasi sisa kemarin (skip tahap masak) ATAU kentang",
  "oat": "Granola hancur ATAU sereal gandum hancur",
  "biskuit marie": "Biskuit apapun yang tidak terlalu manis ATAU roti tawar kering",
  "sereal gandum": "Oat ATAU cornflakes",

  // Vegetables
  "selada": "Sawi hijau mentah ATAU bayam mentah ATAU daun selada lain",
  "tomat": "Saus tomat (untuk rasa) ATAU paprika merah",
  "timun": "Zucchini mentah ATAU wortel mentah",
  "wortel": "Labu kuning ATAU ubi jalar",
  "sawi hijau": "Bayam ATAU kangkung ATAU sawi putih",
  "bayam": "Kangkung ATAU sawi hijau",
  "kangkung": "Bayam ATAU sawi hijau",
  "bawang putih": "Bawang bombay (rasa lebih manis) ATAU bawang merah 2x lipat",
  "bawang merah": "Bawang bombay ATAU bawang putih (setengah takaran)",
  "bawang bombay": "Bawang merah 2x lipat ATAU bawang putih 1x",
  "daun bawang": "Bawang bombay cincang ATAU skip",
  "jagung manis": "Jagung kalengan (tiriskan) ATAU kacang polong",
  "jagung manis pipil": "Jagung kalengan ATAU jagung manis dipipil dari tongkol",

  // Fruits
  "pisang": "Apel untuk tekstur ATAU ubi untuk manis",
  "pisang beku": "Pisang biasa yang dibekukan 2 jam ATAU mangga beku",
  "apel": "Pir ATAU pisang",
  "jeruk": "Lemon untuk asam ATAU nanas untuk manis",
  "anggur": "Stroberi potong ATAU kismis",
  "stroberi": "Blueberry ATAU raspberry ATAU ceri",
  "alpukat": "Pisang (untuk smoothie) ATAU yogurt kental",
  "kismis": "Kurma cincang ATAU anggur kering",

  // Proteins
  "ayam": "Tahu ATAU tempe ATAU jamur tiram untuk vegetarian",
  "ayam suwir": "Tempe suwir ATAU jamur suwir ATAU tahu suwir",
  "tahu": "Tempe ATAU ayam cincang",
  "tempe": "Tahu ATAU kacang merah rebus",

  // Condiments & Sauces
  "mayonaise": "Yogurt plain + sedikit lemon ATAU saus salad",
  "selai kacang": "Selai coklat ATAU kacang tanah haluskan dengan minyak",
  "selai coklat": "Nutella ATAU coklat leleh + sedikit minyak",
  "kecap manis": "Kecap asin + gula merah ATAU saus tiram + gula",
  "kecap asin": "Kecap manis (kurangi gula di resep) ATAU saus tiram",
  "saus sambal": "Cabai rawit + tomat dihaluskan ATAU sambel sachet",
  "saus tomat": "Tomat segar dihaluskan + garam + gula",

  // Sweeteners
  "madu": "Sirup maple ATAU gula pasir + sedikit air",
  "gula pasir": "Gula aren ATAU madu (3/4 takaran)",
  "gula merah": "Gula pasir + sedikit kecap manis untuk warna",

  // Seasonings
  "garam": "Kecap asin (sedikit) ATAU kaldu bubuk",
  "lada bubuk": "Merica bubuk ATAU skip",
  "merica": "Lada bubuk ATAU cabai bubuk sedikit",

  // Liquids
  "air": "Kaldu ayam untuk rasa lebih ATAU air biasa",
  "minyak goreng": "Mentega (untuk menumis) ATAU minyak kelapa",

  // Baking & Desserts
  "bubuk coklat": "Coklat batangan leleh (kurangi gula) ATAU milo",
  "tepung terigu": "Tepung beras (untuk gluten-free, tekstur beda) ATAU maizena",

  // Dairy alternatives
  "susu": "Santan encer ATAU susu kedelai ATAU susu almond",

  // Misc
  "mie instan": "Mie telur kering + bumbu sendiri ATAU pasta",
  "wijen sangrai": "Kacang sangrai cincang ATAU skip",
  "nori": "Rumput laut kering lain ATAU skip (untuk garnish)",
  "bumbu": "Garam + bawang putih + lada sebagai dasar",
};

export function getSubstitution(ingredientName: string): string | null {
  const normalized = ingredientName.toLowerCase().trim();

  // Check exact match
  if (substitutions[normalized]) {
    return substitutions[normalized];
  }

  // Check partial match
  for (const [key, value] of Object.entries(substitutions)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }

  return null;
}

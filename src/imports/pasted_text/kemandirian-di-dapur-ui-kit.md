Design a mobile app UI (375x812px, iPhone frame) called "Kemandirian di Dapur" — a cooking guide app for Indonesian middle school teens aged 13–15. The app teaches basic cooking skills step by step.

---

DESIGN SYSTEM (apply consistently across all screens):

Color Palette:
- Primary: #4CAF50 (fresh green)
- Secondary: #FF7043 (warm orange)
- Accent: #FFF9C4 (soft yellow)
- Background: #FAFAFA (off-white)
- Text primary: #212121
- Text secondary: #757575
- Danger/warning: #F44336 (red)

Typography:
- Headlines: Bold, 22–28px, rounded sans-serif (Nunito or Poppins)
- Body: Regular, 14–16px
- Labels/buttons: SemiBold, 14px
- Tone: friendly, casual, NOT formal

Design Style:
- Flat design, clean and modern
- Rounded corners everywhere (border-radius 16–24px)
- Soft shadows on cards
- Playful but not childish
- Gender-neutral mascot character: a cheerful chef with a white hat, simple flat 2D illustration, expressive face, no gender markers
- Bottom navigation bar on all screens (except Splash/Onboarding)

---

SCREEN 1 — Splash / Home Screen

Layout:
- Full screen background color: gradient from #4CAF50 to #81C784 (top to bottom)
- Center: app logo text "Kemandirian di Dapur" in white bold rounded font, size 28px
- Below logo: subtitle text "Belajar masak itu seru & gampang!" in white, size 14px
- Large mascot chef illustration centered (cheerful, waving hand, wearing apron)
- Bottom: rounded white button "Yuk, Mulai!" with green text, full width with 24px margin
- Small text below button: "Sudah ada 1.200+ remaja yang belajar di sini 🍳"

Vibe: energetic, welcoming, fun

---

SCREEN 2 — Menu Kategori (Category Selection)

Layout:
- Top: greeting header "Halo, Chef Muda! 👋" bold, size 22px
- Subtext: "Mau belajar masak apa hari ini?"
- Search bar below header (rounded, light gray background, search icon)
- 4 category cards in 2x2 grid layout, each card:
  * Rounded rectangle, soft shadow
  * Colorful illustration icon (no photo, flat icon style)
  * Category label bold centered below icon
  * Difficulty badge top-right corner (pill shape)

Card 1 — "Tanpa Api 🥗"
  - Icon: sandwich illustration
  - Background card: soft yellow #FFF9C4
  - Badge: "Termudah" in green

Card 2 — "Api Kecil 🍳"
  - Icon: frying pan with flame
  - Background card: soft orange #FFE0B2
  - Badge: "Mudah" in orange

Card 3 — "Alat Listrik ⚡"
  - Icon: rice cooker illustration
  - Background card: soft blue #E3F2FD
  - Badge: "Menengah" in blue

Card 4 — "Alat Dapur 🔪"
  - Icon: knife and cutting board
  - Background card: soft green #E8F5E9
  - Badge: "Panduan" in green

- Bottom navigation bar: icons for Home, Kategori (active), Favorit, Profil

---

SCREEN 3 — Halaman Konten Resep (Recipe Detail)

Example: "Sandwich Telur Mayo" from Tanpa Api module

Layout:
- Top: back arrow (←) left, bookmark icon right
- Hero image area: large rounded rectangle (real food photo placeholder, aspect ratio 16:9), overlay gradient bottom, recipe title "Sandwich Telur Mayo" in white bold on top of gradient
- Below image: row of 3 info chips (pill shape, light background):
  * "⏱ 10 menit"
  * "🧑‍🍳 Pemula"
  * "🔥 Tanpa Api"
- Section: "Bahan-bahan" header bold, then ingredient list as clean rows with checkbox circles on left (unchecked state), ingredient name, and quantity right-aligned
  Ingredients: Roti tawar (2 lembar), Telur rebus (1 butir), Mayonaise (2 sdm), Selada (2 lembar), Garam (secukupnya)
- Section: "Langkah Memasak" header bold
  Numbered steps as cards:
  Step 1: "Siapkan semua bahan di atas meja dapur yang bersih."
  Step 2: "Iris telur rebus menjadi tipis-tipis."
  Step 3: "Oleskan mayonaise pada kedua sisi roti tawar."
  Step 4: "Susun selada dan irisan telur di atas roti."
  Step 5: "Tutup dengan roti kedua, potong diagonal. Selesai!"
- Each step card: white background, rounded, left accent bar in green, step number circle in green, instruction text
- Warning card (if any danger step): red left accent bar, warning icon ⚠️, red text
- Bottom: sticky CTA button "Mulai Memasak 🍴" full width, green, rounded

---

SCREEN 4 — Checklist Interaktif (Interactive Checklist)

This screen appears after tapping "Mulai Memasak"

Layout:
- Top: mascot chef illustration (smaller, top right corner), speech bubble saying "Yuk cek dulu bahan-bahannya ya!"
- Title: "Cek Kelengkapan Bahan" bold, size 22px
- Subtitle: "Centang semua bahan sebelum mulai masak!"
- Checklist cards (full width, rounded, soft shadow):
  Each card: checkbox on left (green checkmark when ticked), ingredient name bold, quantity right, card background turns light green #E8F5E9 when checked
  Items: Roti tawar (2 lembar), Telur rebus (1 butir), Mayonaise (2 sdm), Selada (2 lembar), Garam (secukupnya)
- Progress bar below title: shows "3/5 bahan siap" with green fill, pill shape
- Motivational text below checklist (changes dynamically):
  0 checked: "Belum ada yang disiapkan nih 😅"
  All checked: "Mantap! Semua bahan siap. Yuk masak! 🎉"
- Bottom: button "Lanjut Masak →" — disabled (gray) if not all checked, green active if all checked

---

SCREEN 5 — Halaman Selesai / Reward Screen

Layout:
- Full screen celebration background: confetti pattern (colorful dots/stars scattered), background color light yellow #FFF9C4
- Center: large mascot chef illustration doing a happy celebration pose (hands up, big smile, party hat on)
- Title text: "Yeay, Kamu Berhasil! 🎉" bold, size 26px, centered, dark green color
- Subtitle: "Sandwich Telur Mayo kamu pasti enak banget!" size 16px, centered, gray
- Achievement badge card (rounded, white, soft shadow):
  * Gold star icon ⭐
  * "Chef Pemula" label bold
  * "Modul Tanpa Api selesai!" subtext
- Two buttons stacked:
  * Primary: "Coba Resep Lain 🍳" full width green rounded
  * Secondary: "Kembali ke Menu" outlined green rounded
- Bottom: small text "Bagikan ke temanmu! 📸" with share icons (Instagram, WhatsApp)

---

ADDITIONAL NOTES:
- Mobile-first, all screens 375x812px
- Use auto layout in Figma for all components
- All buttons must have hover/pressed state (slightly darker color)
- Consistent 16px padding on left and right for all content
- Section spacing: 24px between sections
- The mascot chef character must look the same across all screens (same art style, same character)
- No stock photo faces — use illustrated food images only for recipe photos
- Indonesian language throughout
- Make it feel like a fun app teens would actually want to use, not a school textbook
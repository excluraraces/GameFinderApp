export const translations = {
  tr: {
    // Giriş
    appTitle: "Bugün Ne Oynasam?",
    appSubtitle:
      "Oyun zevkine göre birkaç soruyu cevapla, sana en uygun oyunları bulalım.",

    start: "Teste Başla",
    changeLanguage: "Dili Değiştir",

    // Dil ekranı
    languageTitle: "Dilini Seç",
    languageSubtitle: "Choose Your Language",

    turkish: "Türkçe",
    english: "English",

    // Sorular
    question: "Soru",
    previous: "Önceki",
    next: "Sonraki",

    // Sonuç ekranı
    resultTitle: "Sana Önerilen Oyunlar",
    playerProfile: "Oyuncu Profili",
    recommendationReason: "Neden Önerildi?",
    compatibility: "Uyumluluk",
    restart: "Tekrar Başla",

    // Profil başlıkları
    platform: "Platform",
    genre: "Tür",
    story: "Hikâye",
    pace: "Tempo",
    playStyle: "Oynanış",
    world: "Dünya",
    difficulty: "Zorluk",
    graphics: "Grafikler",
    progression: "Karakter Gelişimi",
    gameLength: "Oyun Süresi",
    vehicles: "Araçlar",
    horror: "Korku",
    strategy: "Strateji",
    atmosphere: "Atmosfer",

    // Genel
    loading: "Yükleniyor...",
    noResult: "Uygun oyun bulunamadı.",
    back: "Geri",
  },

  en: {
    // Home
    appTitle: "What Should I Play Today?",
    appSubtitle:
      "Answer a few questions about your gaming preferences and we'll recommend the best games for you.",

    start: "Start Quiz",
    changeLanguage: "Change Language",

    // Language
    languageTitle: "Choose Your Language",
    languageSubtitle: "Select your preferred language",

    turkish: "Türkçe",
    english: "English",

    // Questions
    question: "Question",
    previous: "Previous",
    next: "Next",

    // Results
    resultTitle: "Recommended Games",
    playerProfile: "Player Profile",
    recommendationReason: "Why was it recommended?",
    compatibility: "Match",
    restart: "Restart",

    // Profile
    platform: "Platform",
    genre: "Genre",
    story: "Story",
    pace: "Pace",
    playStyle: "Play Style",
    world: "World",
    difficulty: "Difficulty",
    graphics: "Graphics",
    progression: "Character Progression",
    gameLength: "Game Length",
    vehicles: "Vehicles",
    horror: "Horror",
    strategy: "Strategy",
    atmosphere: "Atmosphere",

    // General
    loading: "Loading...",
    noResult: "No matching game found.",
    back: "Back",
  },
} as const;

export type Language = keyof typeof translations;
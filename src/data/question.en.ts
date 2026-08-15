import type { Category, Platform, PlayMode } from "./game";
import {
  categoryQuestionBooks as trCategoryQuestionBooks,
  commonPreferenceQuestions as trCommonPreferenceQuestions,
  hardFilterQuestions as trHardFilterQuestions,
  type Question,
  type QuestionOption,
} from "./questions";

const questionText: Record<string, string> = {
  platform: "Which platform will you play on today?",
  category: "Which game category are you looking for today?",
  playMode: "How do you want to play this session?",

  "rpg-story": "How important is the story in an RPG?",
  "rpg-roleplay": "What appeals to you most about role-playing?",
  "rpg-world": "What kind of RPG world do you want?",
  "rpg-progression": "How deep should character progression be?",
  "rpg-focus": "What keeps you engaged most in an RPG?",

  "shooter-style": "What kind of gunplay pace are you looking for?",
  "shooter-purpose": "What do you most want from a shooter?",
  "shooter-competition": "How competitive should it be?",
  "shooter-difficulty": "How much do you want to be challenged?",

  "action-story": "How important is story in an action/adventure game?",
  "action-world": "What kind of world structure do you prefer?",
  "action-focus": "What appeals to you most in an action game?",
  "action-pace": "What pace do you want?",

  "racing-feel": "What kind of driving feel are you looking for?",
  "racing-customization": "How much do you want to interact with your cars?",
  "racing-focus": "What do you want to do in a racing game today?",
  "racing-difficulty": "How demanding should the driving be?",

  "strategy-type": "Which type of strategy game appeals to you most?",
  "strategy-management": "What do you most want to manage?",
  "strategy-length": "How long should a strategy session last?",
  "strategy-difficulty": "How steep can the learning curve be?",

  "horror-type": "What kind of horror experience do you want?",
  "horror-defense": "What do you want to do when danger appears?",
  "horror-puzzle": "How important should puzzles be in the horror experience?",
  "horror-story": "How important is the story?",

  "sim-type": "What would you like to simulate?",
  "sim-realism": "How important is realism?",
  "sim-mood": "How should the simulation make you feel?",

  "management-type": "What sounds most fun to manage?",
  "management-depth": "How detailed should the management systems be?",
  "management-focus": "Which part interests you most?",

  "sandbox-focus": "What do you most want to do in a sandbox game?",
  "sandbox-base": "How important is building a base or structures?",
  "sandbox-challenge": "Should the sandbox challenge you?",

  "survival-core": "Which system matters most in a survival game?",
  "survival-risk": "How punishing should the risk be?",
  "survival-horror": "Do you want horror elements?",

  "puzzle-type": "What kind of puzzles do you want to solve?",
  "puzzle-story": "Do you want a story alongside the puzzles?",
  "puzzle-length": "How long should the puzzle game be?",

  "sports-type": "What kind of sports experience do you want?",
  "sports-focus": "What motivates you most?",

  "moba-competition": "How competitive do you want your MOBA to be?",
  "moba-focus": "What matters most in the gameplay?",
  "moba-difficulty": "How steep should the learning curve be?",

  "party-type": "What kind of fun are you looking for with your group?",
  "party-session": "What kind of session structure do you want?",

  "common-length": "How much time do you want to spend with this game?",
  "common-atmosphere": "Which atmosphere appeals to you today?",
  "common-challenge": "How should the game treat you today?",
  "common-graphics": "What visual style do you prefer?",
};

const valueLabel: Record<string, string> = {
  PC: "PC",
  PlayStation: "PlayStation",
  Xbox: "Xbox",
  "Nintendo Switch": "Nintendo Switch",
  Mobil: "Mobile",

  RPG: "🧙 RPG",
  "FPS / Nişancı": "🔫 FPS / Shooter",
  "Aksiyon / Macera": "⚔️ Action / Adventure",
  Yarış: "🏎️ Racing",
  Strateji: "🧠 Strategy",
  Korku: "👻 Horror",
  Simülasyon: "🛠️ Simulation",
  "Yönetim / Kurma": "🏙️ Management / Building",
  "Sandbox / Yaratıcılık": "🧱 Sandbox / Creativity",
  "Hayatta Kalma": "🌲 Survival",
  Bulmaca: "🧩 Puzzle",
  Spor: "⚽ Sports",
  MOBA: "🛡️ MOBA",
  "Parti / Sosyal": "🎉 Party / Social",

  "Tek kişilik": "Single-player",
  Arkadaşlarla: "With friends",
  "Online rekabetçi": "Online competitive",
  "Fark etmez": "No preference",

  "Çok önemli": "Very important",
  "Biraz önemli": "Somewhat important",
  "Önemli değil": "Not important",
  "Evet çok isterim": "Very important to me",
  "Biraz olsun": "Some progression",
  "Gerek yok": "Not necessary",

  "Açık dünya": "Open world",
  "Lineer hikaye": "Linear story",
  Sandbox: "Sandbox",
  "Bölüm bölüm ilerleyen": "Level-based",

  Kolay: "Easy",
  Orta: "Balanced",
  Zor: "Hard",
  "Çok zor": "Very hard",

  Rahatlatıcı: "Relaxing",
  "Hızlı ve aksiyonlu": "Fast and action-packed",
  "Yavaş ve taktiksel": "Slow and tactical",
  Gerilimli: "Tense",

  Rahatlatmalı: "Relaxing",
  "İkisi dengeli olmalı": "Balanced",
  Zorlamalı: "Challenging",

  Fantastik: "Fantasy",
  "Bilim kurgu": "Science fiction",
  Gerçekçi: "Realistic",
  Karanlık: "Dark",
  Cartoon: "Stylized / Cartoon",
  Pixel: "Pixel art",
  Anime: "Anime",
  Minimal: "Minimal",

  Kısa: "Short",
  "Orta uzunlukta": "Medium length",
  "Çok uzun": "Very long",
  "Sonsuz oynanabilir": "Highly replayable",

  "Karakter oluşturma": "Create my own character",
  "Seçim odaklı hikâye": "Choices that change the story",
  "Yoğun hikâye": "A strong predefined story",
  Loot: "Loot and gear",
  Keşif: "Exploration",
  "Yoğun diyalog": "Deep dialogue and characters",
  "Boss savaşları": "Boss battles",

  "Hızlı çatışma": "Fast, aggressive gunplay",
  "Taktiksel çatışma": "Tactical positioning and patience",
  "Gerçekçi çatışma": "Realistic and punishing combat",
  "Hikâye kampanyası": "A strong single-player campaign",
  PvP: "Competitive PvP",
  "Takım koordinasyonu": "Team coordination",
  "Battle Royale": "Battle Royale",
  Ranked: "Ranked competition",
  "PvE co-op": "PvE / mission-based co-op",

  "Yakın dövüş": "Melee combat",
  "Silahlı çatışma": "Gun combat",
  Stealth: "Stealth",

  "Arcade sürüş": "Arcade driving",
  "Simülasyon sürüş": "Simulation driving",
  "Açık dünya sürüş": "Open-world driving",
  "Araç modifiye": "Car customization",
  "Araç koleksiyonu": "Car collecting",
  "Kısa yarışlar": "Quick races",
  "Online yarış": "Online racing",
  Drift: "Drifting",
  "Kariyer modu": "Career progression",
  "Rahat sürüş": "Relaxed cruising",

  "Gerçek zamanlı strateji": "Real-time strategy",
  "Sıra tabanlı strateji": "Turn-based strategy",
  "Grand strategy": "Grand strategy",
  "Taktiksel savaş": "Tactical combat",
  "Ekonomi yönetimi": "Economy management",
  Diplomasi: "Diplomacy",
  "Ordu yönetimi": "Army management",
  "Şehir kurma": "City building",
  "Uzun kampanya": "Long campaigns",
  "Sandbox özgürlüğü": "Sandbox freedom",

  "Psikolojik korku": "Psychological horror",
  "Survival horror": "Survival horror",
  "Aksiyon korku": "Action horror",
  "Kaçış / saklanma": "Running and hiding",
  "Kaynak yönetimi": "Resource management",
  "Çevresel bulmaca": "Environmental puzzles",
  Gerilim: "Pure tension",

  "Araç simülasyonu": "Vehicle simulation",
  "İş simülasyonu": "Job / work simulation",
  "Yaşam simülasyonu": "Life simulation",
  "Rahatlatıcı görevler": "Relaxing tasks",

  "Koloni yönetimi": "Colony management",
  "Spor yönetimi": "Sports management",
  Taktik: "Tactical decision-making",
  "Uzun vadeli büyüme": "Long-term growth",

  "Yaratıcılık / özgürlük": "Building and creativity",
  Crafting: "Crafting",
  "Hayatta kalma": "Survival",
  "Base building": "Base building",
  "Yüksek risk": "High-stakes survival",

  "Fizik bulmacası": "Physics-based puzzles",
  "Optik bulmaca": "Visual / optical puzzles",
  "Co-op bulmaca": "Co-op puzzles",

  Futbol: "Football",
  "Araç sporu": "Vehicle sports",
  "Takım kurma": "Building and improving a team",
  "Uzun kariyer": "A long career",

  "Karakter yetenekleri": "Character abilities",
  "Kısa maçlar": "Short matches",

  "Sosyal çıkarım": "Social deduction",
  "Mini oyunlar": "Quick mini-games",
  "Kullanıcı içerikleri": "Player-created experiences",
  "Hikâye odaklı": "A story-driven co-op adventure",
};

function localizeOption(option: QuestionOption): QuestionOption {
  return {
    ...option,
    label: valueLabel[option.value] ?? option.label,
  };
}

function localizeQuestion(question: Question): Question {
  return {
    ...question,
    question: questionText[question.id] ?? question.question,
    options: question.options.map(localizeOption),
  };
}

export const hardFilterQuestionsEn: Question[] =
  trHardFilterQuestions.map(localizeQuestion);

export const categoryQuestionBooksEn: Record<Category, Question[]> =
  Object.fromEntries(
    Object.entries(trCategoryQuestionBooks).map(([category, questions]) => [
      category,
      questions.map(localizeQuestion),
    ])
  ) as Record<Category, Question[]>;

export const commonPreferenceQuestionsEn: Question[] =
  trCommonPreferenceQuestions.map(localizeQuestion);

export function getQuestionsForCategoryEn(category: Category): Question[] {
  return [
    ...hardFilterQuestionsEn,
    ...categoryQuestionBooksEn[category],
    ...commonPreferenceQuestionsEn,
  ];
}

// Eski import uyumluluğu için.
export const questionsEn = hardFilterQuestionsEn;
export const questions = hardFilterQuestionsEn;

// Tiplerin kullanılabilir kalması için bu importlar bilinçli tutuluyor.
void (null as unknown as Platform);
void (null as unknown as PlayMode);
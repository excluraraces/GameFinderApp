import type { Category, Platform, PlayMode } from "./game";

export type QuestionKind = "hardFilter" | "preference";

export type HardFilterField = "platforms" | "categories" | "playModes";

export type ScoreField =
  | "features"
  | "storyImportance"
  | "tempo"
  | "worldType"
  | "difficulty"
  | "graphics"
  | "characterProgression"
  | "length"
  | "vehicleInterest"
  | "horrorInterest"
  | "strategyInterest"
  | "challengeStyle"
  | "atmosphere";

export type QuestionOption = {
  label: string;
  value: string;
  matchValues?: string[];
};

export type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
  kind: QuestionKind;
  filterField?: HardFilterField;
  scoreField?: ScoreField;
  weight?: number;
};

export const hardFilterQuestions: Question[] = [
  {
    id: "platform",
    kind: "hardFilter",
    filterField: "platforms",
    question: "Bugünkü oyun seansın hangi platformda geçecek?",
    options: [
      { label: "Bilgisayarın başına geçiyorum", value: "PC" satisfies Platform },
      { label: "PlayStation kolu hazır", value: "PlayStation" satisfies Platform },
      { label: "Xbox'ta oynayacağım", value: "Xbox" satisfies Platform },
      { label: "Nintendo Switch yanımda", value: "Nintendo Switch" satisfies Platform },
      { label: "Telefon veya tabletteyim", value: "Mobil" satisfies Platform },
    ],
  },
  {
    id: "category",
    kind: "hardFilter",
    filterField: "categories",
    question: "Bugün hangi oyun kategorisini arıyorsun?",
    options: [
      { label: "🧙 RPG", value: "RPG" satisfies Category },
      { label: "🔫 FPS / Nişancı", value: "FPS / Nişancı" satisfies Category },
      { label: "⚔️ Aksiyon / Macera", value: "Aksiyon / Macera" satisfies Category },
      { label: "🏎️ Yarış", value: "Yarış" satisfies Category },
      { label: "🧠 Strateji", value: "Strateji" satisfies Category },
      { label: "👻 Korku", value: "Korku" satisfies Category },
      { label: "🛠️ Simülasyon", value: "Simülasyon" satisfies Category },
      { label: "🏙️ Yönetim / Kurma", value: "Yönetim / Kurma" satisfies Category },
      { label: "🧱 Sandbox / Yaratıcılık", value: "Sandbox / Yaratıcılık" satisfies Category },
      { label: "🌲 Hayatta Kalma", value: "Hayatta Kalma" satisfies Category },
      { label: "🧩 Bulmaca", value: "Bulmaca" satisfies Category },
      { label: "⚽ Spor", value: "Spor" satisfies Category },
      { label: "🛡️ MOBA", value: "MOBA" satisfies Category },
      { label: "🎉 Parti / Sosyal", value: "Parti / Sosyal" satisfies Category },
    ],
  },
  {
    id: "playMode",
    kind: "hardFilter",
    filterField: "playModes",
    question: "Bu seansı nasıl oynamak istiyorsun?",
    options: [
      { label: "Tek başıma, kendi tempomda", value: "Tek kişilik" satisfies PlayMode },
      { label: "Arkadaşlarımla birlikte", value: "Arkadaşlarla" satisfies PlayMode },
      { label: "Rakiplere karşı çevrimiçi", value: "Online rekabetçi" satisfies PlayMode },
      { label: "Fark etmez; oyun iyi olsun yeter", value: "Fark etmez" },
    ],
  },
];

const rpgQuestions: Question[] = [
  {
    id: "rpg-story",
    kind: "preference",
    scoreField: "storyImportance",
    weight: 5,
    question: "Bir RPG'de hikâye senin için ne kadar önemli?",
    options: [
      { label: "Oyunun kalbi hikâye olmalı", value: "Çok önemli" },
      { label: "Güçlü olursa büyük artı", value: "Biraz önemli" },
      { label: "Oynanış daha önemli", value: "Önemli değil" },
    ],
  },
  {
    id: "rpg-roleplay",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Rol yapma tarafında seni en çok ne çeker?",
    options: [
      { label: "Karakterimi sıfırdan oluşturmak", value: "Karakter oluşturma" },
      { label: "Kararlarım hikâyeyi değiştirsin", value: "Seçim odaklı hikâye" },
      { label: "Hazır karakterle güçlü bir hikâye yaşamak", value: "Yoğun hikâye" },
      { label: "Ben daha çok savaş ve gelişime bakarım", value: "Loot" },
    ],
  },
  {
    id: "rpg-world",
    kind: "preference",
    scoreField: "worldType",
    weight: 4,
    question: "Nasıl bir RPG dünyası istiyorsun?",
    options: [
      { label: "Özgürce keşfedebileceğim açık dünya", value: "Açık dünya" },
      { label: "Daha kontrollü ve hikâye odaklı ilerleyiş", value: "Lineer hikaye" },
      { label: "Kendi hedeflerimi koyabildiğim sandbox", value: "Sandbox" },
    ],
  },
  {
    id: "rpg-progression",
    kind: "preference",
    scoreField: "characterProgression",
    weight: 4,
    question: "Karakter gelişimi ne kadar derin olsun?",
    options: [
      { label: "Build, yetenek ve ekipmanla sürekli gelişeyim", value: "Evet çok isterim" },
      { label: "Bir miktar gelişim yeterli", value: "Biraz olsun" },
      { label: "Gelişim şart değil", value: "Gerek yok" },
    ],
  },
  {
    id: "rpg-focus",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "RPG'de hangisi seni daha çok oyunda tutar?",
    options: [
      { label: "Loot ve yeni ekipmanlar", value: "Loot" },
      { label: "Keşif ve gizli yerler", value: "Keşif" },
      { label: "Uzun diyaloglar ve karakterler", value: "Yoğun diyalog" },
      { label: "Zorlu boss savaşları", value: "Boss savaşları" },
    ],
  },
];

const shooterQuestions: Question[] = [
  {
    id: "shooter-style",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Silahlı çatışmada nasıl bir tempo arıyorsun?",
    options: [
      { label: "Hızlı, agresif ve refleks odaklı", value: "Hızlı çatışma" },
      { label: "Taktik, pozisyon ve sabır", value: "Taktiksel çatışma" },
      { label: "Daha gerçekçi ve cezalandırıcı", value: "Gerçekçi çatışma" },
    ],
  },
  {
    id: "shooter-purpose",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Nişancı oyununda en çok ne yapmak istiyorsun?",
    options: [
      { label: "Güçlü bir tek kişilik kampanya oynamak", value: "Hikâye kampanyası" },
      { label: "Rekabetçi PvP maçlarına girmek", value: "PvP" },
      { label: "Takımla koordineli oynamak", value: "Takım koordinasyonu" },
      { label: "Battle Royale oynamak", value: "Battle Royale" },
    ],
  },
  {
    id: "shooter-competition",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Rekabet seviyesi nasıl olsun?",
    options: [
      { label: "Rank kasmak istiyorum", value: "Ranked" },
      { label: "Rekabet olsun ama aşırı ciddi olmasın", value: "PvP" },
      { label: "PvE / görev odaklı ilerlemek isterim", value: "PvE co-op" },
    ],
  },
  {
    id: "shooter-difficulty",
    kind: "preference",
    scoreField: "difficulty",
    weight: 3,
    question: "Ne kadar zorlanmak istiyorsun?",
    options: [
      { label: "Rahat oynayayım", value: "Kolay" },
      { label: "Dengeli olsun", value: "Orta" },
      { label: "Beni zorlasın", value: "Zor" },
      { label: "Acımasız olsun", value: "Çok zor" },
    ],
  },
];

const actionQuestions: Question[] = [
  {
    id: "action-story",
    kind: "preference",
    scoreField: "storyImportance",
    weight: 4,
    question: "Aksiyon/macera oyununda hikâye ne kadar önemli?",
    options: [
      { label: "Sinematik ve güçlü bir hikâye istiyorum", value: "Çok önemli" },
      { label: "Oynanışla dengeli olsun", value: "Biraz önemli" },
      { label: "Aksiyon iyi olsun yeter", value: "Önemli değil" },
    ],
  },
  {
    id: "action-world",
    kind: "preference",
    scoreField: "worldType",
    weight: 4,
    question: "Dünya yapısı nasıl olsun?",
    options: [
      { label: "Açık dünyada özgürce dolaşayım", value: "Açık dünya" },
      { label: "Sinematik ve çizgisel ilerlesin", value: "Lineer hikaye" },
      { label: "Bölüm bölüm ilerlesin", value: "Bölüm bölüm ilerleyen" },
    ],
  },
  {
    id: "action-focus",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Aksiyon tarafında seni en çok hangisi çeker?",
    options: [
      { label: "Yakın dövüş", value: "Yakın dövüş" },
      { label: "Silahlı çatışma", value: "Silahlı çatışma" },
      { label: "Gizlilik ve sızma", value: "Stealth" },
      { label: "Boss savaşları", value: "Boss savaşları" },
      { label: "Keşif", value: "Keşif" },
    ],
  },
  {
    id: "action-pace",
    kind: "preference",
    scoreField: "tempo",
    weight: 3,
    question: "Tempo nasıl olsun?",
    options: [
      { label: "Sürekli aksiyon", value: "Hızlı ve aksiyonlu" },
      { label: "Daha kontrollü ve taktiksel", value: "Yavaş ve taktiksel" },
      { label: "Gerilimli", value: "Gerilimli" },
      { label: "Rahat keşif de olsun", value: "Rahatlatıcı" },
    ],
  },
];

const racingQuestions: Question[] = [
  {
    id: "racing-feel",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Nasıl bir sürüş hissi arıyorsun?",
    options: [
      { label: "Arcade; kolay girip hızlı eğleneyim", value: "Arcade sürüş" },
      { label: "Gerçekçi sürüş ve fizik", value: "Simülasyon sürüş" },
      { label: "Açık dünyada serbest sürüş", value: "Açık dünya sürüş" },
    ],
  },
  {
    id: "racing-customization",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Araçlarla ne kadar uğraşmak istiyorsun?",
    options: [
      { label: "Modifiye benim için önemli", value: "Araç modifiye" },
      { label: "Araç toplamayı seviyorum", value: "Araç koleksiyonu" },
      { label: "Sadece sürmek ve yarışmak istiyorum", value: "Kısa yarışlar" },
    ],
  },
  {
    id: "racing-focus",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Bugün yarışta ne yapmak istiyorsun?",
    options: [
      { label: "Online yarışlara girmek", value: "Online yarış" },
      { label: "Drift yapmak", value: "Drift" },
      { label: "Kariyer geliştirip ilerlemek", value: "Kariyer modu" },
      { label: "Rahatça dolaşmak", value: "Rahat sürüş" },
    ],
  },
  {
    id: "racing-difficulty",
    kind: "preference",
    scoreField: "difficulty",
    weight: 3,
    question: "Sürüş ne kadar zorlayıcı olsun?",
    options: [
      { label: "Kolay", value: "Kolay" },
      { label: "Dengeli", value: "Orta" },
      { label: "Zorlayıcı", value: "Zor" },
    ],
  },
];

const strategyQuestions: Question[] = [
  {
    id: "strategy-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Hangi strateji yapısı seni daha çok çekiyor?",
    options: [
      { label: "Gerçek zamanlı strateji", value: "Gerçek zamanlı strateji" },
      { label: "Sıra tabanlı strateji", value: "Sıra tabanlı strateji" },
      { label: "Devlet/hanedan yönetilen grand strategy", value: "Grand strategy" },
      { label: "Taktiksel savaş", value: "Taktiksel savaş" },
    ],
  },
  {
    id: "strategy-management",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "En çok hangi sistemi yönetmek istersin?",
    options: [
      { label: "Ekonomi", value: "Ekonomi yönetimi" },
      { label: "Diplomasi", value: "Diplomasi" },
      { label: "Ordular ve savaş", value: "Ordu yönetimi" },
      { label: "Şehir kurmak", value: "Şehir kurma" },
    ],
  },
  {
    id: "strategy-length",
    kind: "preference",
    scoreField: "features",
    weight: 3,
    question: "Oyunların ne kadar uzun sürmesi hoşuna gider?",
    options: [
      { label: "Tek maçta biten oturumlar", value: "PvP" },
      { label: "Uzun kampanyalar", value: "Uzun kampanya" },
      { label: "Sonsuza yakın sandbox", value: "Sandbox özgürlüğü" },
    ],
  },
  {
    id: "strategy-difficulty",
    kind: "preference",
    scoreField: "difficulty",
    weight: 3,
    question: "Öğrenme eğrisi ne kadar sert olabilir?",
    options: [
      { label: "Kolay öğrenilsin", value: "Kolay" },
      { label: "Biraz uğraştırabilir", value: "Orta" },
      { label: "Derin ve zor olsun", value: "Zor", matchValues: ["Zor", "Çok zor"] },
    ],
  },
];

const horrorQuestions: Question[] = [
  {
    id: "horror-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Nasıl bir korku deneyimi istiyorsun?",
    options: [
      { label: "Psikolojik ve rahatsız edici", value: "Psikolojik korku" },
      { label: "Kaynak yönetimli survival horror", value: "Survival horror" },
      { label: "Korku ama bol aksiyonlu", value: "Aksiyon korku" },
    ],
  },
  {
    id: "horror-defense",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Tehlikeyle karşılaşınca ne yapmak istersin?",
    options: [
      { label: "Savaşabilmek istiyorum", value: "Aksiyon korku" },
      { label: "Kaçıp saklanmak daha korkutucu", value: "Kaçış / saklanma" },
      { label: "Kaynaklarımı dikkatli kullanayım", value: "Kaynak yönetimi" },
    ],
  },
  {
    id: "horror-puzzle",
    kind: "preference",
    scoreField: "features",
    weight: 3,
    question: "Bulmaca korku oyununda ne kadar yer tutsun?",
    options: [
      { label: "Önemli olsun", value: "Bulmaca" },
      { label: "Çevresel bulmacalar yeter", value: "Çevresel bulmaca" },
      { label: "Ben daha çok gerilim istiyorum", value: "Gerilim" },
    ],
  },
  {
    id: "horror-story",
    kind: "preference",
    scoreField: "storyImportance",
    weight: 4,
    question: "Hikâye ne kadar önemli?",
    options: [
      { label: "Çok önemli", value: "Çok önemli" },
      { label: "Biraz önemli", value: "Biraz önemli" },
      { label: "Atmosfer yeterli", value: "Önemli değil" },
    ],
  },
];

const simulationQuestions: Question[] = [
  {
    id: "sim-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Ne simüle etmek istiyorsun?",
    options: [
      { label: "Araç kullanmak", value: "Simülasyon sürüş", matchValues: ["Simülasyon sürüş", "Araç simülasyonu"] },
      { label: "Bir iş/meslek yapmak", value: "İş simülasyonu" },
      { label: "Günlük yaşamı yönetmek", value: "Yaşam simülasyonu" },
      { label: "Şehir/koloni/organizasyon yönetmek", value: "Ekonomi yönetimi" },
    ],
  },
  {
    id: "sim-realism",
    kind: "preference",
    scoreField: "graphics",
    weight: 3,
    question: "Gerçekçilik ne kadar önemli?",
    options: [
      { label: "Mümkün olduğunca gerçekçi", value: "Gerçekçi" },
      { label: "Stilize olması sorun değil", value: "Cartoon", matchValues: ["Cartoon", "Pixel", "Anime", "Minimal"] },
    ],
  },
  {
    id: "sim-mood",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Simülasyon sana nasıl hissettirsin?",
    options: [
      { label: "Rahatlatıcı ve sakin", value: "Rahatlatıcı görevler" },
      { label: "Sistemleri öğrenip ustalaşayım", value: "Kariyer modu" },
      { label: "Ekonomi ve büyüme yöneteyim", value: "Ekonomi yönetimi" },
      { label: "Özgürce deneme yapayım", value: "Sandbox özgürlüğü" },
    ],
  },
];

const managementQuestions: Question[] = [
  {
    id: "management-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Neyi yönetmek sana daha eğlenceli geliyor?",
    options: [
      { label: "Şehir", value: "Şehir kurma" },
      { label: "Koloni", value: "Koloni yönetimi" },
      { label: "Futbol kulübü", value: "Spor yönetimi" },
      { label: "İşletme/ekonomi", value: "Ekonomi yönetimi" },
    ],
  },
  {
    id: "management-depth",
    kind: "preference",
    scoreField: "difficulty",
    weight: 3,
    question: "Yönetim ne kadar detaylı olsun?",
    options: [
      { label: "Rahat ve kolay", value: "Kolay" },
      { label: "Dengeli", value: "Orta" },
      { label: "Karmaşık sistemlere hazırım", value: "Zor", matchValues: ["Zor", "Çok zor"] },
    ],
  },
  {
    id: "management-focus",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "En çok hangi taraf ilgini çekiyor?",
    options: [
      { label: "Uzun vadeli büyüme", value: "Uzun vadeli büyüme" },
      { label: "Kaynak yönetimi", value: "Kaynak yönetimi" },
      { label: "Taktik ve karar verme", value: "Taktik" },
      { label: "Sandbox özgürlüğü", value: "Sandbox özgürlüğü" },
    ],
  },
];

const sandboxQuestions: Question[] = [
  {
    id: "sandbox-focus",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Sandbox oyununda en çok ne yapmak istiyorsun?",
    options: [
      { label: "Bir şeyler inşa etmek ve üretmek", value: "Yaratıcılık / özgürlük" },
      { label: "Crafting yapmak", value: "Crafting" },
      { label: "Keşfe çıkmak", value: "Keşif" },
      { label: "Hayatta kalmak", value: "Hayatta kalma" },
      { label: "Arkadaşlarla farklı deneyimler oynamak", value: "Kullanıcı içerikleri" },
    ],
  },
  {
    id: "sandbox-base",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Üs veya yapı kurmak ne kadar önemli?",
    options: [
      { label: "Oyunun merkezinde olsun", value: "Base building" },
      { label: "Özgürce inşa edebileyim", value: "Yaratıcılık / özgürlük" },
      { label: "Şart değil; keşif daha önemli", value: "Keşif" },
    ],
  },
  {
    id: "sandbox-challenge",
    kind: "preference",
    scoreField: "challengeStyle",
    weight: 3,
    question: "Sandbox seni zorlasın mı?",
    options: [
      { label: "Rahatlatmalı", value: "Rahatlatmalı" },
      { label: "Dengeli olsun", value: "İkisi dengeli olmalı" },
      { label: "Zorlamalı", value: "Zorlamalı" },
    ],
  },
];

const survivalQuestions: Question[] = [
  {
    id: "survival-core",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Hayatta kalma oyununda hangi sistem en önemli?",
    options: [
      { label: "Crafting", value: "Crafting" },
      { label: "Üs kurma", value: "Base building" },
      { label: "Kaynak yönetimi", value: "Kaynak yönetimi" },
      { label: "Loot toplamak", value: "Loot" },
    ],
  },
  {
    id: "survival-risk",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Risk seviyesi nasıl olsun?",
    options: [
      { label: "Ölünce/kaybedince ciddi bedeli olsun", value: "Yüksek risk" },
      { label: "Dengeli olsun", value: "Hayatta kalma" },
      { label: "Daha çok keşif ve üretim istiyorum", value: "Keşif" },
    ],
  },
  {
    id: "survival-horror",
    kind: "preference",
    scoreField: "horrorInterest",
    weight: 3,
    question: "Korku öğeleri ister misin?",
    options: [
      { label: "Evet, gerilim de olsun", value: "Çok severim", matchValues: ["Çok severim", "Bazen oynarım"] },
      { label: "Biraz olabilir", value: "Bazen oynarım" },
      { label: "Korku istemiyorum", value: "Sevmem" },
    ],
  },
];

const puzzleQuestions: Question[] = [
  {
    id: "puzzle-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Nasıl bulmacalar çözmek istiyorsun?",
    options: [
      { label: "Fizik tabanlı", value: "Fizik bulmacası" },
      { label: "Çevreyi kullanarak", value: "Çevresel bulmaca" },
      { label: "Görsel/optik", value: "Optik bulmaca" },
      { label: "Arkadaşımla birlikte", value: "Co-op bulmaca" },
    ],
  },
  {
    id: "puzzle-story",
    kind: "preference",
    scoreField: "storyImportance",
    weight: 3,
    question: "Bulmacaların yanında hikâye ister misin?",
    options: [
      { label: "Evet, güçlü hikâye olsun", value: "Çok önemli" },
      { label: "Biraz olsun", value: "Biraz önemli" },
      { label: "Bulmacalar yeterli", value: "Önemli değil" },
    ],
  },
  {
    id: "puzzle-length",
    kind: "preference",
    scoreField: "length",
    weight: 2,
    question: "Ne kadar uzun bir bulmaca oyunu arıyorsun?",
    options: [
      { label: "Kısa", value: "Kısa" },
      { label: "Orta uzunlukta", value: "Orta uzunlukta" },
      { label: "Uzun süre oynayayım", value: "Çok uzun", matchValues: ["Çok uzun", "Sonsuz oynanabilir"] },
    ],
  },
];

const sportsQuestions: Question[] = [
  {
    id: "sports-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Nasıl bir spor deneyimi istiyorsun?",
    options: [
      { label: "Futbol", value: "Futbol" },
      { label: "Araçlarla rekabet", value: "Araç sporu" },
      { label: "Takımı saha dışından yönetmek", value: "Spor yönetimi" },
    ],
  },
  {
    id: "sports-focus",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Seni en çok ne motive eder?",
    options: [
      { label: "Online rekabet", value: "PvP" },
      { label: "Takım kurup geliştirmek", value: "Takım kurma" },
      { label: "Uzun kariyer", value: "Uzun kariyer" },
      { label: "Kısa ve beceri odaklı maçlar", value: "Kısa maçlar" },
    ],
  },
];

const mobaQuestions: Question[] = [
  {
    id: "moba-competition",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "MOBA'da ne kadar rekabet istiyorsun?",
    options: [
      { label: "Ranked ve ciddi rekabet", value: "Ranked" },
      { label: "PvP olsun ama rahat oynayayım", value: "PvP" },
      { label: "Arkadaşlarla takım olmak önceliğim", value: "Takım koordinasyonu" },
    ],
  },
  {
    id: "moba-focus",
    kind: "preference",
    scoreField: "features",
    weight: 4,
    question: "Oynanışta ne daha önemli?",
    options: [
      { label: "Karakter yetenekleri", value: "Karakter yetenekleri" },
      { label: "Takım koordinasyonu", value: "Takım koordinasyonu" },
      { label: "Kısa maçlar", value: "Kısa maçlar" },
    ],
  },
  {
    id: "moba-difficulty",
    kind: "preference",
    scoreField: "difficulty",
    weight: 3,
    question: "Öğrenme eğrisi nasıl olsun?",
    options: [
      { label: "Kolay girilebilir", value: "Kolay" },
      { label: "Dengeli", value: "Orta" },
      { label: "Derin ve zor", value: "Zor" },
    ],
  },
];

const partyQuestions: Question[] = [
  {
    id: "party-type",
    kind: "preference",
    scoreField: "features",
    weight: 5,
    question: "Arkadaş grubunda nasıl bir eğlence arıyorsun?",
    options: [
      { label: "Birbirimizi kandıralım ve tartışalım", value: "Sosyal çıkarım" },
      { label: "Birlikte bulmaca çözelim", value: "Co-op bulmaca" },
      { label: "Kısa ve hızlı mini oyunlar", value: "Mini oyunlar" },
      { label: "Kullanıcıların yaptığı farklı oyunları deneyelim", value: "Kullanıcı içerikleri" },
    ],
  },
  {
    id: "party-session",
    kind: "preference",
    scoreField: "features",
    weight: 3,
    question: "Oturum yapısı nasıl olsun?",
    options: [
      { label: "Kısa maçlar", value: "Kısa maçlar" },
      { label: "Hikâyeli bir co-op macera", value: "Hikâye odaklı" },
      { label: "Sonsuz farklı deneyim", value: "Sandbox özgürlüğü" },
    ],
  },
];

export const categoryQuestionBooks: Record<Category, Question[]> = {
  RPG: rpgQuestions,
  "FPS / Nişancı": shooterQuestions,
  "Aksiyon / Macera": actionQuestions,
  Yarış: racingQuestions,
  Strateji: strategyQuestions,
  Korku: horrorQuestions,
  Simülasyon: simulationQuestions,
  "Yönetim / Kurma": managementQuestions,
  "Sandbox / Yaratıcılık": sandboxQuestions,
  "Hayatta Kalma": survivalQuestions,
  Bulmaca: puzzleQuestions,
  Spor: sportsQuestions,
  MOBA: mobaQuestions,
  "Parti / Sosyal": partyQuestions,
};

export const commonPreferenceQuestions: Question[] = [
  {
    id: "common-length",
    kind: "preference",
    scoreField: "length",
    weight: 3,
    question: "Bu oyunla ne kadar vakit geçirmek istiyorsun?",
    options: [
      { label: "Kısa sürede bitireyim", value: "Kısa" },
      { label: "Kararında bir uzunluk", value: "Orta uzunlukta" },
      { label: "Uzun süre dünyasında kalayım", value: "Çok uzun" },
      { label: "Dönüp dönüp oynayayım", value: "Sonsuz oynanabilir" },
    ],
  },
  {
    id: "common-atmosphere",
    kind: "preference",
    scoreField: "atmosphere",
    weight: 3,
    question: "Bugün hangi atmosfer seni daha çok çeker?",
    options: [
      { label: "Fantastik", value: "Fantastik" },
      { label: "Bilim kurgu", value: "Bilim kurgu" },
      { label: "Gerçekçi", value: "Gerçekçi" },
      { label: "Karanlık", value: "Karanlık" },
      { label: "Renkli / stilize", value: "Cartoon", matchValues: ["Cartoon", "Anime"] },
    ],
  },
  {
    id: "common-challenge",
    kind: "preference",
    scoreField: "challengeStyle",
    weight: 3,
    question: "Oyun bugün sana nasıl davransın?",
    options: [
      { label: "Rahatlatmalı", value: "Rahatlatmalı" },
      { label: "Hem eğlendirsin hem zorlasın", value: "İkisi dengeli olmalı" },
      { label: "Beni ciddi şekilde zorlasın", value: "Zorlamalı" },
    ],
  },
  {
    id: "common-graphics",
    kind: "preference",
    scoreField: "graphics",
    weight: 2,
    question: "Görsel tarz konusunda ne istersin?",
    options: [
      { label: "Gerçekçi", value: "Gerçekçi" },
      { label: "Cartoon / stilize", value: "Cartoon" },
      { label: "Pixel", value: "Pixel" },
      { label: "Anime", value: "Anime" },
      { label: "Minimal", value: "Minimal" },
    ],
  },
];

export function getQuestionsForCategory(category: Category): Question[] {
  return [
    ...hardFilterQuestions,
    ...categoryQuestionBooks[category],
    ...commonPreferenceQuestions,
  ];
}

// Geçiş sürecinde eski importların tamamen kırılmaması için.
// Dinamik akışta index.tsx hardFilterQuestions ve categoryQuestionBooks kullanacak.
export const questions = hardFilterQuestions;
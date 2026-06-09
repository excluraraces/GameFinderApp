const baldursGateImage = require("../../assets/images/baldursgate3.jpeg");
const witcher3Image = require("../../assets/images/witcher3.jpeg");

export type Game = {
  id: number;
  title: string;

  platforms: string[];
  genres: string[];
  storyImportance: string[];
  tempo: string[];
  playStyle: string[];
  worldType: string[];
  difficulty: string[];
  graphics: string[];
  characterProgression: string[];
  length: string[];
  vehicleInterest: string[];
  horrorInterest: string[];
  strategyInterest: string[];
  challengeStyle: string[];
  atmosphere: string[];

  image?: any;
  story: string;
};

export const games: Game[] = [
  {
    id: 1,
    title: "Baldur's Gate 3",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["RPG", "Strateji"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik", "Arkadaşlarla"],
    worldType: ["Açık dünya", "Lineer hikaye"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem", "Bazen oynarım"],
    strategyInterest: ["Evet", "Biraz"],
    challengeStyle: ["Zorlamalı", "İkisi dengeli olmalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    image: baldursGateImage,
    story:
      "Fantastik bir dünyada geçen Baldur's Gate 3, seni karanlık güçler, tehlikeli yaratıklar ve zor kararlarla dolu büyük bir maceraya çıkarır. Seçimlerin hikayenin gidişatını değiştirir.",
  },
  {
    id: 2,
    title: "The Witcher 3",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["RPG"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Yavaş ve taktiksel", "Gerilimli"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Bazen oynarım", "Sevmem"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    image: witcher3Image,
    story:
      "Canavar avcısı Geralt olarak, savaşın yıktığı bir dünyada kayıp yakınlarını ararsın. Hikaye; seçimler, karanlık sırlar ve unutulmaz karakterlerle ilerler.",
  },
  {
    id: 3,
    title: "Skyrim",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["RPG"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Yavaş ve taktiksel", "Rahatlatıcı"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya", "Sandbox"],
    difficulty: ["Kolay", "Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun", "Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem", "Bazen oynarım"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı", "Rahatlatmalı"],
    atmosphere: ["Fantastik"],

    story:
      "Ejderhaların geri döndüğü Skyrim diyarında, kendi karakterini geliştirerek keşfe çıkar, savaşır ve efsanevi bir kahramana dönüşürsün.",
  },
  {
    id: 4,
    title: "Resident Evil 4",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Korku"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Gerilimli", "Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik"],
    worldType: ["Bölüm bölüm ilerleyen", "Lineer hikaye"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun"],
    length: ["Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Çok severim", "Bazen oynarım"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["Zorlamalı", "İkisi dengeli olmalı"],
    atmosphere: ["Karanlık", "Gerçekçi"],

    story:
      "Resident Evil 4, gerilim, aksiyon ve hayatta kalma öğelerini birleştiren karanlık atmosferli bir korku oyunudur.",
  },
  {
    id: 5,
    title: "Forza Horizon 5",

    platforms: ["PC", "Xbox"],
    genres: ["Yarış"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Hızlı ve aksiyonlu", "Rahatlatıcı"],
    playStyle: ["Tek kişilik", "Arkadaşlarla", "Online rekabetçi"],
    worldType: ["Açık dünya", "Sandbox"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Gerek yok"],
    length: ["Sonsuz oynanabilir", "Çok uzun"],
    vehicleInterest: ["Evet", "Biraz"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Hayır"],
    challengeStyle: ["Rahatlatmalı", "İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Forza Horizon 5, geniş açık dünyasında özgürce yarışabileceğin, araç toplayıp geliştirebileceğin eğlenceli ve görsel olarak güçlü bir yarış oyunudur.",
  },
  {
    id: 6,
    title: "Valorant",

    platforms: ["PC"],
    genres: ["FPS"],
    storyImportance: ["Önemli değil"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Bölüm bölüm ilerleyen"],
    difficulty: ["Zor", "Çok zor"],
    graphics: ["Cartoon"],
    characterProgression: ["Gerek yok", "Biraz olsun"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz", "Evet"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Bilim kurgu"],

    story:
      "Valorant, takım oyunu ve refleksleri öne çıkaran rekabetçi bir FPS oyunudur. Ajan yetenekleri ve taktiksel oynanış sayesinde her maç farklı ilerler.",
  },
];
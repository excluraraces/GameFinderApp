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
      "Ejderhaların geri döndüğü Skyrim diyarında kendi karakterini geliştirerek keşfe çıkar, savaşır ve efsanevi bir kahramana dönüşürsün.",
  },
  {
    id: 4,
    title: "Resident Evil 4",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Korku", "Aksiyon"],
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
      "Resident Evil 4, gerilim, aksiyon ve hayatta kalma öğelerini birleştiren karanlık atmosferli bir korku oyunudur. Leon ile tehlikeli bir köyde hayatta kalmaya çalışırsın.",
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

  {
    id: 7,
    title: "Red Dead Redemption 2",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Aksiyon", "RPG"],
    storyImportance: ["Çok önemli"],
    tempo: ["Yavaş ve taktiksel", "Rahatlatıcı", "Gerilimli"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun"],
    length: ["Çok uzun"],
    vehicleInterest: ["Biraz"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Hayır", "Biraz"],
    challengeStyle: ["İkisi dengeli olmalı", "Rahatlatmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Vahşi batının son dönemlerinde geçen Red Dead Redemption 2, Arthur Morgan'ın çete hayatı, sadakat, ihanet ve hayatta kalma mücadelesini anlatır.",
  },
  {
    id: 8,
    title: "Cyberpunk 2077",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["RPG", "Aksiyon"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Hızlı ve aksiyonlu", "Gerilimli"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun", "Orta uzunlukta"],
    vehicleInterest: ["Evet", "Biraz"],
    horrorInterest: ["Bazen oynarım", "Sevmem"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı"],
    atmosphere: ["Bilim kurgu", "Karanlık"],

    story:
      "Night City adlı devasa şehirde geçen Cyberpunk 2077, teknoloji, suç, güç ve kimlik temalarını işleyen karanlık bir açık dünya RPG deneyimi sunar.",
  },
  {
    id: 9,
    title: "Elden Ring",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["RPG", "Aksiyon"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Gerilimli", "Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik", "Online rekabetçi"],
    worldType: ["Açık dünya"],
    difficulty: ["Zor", "Çok zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim"],
    length: ["Çok uzun"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Bazen oynarım"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    story:
      "Elden Ring, acımasız düşmanlar, büyük boss savaşları ve gizemli bir açık dünya sunar. Zorlayıcı mücadeleleri seven oyuncular için güçlü bir seçimdir.",
  },
  {
    id: 10,
    title: "God of War",

    platforms: ["PC", "PlayStation"],
    genres: ["Aksiyon"],
    storyImportance: ["Çok önemli"],
    tempo: ["Hızlı ve aksiyonlu", "Gerilimli"],
    playStyle: ["Tek kişilik"],
    worldType: ["Lineer hikaye", "Bölüm bölüm ilerleyen"],
    difficulty: ["Kolay", "Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Evet çok isterim"],
    length: ["Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem", "Bazen oynarım"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    story:
      "Kratos ve oğlu Atreus'un mitolojik dünyada geçen yolculuğu, güçlü dövüş sistemiyle duygusal bir baba-oğul hikayesini birleştirir.",
  },
  {
    id: 11,
    title: "The Last of Us Part I",

    platforms: ["PC", "PlayStation"],
    genres: ["Aksiyon", "Korku"],
    storyImportance: ["Çok önemli"],
    tempo: ["Gerilimli", "Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik"],
    worldType: ["Lineer hikaye"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun"],
    length: ["Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Bazen oynarım", "Çok severim"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı", "Zorlamalı"],
    atmosphere: ["Karanlık", "Gerçekçi"],

    story:
      "Salgın sonrası yıkılmış bir dünyada Joel ve Ellie'nin hayatta kalma yolculuğunu anlatır. Hikaye ve karakter bağı ön plandadır.",
  },
  {
    id: 12,
    title: "Hogwarts Legacy",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["RPG", "Aksiyon"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Rahatlatıcı", "Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun", "Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Hayır", "Biraz"],
    challengeStyle: ["Rahatlatmalı", "İkisi dengeli olmalı"],
    atmosphere: ["Fantastik"],

    story:
      "Hogwarts öğrencisi olarak büyüler öğrenir, okulun sırlarını keşfeder ve fantastik yaratıklarla dolu bir dünyada kendi macerana çıkarsın.",
  },
  {
    id: 13,
    title: "Assassin's Creed Odyssey",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["RPG", "Aksiyon"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Hızlı ve aksiyonlu", "Rahatlatıcı"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Kolay", "Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Çok uzun"],
    vehicleInterest: ["Biraz"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz", "Hayır"],
    challengeStyle: ["İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Antik Yunan dünyasında geçen Assassin's Creed Odyssey, keşif, savaş, seçimler ve büyük bir aile hikayesi etrafında ilerler.",
  },
  {
    id: 14,
    title: "Ghost of Tsushima",

    platforms: ["PlayStation", "PC"],
    genres: ["Aksiyon"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Hızlı ve aksiyonlu", "Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik"],
    worldType: ["Açık dünya"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Evet çok isterim"],
    length: ["Çok uzun", "Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Moğol istilasına karşı savaşan Jin Sakai'nin hikayesini anlatır. Samuray onuru ile hayatta kalma arasında güçlü bir çatışma sunar.",
  },
  {
    id: 15,
    title: "Grand Theft Auto V",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Aksiyon", "Yarış"],
    storyImportance: ["Biraz önemli", "Önemli değil"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik", "Online rekabetçi", "Arkadaşlarla"],
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
      "Los Santos şehrinde üç farklı karakterin suç, para ve kaos dolu hikayesini oynarsın. Açık dünya özgürlüğü ve araç kullanımı oldukça ön plandadır.",
  },
  {
    id: 16,
    title: "Need for Speed Heat",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Yarış"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik", "Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Açık dünya"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun"],
    length: ["Orta uzunlukta", "Sonsuz oynanabilir"],
    vehicleInterest: ["Evet"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Hayır"],
    challengeStyle: ["Rahatlatmalı", "İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Gündüz yasal yarışlara, gece ise sokak yarışlarına katıldığın Need for Speed Heat; araç modifiye etmeyi ve hızlı yarışları sevenler için uygundur.",
  },
  {
    id: 17,
    title: "BeamNG.drive",

    platforms: ["PC"],
    genres: ["Yarış", "Simülasyon"],
    storyImportance: ["Önemli değil"],
    tempo: ["Rahatlatıcı", "Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik"],
    worldType: ["Sandbox", "Açık dünya"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Gerek yok"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Evet"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Hayır"],
    challengeStyle: ["Rahatlatmalı", "İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "BeamNG.drive, gerçekçi araç fiziği ve çarpışma sistemiyle öne çıkan bir sürüş simülasyonudur. Deneme, kaza testi ve serbest sürüş sevenlere hitap eder.",
  },
  {
    id: 18,
    title: "Car Mechanic Simulator 2021",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["Simülasyon"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Rahatlatıcı", "Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik"],
    worldType: ["Sandbox"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Evet çok isterim"],
    length: ["Sonsuz oynanabilir", "Çok uzun"],
    vehicleInterest: ["Evet"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz", "Hayır"],
    challengeStyle: ["Rahatlatmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Araçları söküp tamir ettiğin, parça değiştirdiğin ve garajını geliştirdiğin sakin tempolu bir simülasyon oyunudur.",
  },
  {
    id: 19,
    title: "Call of Duty: Modern Warfare",

    platforms: ["PC", "PlayStation", "Xbox"],
    genres: ["FPS", "Aksiyon"],
    storyImportance: ["Biraz önemli", "Önemli değil"],
    tempo: ["Hızlı ve aksiyonlu", "Gerilimli"],
    playStyle: ["Tek kişilik", "Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Bölüm bölüm ilerleyen", "Lineer hikaye"],
    difficulty: ["Kolay", "Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Gerek yok"],
    length: ["Orta uzunlukta", "Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır", "Biraz"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı", "Zorlamalı"],
    atmosphere: ["Gerçekçi", "Karanlık"],

    story:
      "Modern savaş atmosferinde geçen Call of Duty, hızlı çatışmalar, sinematik görevler ve rekabetçi çok oyunculu modlarla aksiyon odaklı bir deneyim sunar.",
  },
  {
    id: 20,
    title: "Counter-Strike 2",

    platforms: ["PC"],
    genres: ["FPS"],
    storyImportance: ["Önemli değil"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Bölüm bölüm ilerleyen"],
    difficulty: ["Zor", "Çok zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Gerek yok"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Evet", "Biraz"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Counter-Strike 2, refleks, takım oyunu, ekonomi yönetimi ve harita bilgisi isteyen rekabetçi bir FPS oyunudur.",
  },
  {
    id: 21,
    title: "Apex Legends",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["FPS", "Aksiyon"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Açık dünya", "Bölüm bölüm ilerleyen"],
    difficulty: ["Orta", "Zor", "Çok zor"],
    graphics: ["Cartoon"],
    characterProgression: ["Biraz olsun", "Gerek yok"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz", "Evet"],
    challengeStyle: ["Zorlamalı", "İkisi dengeli olmalı"],
    atmosphere: ["Bilim kurgu"],

    story:
      "Apex Legends, hızlı hareket sistemi, karakter yetenekleri ve takım odaklı oynanışıyla battle royale türünde rekabetçi bir FPS deneyimi sunar.",
  },
  {
    id: 22,
    title: "Outlast",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["Korku"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Gerilimli"],
    playStyle: ["Tek kişilik"],
    worldType: ["Lineer hikaye"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Gerek yok"],
    length: ["Kısa", "Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Çok severim"],
    strategyInterest: ["Hayır", "Biraz"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Karanlık", "Gerçekçi"],

    story:
      "Bir akıl hastanesinde geçen Outlast, savaşmak yerine kaçmaya ve saklanmaya dayalı yoğun gerilimli bir korku oyunudur.",
  },
  {
    id: 23,
    title: "Amnesia: The Dark Descent",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["Korku"],
    storyImportance: ["Çok önemli", "Biraz önemli"],
    tempo: ["Gerilimli", "Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik"],
    worldType: ["Lineer hikaye"],
    difficulty: ["Orta"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Gerek yok"],
    length: ["Kısa", "Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Çok severim"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Karanlık"],

    story:
      "Karanlık bir şatoda hafızasını kaybetmiş şekilde uyanırsın. Amnesia, atmosferi ve çaresizlik hissiyle psikolojik korkuya odaklanır.",
  },
  {
    id: 24,
    title: "Phasmophobia",

    platforms: ["PC"],
    genres: ["Korku", "Simülasyon"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Gerilimli"],
    playStyle: ["Arkadaşlarla", "Tek kişilik"],
    worldType: ["Bölüm bölüm ilerleyen"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Çok severim", "Bazen oynarım"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["İkisi dengeli olmalı", "Zorlamalı"],
    atmosphere: ["Karanlık", "Gerçekçi"],

    story:
      "Arkadaşlarınla birlikte hayalet avına çıktığın Phasmophobia, ekipman kullanımı, ipucu toplama ve gerilimli anlarıyla öne çıkar.",
  },
  {
    id: 25,
    title: "Age of Empires IV",

    platforms: ["PC", "Xbox"],
    genres: ["Strateji"],
    storyImportance: ["Biraz önemli", "Önemli değil"],
    tempo: ["Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik", "Online rekabetçi", "Arkadaşlarla"],
    worldType: ["Bölüm bölüm ilerleyen"],
    difficulty: ["Orta", "Zor", "Çok zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Gerek yok"],
    length: ["Sonsuz oynanabilir", "Çok uzun"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Evet"],
    challengeStyle: ["Zorlamalı", "İkisi dengeli olmalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Age of Empires IV, kaynak toplama, ordu kurma ve medeniyet yönetimi üzerine kurulu gerçek zamanlı bir strateji oyunudur.",
  },
  {
    id: 26,
    title: "Civilization VI",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["Strateji"],
    storyImportance: ["Önemli değil", "Biraz önemli"],
    tempo: ["Yavaş ve taktiksel", "Rahatlatıcı"],
    playStyle: ["Tek kişilik", "Arkadaşlarla", "Online rekabetçi"],
    worldType: ["Sandbox"],
    difficulty: ["Kolay", "Orta", "Zor", "Çok zor"],
    graphics: ["Cartoon"],
    characterProgression: ["Biraz olsun"],
    length: ["Çok uzun", "Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Evet"],
    challengeStyle: ["İkisi dengeli olmalı", "Zorlamalı"],
    atmosphere: ["Gerçekçi"],

    story:
      "Kendi medeniyetini kurup bilim, kültür, diplomasi veya savaş yoluyla dünyaya hükmetmeye çalıştığın derin bir sıra tabanlı strateji oyunudur.",
  },
  {
    id: 27,
    title: "Total War: Warhammer III",

    platforms: ["PC"],
    genres: ["Strateji"],
    storyImportance: ["Biraz önemli"],
    tempo: ["Yavaş ve taktiksel"],
    playStyle: ["Tek kişilik", "Online rekabetçi"],
    worldType: ["Sandbox", "Açık dünya"],
    difficulty: ["Orta", "Zor", "Çok zor"],
    graphics: ["Gerçekçi"],
    characterProgression: ["Biraz olsun", "Evet çok isterim"],
    length: ["Çok uzun", "Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Bazen oynarım"],
    strategyInterest: ["Evet"],
    challengeStyle: ["Zorlamalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    story:
      "Fantastik orduları yönettiğin Total War: Warhammer III, büyük harita stratejisiyle devasa gerçek zamanlı savaşları birleştirir.",
  },
  {
    id: 28,
    title: "Minecraft",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobil"],
    genres: ["Sandbox", "Simülasyon"],
    storyImportance: ["Önemli değil"],
    tempo: ["Rahatlatıcı"],
    playStyle: ["Tek kişilik", "Arkadaşlarla"],
    worldType: ["Sandbox", "Açık dünya"],
    difficulty: ["Kolay", "Orta"],
    graphics: ["Pixel"],
    characterProgression: ["Biraz olsun", "Gerek yok"],
    length: ["Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem", "Bazen oynarım"],
    strategyInterest: ["Biraz", "Hayır"],
    challengeStyle: ["Rahatlatmalı"],
    atmosphere: ["Fantastik"],

    story:
      "Minecraft, bloklarla kendi dünyanı kurabildiğin, keşif, üretim ve hayatta kalma öğelerini birleştiren sınırsız oynanabilirliğe sahip bir sandbox oyunudur.",
  },
  {
    id: 29,
    title: "Stardew Valley",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobil"],
    genres: ["Simülasyon", "RPG"],
    storyImportance: ["Biraz önemli", "Önemli değil"],
    tempo: ["Rahatlatıcı"],
    playStyle: ["Tek kişilik", "Arkadaşlarla"],
    worldType: ["Sandbox"],
    difficulty: ["Kolay"],
    graphics: ["Pixel"],
    characterProgression: ["Biraz olsun", "Evet çok isterim"],
    length: ["Çok uzun", "Sonsuz oynanabilir"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Sevmem"],
    strategyInterest: ["Biraz", "Hayır"],
    challengeStyle: ["Rahatlatmalı"],
    atmosphere: ["Fantastik"],

    story:
      "Kendi çiftliğini kurduğun, kasaba halkıyla ilişkiler geliştirdiğin ve sakin tempoda ilerleyen huzurlu bir yaşam simülasyonudur.",
  },
  {
    id: 30,
    title: "Hades",

    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    genres: ["Aksiyon", "RPG"],
    storyImportance: ["Biraz önemli", "Çok önemli"],
    tempo: ["Hızlı ve aksiyonlu"],
    playStyle: ["Tek kişilik"],
    worldType: ["Bölüm bölüm ilerleyen"],
    difficulty: ["Orta", "Zor"],
    graphics: ["Cartoon"],
    characterProgression: ["Evet çok isterim", "Biraz olsun"],
    length: ["Sonsuz oynanabilir", "Orta uzunlukta"],
    vehicleInterest: ["Hayır"],
    horrorInterest: ["Bazen oynarım", "Sevmem"],
    strategyInterest: ["Biraz"],
    challengeStyle: ["Zorlamalı", "İkisi dengeli olmalı"],
    atmosphere: ["Fantastik", "Karanlık"],

    story:
      "Yeraltı dünyasından kaçmaya çalışan Zagreus'u yönettiğin Hades, hızlı aksiyon, tekrar oynanabilirlik ve karakter gelişimini çok başarılı şekilde birleştirir.",
  },
];
export type QuestionOption = {
  label: string;
  value: string;
};

export type Question = {
  question: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    question: "Bugün hangi platformda oynamayı düşünüyorsun?",
    options: [
      { label: "Bilgisayar / PC", value: "PC" },
      { label: "PlayStation", value: "PlayStation" },
      { label: "Xbox", value: "Xbox" },
      { label: "Nintendo Switch", value: "Nintendo Switch" },
      { label: "Mobil cihaz", value: "Mobil" },
    ],
  },
  {
    question: "Bugün nasıl bir oyun deneyimi arıyorsun?",
    options: [
      { label: "Derin hikayeli bir macera", value: "RPG" },
      { label: "Refleks ve nişan alma odaklı aksiyon", value: "FPS" },
      { label: "Hız, araçlar ve yarış hissi", value: "Yarış" },
      { label: "Planlama ve taktik kurma", value: "Strateji" },
      { label: "Gerilim ve hayatta kalma", value: "Korku" },
    ],
  },
  {
    question: "Hikaye senin için ne kadar önemli?",
    options: [
      { label: "Hikaye benim için oyunun ana sebebi", value: "Çok önemli" },
      { label: "İyi olursa güzel olur ama şart değil", value: "Biraz önemli" },
      { label: "Direkt oynanışa bakarım", value: "Önemli değil" },
    ],
  },
  {
    question: "Oynanış temposu nasıl olsun?",
    options: [
      { label: "Hızlı, aksiyonlu ve canlı", value: "Hızlı ve aksiyonlu" },
      {
        label: "Daha yavaş, düşünerek ve taktiksel",
        value: "Yavaş ve taktiksel",
      },
      {
        label: "Sakin, rahatlatıcı ve kafa dağıtmalık",
        value: "Rahatlatıcı",
      },
      { label: "Gergin, baskılı ve atmosferik", value: "Gerilimli" },
    ],
  },
  {
    question: "Nasıl oynamayı tercih edersin?",
    options: [
      { label: "Tek başıma, kendi tempomda", value: "Tek kişilik" },
      { label: "Arkadaşlarımla birlikte", value: "Arkadaşlarla" },
      { label: "Rekabetçi online maçlar", value: "Online rekabetçi" },
      { label: "Fark etmez, oyun iyi olsun yeter", value: "Fark etmez" },
    ],
  },
  {
    question: "Oyun dünyası nasıl hissettirsin?",
    options: [
      { label: "Özgürce gezebileceğim açık dünya", value: "Açık dünya" },
      {
        label: "Bölüm bölüm ilerleyen net yapı",
        value: "Bölüm bölüm ilerleyen",
      },
      { label: "Sinematik ve çizgisel hikaye", value: "Lineer hikaye" },
      {
        label: "Kendi hedefimi kuracağım sandbox yapı",
        value: "Sandbox",
      },
    ],
  },
  {
    question: "Zorluk seviyesi nasıl olsun?",
    options: [
      { label: "Kolay olsun, yormasın", value: "Kolay" },
      { label: "Dengeli olsun", value: "Orta" },
      { label: "Zorlasın ama adil olsun", value: "Zor" },
      { label: "Ciddi meydan okuma istiyorum", value: "Çok zor" },
    ],
  },
  {
    question: "Görsel tarz olarak hangisi sana daha yakın?",
    options: [
      { label: "Gerçekçi ve sinematik görseller", value: "Gerçekçi" },
      { label: "Renkli / stilize cartoon tarzı", value: "Cartoon" },
      { label: "Pixel art / retro görünüm", value: "Pixel art" },
      { label: "Anime tarzı görsel dil", value: "Anime tarzı" },
    ],
  },
  {
    question: "Oyunda gelişim hissi ister misin?",
    options: [
      {
        label: "Evet, karakterimi veya ekipmanımı geliştirmeliyim",
        value: "Evet çok isterim",
      },
      { label: "Biraz gelişim olsa yeter", value: "Biraz olsun" },
      {
        label: "Gelişim şart değil, direkt oynanış önemli",
        value: "Gerek yok",
      },
    ],
  },
  {
    question: "Bugün ne kadar uzunlukta bir oyun arıyorsun?",
    options: [
      { label: "Kısa sürede tatmin etsin", value: "Kısa" },
      {
        label: "Orta uzunlukta, fazla yormayan bir şey",
        value: "Orta uzunlukta",
      },
      {
        label: "Uzun süre içine gömüleceğim bir oyun",
        value: "Çok uzun",
      },
      {
        label: "Sürekli oynanabilir, bitmeyen yapı",
        value: "Sonsuz oynanabilir",
      },
    ],
  },
  {
    question: "Araç kullanma, yarış veya sürüş hissi ilgini çeker mi?",
    options: [
      { label: "Evet, özellikle araç ve hız istiyorum", value: "Evet" },
      { label: "Olursa güzel olur ama şart değil", value: "Biraz" },
      { label: "Hayır, araç odaklı oyun istemiyorum", value: "Hayır" },
    ],
  },
  {
    question: "Korku ve gerilim konusunda tercihin ne?",
    options: [
      { label: "Korku oyunlarını özellikle severim", value: "Çok severim" },
      { label: "Bazen gerilim iyi gider", value: "Bazen oynarım" },
      { label: "Korku istemiyorum", value: "Sevmem" },
    ],
  },
  {
    question: "Strateji ve planlama senin için ne kadar önemli?",
    options: [
      { label: "Planlama ve taktik kurmayı severim", value: "Evet" },
      { label: "Biraz taktik olsun ama boğmasın", value: "Biraz" },
      { label: "Stratejiyle uğraşmak istemiyorum", value: "Hayır" },
    ],
  },
  {
    question: "Oyun seni daha çok nasıl hissettirsin?",
    options: [
      { label: "Rahatlatmalı ve kafa dağıtmalı", value: "Rahatlatmalı" },
      {
        label: "Zorlamalı ve mücadele hissi vermeli",
        value: "Zorlamalı",
      },
      {
        label: "Hem keyifli hem de dengeli zorlayıcı olmalı",
        value: "İkisi dengeli olmalı",
      },
    ],
  },
  {
    question: "Hangi atmosfer sana daha yakın?",
    options: [
      {
        label: "Fantastik evrenler ve mitolojik dünyalar",
        value: "Fantastik",
      },
      {
        label: "Bilim kurgu ve teknolojik dünyalar",
        value: "Bilim kurgu",
      },
      { label: "Gerçekçi ve modern atmosfer", value: "Gerçekçi" },
      {
        label: "Karanlık, kasvetli ve sert atmosfer",
        value: "Karanlık",
      },
    ],
  },
];
import type { Question } from "./questions";

export const englishQuestions: Question[] = [
  {
    question: "Which platform will you be playing on today?",
    options: [
      { label: "I'm playing on PC", value: "PC" },
      { label: "My PlayStation controller is ready", value: "PlayStation" },
      { label: "I'll be playing on Xbox", value: "Xbox" },
      { label: "I have my Nintendo Switch with me", value: "Nintendo Switch" },
      { label: "I'm playing on a phone or tablet", value: "Mobil" },
    ],
  },
  {
    question: "Which gaming experience appeals to you the most today?",
    options: [
      { label: "Getting lost in a powerful story", value: "RPG" },
      { label: "Putting my reflexes and aim to the test", value: "FPS" },
      { label: "Enjoying speed and driving", value: "Yarış" },
      { label: "Making plans and choosing the right moves", value: "Strateji" },
      { label: "Trying to survive in a tense atmosphere", value: "Korku" },
    ],
  },
  {
    question: "How important is a good story when choosing a game?",
    options: [
      { label: "The story is the heart of a game for me", value: "Çok önemli" },
      { label: "A strong story is a major bonus", value: "Biraz önemli" },
      { label: "I mainly care about the gameplay", value: "Önemli değil" },
    ],
  },
  {
    question: "What kind of gameplay pace do you want today?",
    options: [
      {
        label: "Fast, constant and energetic action",
        value: "Hızlı ve aksiyonlu",
      },
      {
        label: "Taking my time to think and make decisions",
        value: "Yavaş ve taktiksel",
      },
      {
        label: "Something calm, peaceful and relaxing",
        value: "Rahatlatıcı",
      },
      {
        label: "Something that keeps me on the edge of my seat",
        value: "Gerilimli",
      },
    ],
  },
  {
    question: "How would you like to begin this adventure?",
    options: [
      { label: "Alone, at my own pace", value: "Tek kişilik" },
      { label: "On the same team as my friends", value: "Arkadaşlarla" },
      {
        label: "Competing against other players online",
        value: "Online rekabetçi",
      },
      {
        label: "It doesn't matter as long as the game is good",
        value: "Fark etmez",
      },
    ],
  },
  {
    question: "What kind of game world would you like to explore?",
    options: [
      {
        label: "An open world where I can go anywhere",
        value: "Açık dünya",
      },
      {
        label: "A structured experience divided into levels",
        value: "Bölüm bölüm ilerleyen",
      },
      {
        label: "A cinematic and linear journey",
        value: "Lineer hikaye",
      },
      {
        label: "A free space where I set my own goals",
        value: "Sandbox",
      },
    ],
  },
  {
    question: "How challenging should the game be today?",
    options: [
      {
        label: "Easygoing and not too demanding",
        value: "Kolay",
      },
      {
        label: "A balanced and fair challenge",
        value: "Orta",
      },
      {
        label: "Difficult, but rewarding",
        value: "Zor",
      },
      {
        label: "No mercy. I'm ready for it",
        value: "Çok zor",
      },
    ],
  },
  {
    question: "Which visual style draws you in the fastest?",
    options: [
      {
        label: "A realistic and cinematic look",
        value: "Gerçekçi",
      },
      {
        label: "A colorful and stylized art direction",
        value: "Cartoon",
      },
      {
        label: "A carefully crafted pixel-art style",
        value: "Pixel",
      },
      {
        label: "Anime aesthetics and vibrant characters",
        value: "Anime",
      },
    ],
  },
  {
    question: "How important is it to feel your character getting stronger?",
    options: [
      {
        label: "I want to constantly improve my character and equipment",
        value: "Evet çok isterim",
      },
      {
        label: "A moderate sense of progression is enough",
        value: "Biraz olsun",
      },
      {
        label: "Progression isn't necessary if the gameplay is strong",
        value: "Gerek yok",
      },
    ],
  },
  {
    question: "What kind of game length are you looking for?",
    options: [
      {
        label: "A short game that feels satisfying",
        value: "Kısa",
      },
      {
        label: "A reasonably long experience",
        value: "Orta uzunlukta",
      },
      {
        label: "A world I can live in for a long time",
        value: "Çok uzun",
      },
      {
        label: "Something endlessly replayable",
        value: "Sonsuz oynanabilir",
      },
    ],
  },
  {
    question: "How does getting behind the wheel sound today?",
    options: [
      {
        label: "Cars and speed are exactly what I want",
        value: "Evet",
      },
      {
        label: "It would be fun, but it isn't necessary",
        value: "Biraz",
      },
      {
        label: "I don't want a vehicle-focused game today",
        value: "Hayır",
      },
    ],
  },
  {
    question: "How ready are you to enter dark corridors?",
    options: [
      {
        label: "I'm specifically looking for horror and tension",
        value: "Çok severim",
      },
      {
        label: "A moderate amount of tension would be nice",
        value: "Bazen oynarım",
      },
      {
        label: "I don't want to deal with horror today",
        value: "Sevmem",
      },
    ],
  },
  {
    question: "How much do planning and tactical decisions appeal to you?",
    options: [
      {
        label: "A game feels incomplete without tactical thinking",
        value: "Evet",
      },
      {
        label: "Some strategy is good, as long as it isn't overwhelming",
        value: "Biraz",
      },
      {
        label: "I don't want to exhaust myself with plans today",
        value: "Hayır",
      },
    ],
  },
  {
    question: "How would you like to feel when you close the game?",
    options: [
      {
        label: "Relaxed and refreshed",
        value: "Rahatlatmalı",
      },
      {
        label: "Like I overcame a difficult challenge",
        value: "Zorlamalı",
      },
      {
        label: "Entertained, but also properly challenged",
        value: "İkisi dengeli olmalı",
      },
    ],
  },
  {
    question: "Which atmosphere would you like to lose yourself in today?",
    options: [
      {
        label: "Fantasy worlds and mythological lands",
        value: "Fantastik",
      },
      {
        label: "Science-fiction and advanced technology",
        value: "Bilim kurgu",
      },
      {
        label: "A realistic and modern world",
        value: "Gerçekçi",
      },
      {
        label: "A dark, bleak and harsh atmosphere",
        value: "Karanlık",
      },
    ],
  },
  {
    question: "What is the main reason you want to play today?",
    options: [
      {
        label: "To relieve the stress of the day",
        value: "Stres atmak",
      },
      {
        label: "To find a serious challenge",
        value: "Meydan okuma",
      },
      {
        label: "To experience an unforgettable story",
        value: "Hikâye yaşamak",
      },
      {
        label: "To have fun with friends",
        value: "Sosyalleşmek",
      },
    ],
  },
  {
    question: "How much time can you realistically spend on this session?",
    options: [
      {
        label: "I only have up to half an hour",
        value: "30 dakika",
      },
      {
        label: "I can comfortably play for one or two hours",
        value: "1-2 saat",
      },
      {
        label: "I have the whole evening",
        value: "Tüm akşam",
      },
      {
        label: "I have no time limit today",
        value: "Zaman sınırsız",
      },
    ],
  },
  {
    question: "What do you do if you lose at the same place several times?",
    options: [
      {
        label: "I switch to another game before getting frustrated",
        value: "Çabuk vazgeçerim",
      },
      {
        label: "I try a few more times, then decide",
        value: "Birkaç kez denerim",
      },
      {
        label: "I learn from my mistakes and continue",
        value: "Öğrenerek ilerlerim",
      },
      {
        label: "I'll try fifty times if necessary",
        value: "Asla vazgeçmem",
      },
    ],
  },
  {
    question: "How would you feel if the map didn't guide you?",
    options: [
      {
        label: "Great. Getting lost is part of exploration",
        value: "Kaybolmayı severim",
      },
      {
        label: "Some freedom is good, but I still want hints",
        value: "Dengeli keşif",
      },
      {
        label: "I want to know exactly where to go",
        value: "Yönlendirme isterim",
      },
      {
        label: "A straightforward path would be better today",
        value: "Çizgisel ilerleme",
      },
    ],
  },
  {
    question: "What do you think about chests, rare items and lots of equipment?",
    options: [
      {
        label: "Finding new items is the best part of a game",
        value: "Loot vazgeçilmez",
      },
      {
        label: "A balanced amount of loot improves progression",
        value: "Loot dengeli",
      },
      {
        label: "Managing too many items is exhausting",
        value: "Az loot",
      },
      {
        label: "I want to continue without dealing with loot",
        value: "Loot istemem",
      },
    ],
  },
  {
    question: "How much do you enjoy creating your own character?",
    options: [
      {
        label: "I can spend hours customizing everything",
        value: "Detaylı karakter",
      },
      {
        label: "I want to make a few important choices",
        value: "Temel karakter",
      },
      {
        label: "I prefer a predefined and powerful protagonist",
        value: "Hazır karakter",
      },
    ],
  },
  {
    question: "How important is it for your decisions to change the story?",
    options: [
      {
        label: "My choices should change the world and the ending",
        value: "Kararlar çok önemli",
      },
      {
        label: "A few meaningful consequences are enough",
        value: "Kararlar biraz önemli",
      },
      {
        label: "A single well-written story is enough for me",
        value: "Sabit hikâye",
      },
    ],
  },
  {
    question: "How do large boss battles make you feel?",
    options: [
      {
        label: "Boss battles are the highlight of a game",
        value: "Boss severim",
      },
      {
        label: "A few memorable and balanced bosses are enough",
        value: "Boss dengeli",
      },
      {
        label: "Long boss fights quickly become exhausting",
        value: "Boss az olsun",
      },
      {
        label: "I prefer smooth progression instead of bosses",
        value: "Boss istemem",
      },
    ],
  },
  {
    question: "There is a main quest and a distant question mark. Which one do you choose?",
    options: [
      {
        label: "The question mark. I need to know what's there",
        value: "Keşif öncelikli",
      },
      {
        label: "I balance both depending on my route",
        value: "Keşif görev dengeli",
      },
      {
        label: "I complete the main quest first",
        value: "Görev öncelikli",
      },
      {
        label: "Give me a clear route and I'll follow it",
        value: "Rota odaklı",
      },
    ],
  },
  {
    question: "What do you do when a game presents you with long conversations?",
    options: [
      {
        label: "I listen to every sentence and learn about the characters",
        value: "Diyalog severim",
      },
      {
        label: "I follow the important scenes",
        value: "Diyalog dengeli",
      },
      {
        label: "Short conversations are enough. Let's get back to gameplay",
        value: "Az diyalog",
      },
      {
        label: "Where is the skip button?",
        value: "Diyalog istemem",
      },
    ],
  },
  {
    question: "How do you react when puzzles interrupt the flow of the game?",
    options: [
      {
        label: "I won't stop until I solve them",
        value: "Bulmaca severim",
      },
      {
        label: "A balanced amount makes the world more interesting",
        value: "Bulmaca dengeli",
      },
      {
        label: "They should be simple and not interrupt the pace",
        value: "Kolay bulmaca",
      },
      {
        label: "I prefer direct action instead of puzzles",
        value: "Bulmaca istemem",
      },
    ],
  },
  {
    question: "How do you feel about building, managing or expanding something?",
    options: [
      {
        label: "Creating my own system is the main attraction",
        value: "Kurmayı severim",
      },
      {
        label: "I enjoy it as a secondary mechanic",
        value: "Kurma dengeli",
      },
      {
        label: "I prefer progressing through an existing system",
        value: "Kurma az olsun",
      },
      {
        label: "Keep management screens away from me today",
        value: "Kurma istemem",
      },
    ],
  },
  {
    question: "How competitive do you want today's session to be?",
    options: [
      {
        label: "I want rankings, victories and serious competition",
        value: "Yoğun rekabet",
      },
      {
        label: "A little competition keeps the game exciting",
        value: "Hafif rekabet",
      },
      {
        label: "Let's play together without stressing each other",
        value: "İş birliği",
      },
      {
        label: "I want to stay completely in my own world today",
        value: "Rekabet istemem",
      },
    ],
  },
  {
    question: "Which option best describes your current energy?",
    options: [
      {
        label: "I can't sit still. I need something fast",
        value: "Enerjim yüksek",
      },
      {
        label: "I'm ready for something balanced",
        value: "Enerjim dengeli",
      },
      {
        label: "I'm tired. I want the game to carry me",
        value: "Enerjim düşük",
      },
      {
        label: "My mind is clear. I can think carefully",
        value: "Zihnim açık",
      },
    ],
  },
  {
    question: "Which sentence would you like to say at the end of this session?",
    options: [
      {
        label: "That was a great way to clear my mind",
        value: "Kafa dağıttım",
      },
      {
        label: "I won't forget this story for a long time",
        value: "Hikâyeye kapıldım",
      },
      {
        label: "I finally overcame that challenge",
        value: "Mücadeleyi aştım",
      },
      {
        label: "I can't stop without playing one more round",
        value: "Bir tur daha",
      },
    ],
  },
];
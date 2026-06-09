import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { games } from "../data/game";

const questions = [
  {
    question: "Hangi platformda oynuyorsun?",
    options: ["PC", "PlayStation", "Xbox", "Mobil", "Nintendo Switch"],
  },
  {
    question: "En sevdiğin oyun türü hangisi?",
    options: ["RPG", "FPS", "Yarış", "Strateji", "Korku"],
  },
  {
    question: "Hikaye senin için önemli mi?",
    options: ["Çok önemli", "Biraz önemli", "Önemli değil"],
  },
  {
    question: "Oyunda nasıl bir tempo seversin?",
    options: ["Hızlı ve aksiyonlu", "Yavaş ve taktiksel", "Rahatlatıcı", "Gerilimli"],
  },
  {
    question: "Tek başına mı oynamayı seversin?",
    options: ["Tek kişilik", "Arkadaşlarla", "Online rekabetçi", "Fark etmez"],
  },
  {
    question: "Oyun dünyası nasıl olsun?",
    options: ["Açık dünya", "Bölüm bölüm ilerleyen", "Lineer hikaye", "Sandbox"],
  },
  {
    question: "Zorluk seviyesi nasıl olsun?",
    options: ["Kolay", "Orta", "Zor", "Çok zor"],
  },
  {
    question: "Grafik tarzı olarak hangisini seversin?",
    options: ["Gerçekçi", "Cartoon", "Pixel art", "Anime tarzı"],
  },
  {
    question: "Oyunda karakter geliştirme ister misin?",
    options: ["Evet çok isterim", "Biraz olsun", "Gerek yok"],
  },
  {
    question: "Ne kadar uzun bir oyun istiyorsun?",
    options: ["Kısa", "Orta uzunlukta", "Çok uzun", "Sonsuz oynanabilir"],
  },
  {
    question: "Araç kullanma veya yarış ilgini çeker mi?",
    options: ["Evet", "Biraz", "Hayır"],
  },
  {
    question: "Korku oyunlarına yaklaşımın nasıl?",
    options: ["Çok severim", "Bazen oynarım", "Sevmem"],
  },
  {
    question: "Strateji kurmayı sever misin?",
    options: ["Evet", "Biraz", "Hayır"],
  },
  {
    question: "Oyun seni rahatlatmalı mı zorlamalı mı?",
    options: ["Rahatlatmalı", "Zorlamalı", "İkisi dengeli olmalı"],
  },
  {
    question: "Daha çok hangi atmosfer hoşuna gider?",
    options: ["Fantastik", "Bilim kurgu", "Gerçekçi", "Karanlık"],
  },
];

type Answer = {
  questionIndex: number;
  answer: string;
};

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  function getRecommendation() {
    const scoredGames = games.map((game) => {
      let score = 0;

      answers.forEach((item) => {
        const q = item.questionIndex;
        const a = item.answer;

        if (q === 0 && game.platforms.includes(a)) score += 5;
        if (q === 1 && game.genres.includes(a)) score += 6;
        if (q === 2 && game.storyImportance.includes(a)) score += 4;
        if (q === 3 && game.tempo.includes(a)) score += 4;
        if (q === 4 && game.playStyle.includes(a)) score += 4;
        if (q === 5 && game.worldType.includes(a)) score += 4;
        if (q === 6 && game.difficulty.includes(a)) score += 3;
        if (q === 7 && game.graphics.includes(a)) score += 3;
        if (q === 8 && game.characterProgression.includes(a)) score += 4;
        if (q === 9 && game.length.includes(a)) score += 3;
        if (q === 10 && game.vehicleInterest.includes(a)) score += 5;
        if (q === 11 && game.horrorInterest.includes(a)) score += 5;
        if (q === 12 && game.strategyInterest.includes(a)) score += 5;
        if (q === 13 && game.challengeStyle.includes(a)) score += 3;
        if (q === 14 && game.atmosphere.includes(a)) score += 4;
      });

      return {
        ...game,
        score,
      };
    });

    return scoredGames.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  function answerQuestion(option: string) {
    setAnswers([...answers, { questionIndex: questionIndex, answer: option }]);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.title}>Sonuç Hazır!</Text>

        <Text style={styles.question}>Sana Önerilen Oyunlar:</Text>

        {getRecommendation().map((game) => (
          <View key={game.id} style={styles.gameCard}>
            {game.image && (
              <Image source={game.image} style={styles.gameImage} />
            )}

            <Text style={styles.gameTitle}>🎮 {game.title}</Text>

            <Text style={styles.gameStory}>{game.story}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setStarted(false);
            setQuestionIndex(0);
            setAnswers([]);
            setFinished(false);
          }}
        >
          <Text style={styles.buttonText}>Tekrar Başla</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (!started) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hangi Oyunu Oynamalıyım?</Text>

        <TouchableOpacity style={styles.button} onPress={() => setStarted(true)}>
          <Text style={styles.buttonText}>Teste Başla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Soru {questionIndex + 1} / {questions.length}
      </Text>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionButton}
          onPress={() => answerQuestion(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  resultContainer: {
    flexGrow: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  counter: {
    color: "#aaa",
    marginBottom: 20,
  },

  question: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  optionButton: {
    backgroundColor: "#1f1f1f",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },

  optionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },

  gameCard: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 14,
    width: "100%",
    maxWidth: 420,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },

  gameImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },

  gameTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  gameStory: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
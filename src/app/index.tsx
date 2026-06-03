import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    const scores = {
      rpg: 0,
      fps: 0,
      racing: 0,
      horror: 0,
      strategy: 0,
      casual: 0,
    };

    answers.forEach((item) => {
      const q = item.questionIndex;
      const a = item.answer;

      if (q === 1) {
        if (a === "RPG") scores.rpg += 5;
        if (a === "FPS") scores.fps += 5;
        if (a === "Yarış") scores.racing += 5;
        if (a === "Strateji") scores.strategy += 5;
        if (a === "Korku") scores.horror += 5;
      }

      if (q === 2) {
        if (a === "Çok önemli") scores.rpg += 3;
        if (a === "Biraz önemli") scores.rpg += 1;
        if (a === "Önemli değil") scores.fps += 1;
      }

      if (q === 3) {
        if (a === "Hızlı ve aksiyonlu") scores.fps += 3;
        if (a === "Yavaş ve taktiksel") scores.strategy += 3;
        if (a === "Rahatlatıcı") scores.casual += 3;
        if (a === "Gerilimli") scores.horror += 3;
      }

      if (q === 4) {
        if (a === "Tek kişilik") scores.rpg += 2;
        if (a === "Arkadaşlarla") scores.casual += 2;
        if (a === "Online rekabetçi") scores.fps += 4;
      }

      if (q === 5) {
        if (a === "Açık dünya") scores.rpg += 3;
        if (a === "Sandbox") scores.casual += 3;
        if (a === "Lineer hikaye") scores.rpg += 2;
      }

      if (q === 6) {
        if (a === "Kolay") scores.casual += 2;
        if (a === "Zor") scores.strategy += 2;
        if (a === "Çok zor") scores.horror += 1;
      }

      if (q === 8) {
        if (a === "Evet çok isterim") scores.rpg += 3;
        if (a === "Biraz olsun") scores.rpg += 1;
      }

      if (q === 10) {
        if (a === "Evet") scores.racing += 5;
        if (a === "Biraz") scores.racing += 2;
      }

      if (q === 11) {
        if (a === "Çok severim") scores.horror += 5;
        if (a === "Bazen oynarım") scores.horror += 2;
      }

      if (q === 12) {
        if (a === "Evet") scores.strategy += 5;
        if (a === "Biraz") scores.strategy += 2;
      }

      if (q === 13) {
        if (a === "Rahatlatmalı") scores.casual += 4;
        if (a === "Zorlamalı") scores.strategy += 2;
        if (a === "İkisi dengeli olmalı") scores.rpg += 2;
      }

      if (q === 14) {
        if (a === "Fantastik") scores.rpg += 4;
        if (a === "Bilim kurgu") scores.fps += 2;
        if (a === "Gerçekçi") scores.racing += 2;
        if (a === "Karanlık") scores.horror += 3;
      }
    });

    const bestCategory = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    if (bestCategory === "rpg") {
      return ["Baldur's Gate 3", "The Witcher 3", "Skyrim"];
    }

    if (bestCategory === "fps") {
      return ["Valorant", "Call of Duty", "Apex Legends"];
    }

    if (bestCategory === "racing") {
      return ["Forza Horizon 5", "Need for Speed Heat", "BeamNG.drive"];
    }

    if (bestCategory === "horror") {
      return ["Resident Evil 4", "Outlast", "Amnesia"];
    }

    if (bestCategory === "strategy") {
      return ["Age of Empires 4", "Civilization VI", "Total War"];
    }

    return ["Minecraft", "Stardew Valley", "Among Us"];
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
      <View style={styles.container}>
        <Text style={styles.title}>Sonuç Hazır!</Text>

        <Text style={styles.question}>Sana Önerilen Oyunlar:</Text>

        {getRecommendation().map((game) => (
          <Text key={game} style={styles.optionText}>
            🎮 {game}
          </Text>
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
      </View>
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
});

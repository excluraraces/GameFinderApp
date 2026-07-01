import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { games, type Game } from "../data/game";
import { questions, type QuestionOption } from "../data/questions";

type Answer = {
  questionIndex: number;
  label: string;
  value: string;
};

type ScoredGame = Game & {
  score: number;
  reasons: string[];
};

const MAX_SCORE = 62;

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  function getSelectedPlatform() {
    const platformAnswer = answers.find((item) => item.questionIndex === 0);
    return platformAnswer?.value;
  }

  function isPlatformCompatible(game: Game) {
    const selectedPlatform = getSelectedPlatform();

    if (!selectedPlatform || selectedPlatform === "Fark etmez") {
      return true;
    }

    return game.platforms.includes(selectedPlatform);
  }

  function getRecommendation() {
    const scoredGames: ScoredGame[] = games
      .filter((game) => isPlatformCompatible(game))
      .map((game) => {
        let score = 0;
        const reasons: string[] = [];

        answers.forEach((item) => {
          const q = item.questionIndex;
          const a = item.value;

          if (q === 0 && game.platforms.includes(a)) {
            score += 5;
            reasons.push(`${a} platformunda oynanabiliyor`);
          }

          if (q === 1 && game.genres.includes(a)) {
            score += 6;
            reasons.push(`${a} türü tercihinle uyumlu`);
          }

          if (q === 2 && game.storyImportance.includes(a)) {
            score += 4;
            reasons.push("Hikaye beklentine uygun");
          }

          if (q === 3 && game.tempo.includes(a)) {
            score += 4;
            reasons.push("Tempo tercihinle eşleşiyor");
          }

          if (q === 4 && game.playStyle.includes(a)) {
            score += 4;
            reasons.push("Oynama tarzına uygun");
          }

          if (q === 4 && a === "Fark etmez") {
            score += 2;
          }

          if (q === 5 && game.worldType.includes(a)) {
            score += 4;
            reasons.push("Dünya yapısı seçimine uyuyor");
          }

          if (q === 6 && game.difficulty.includes(a)) {
            score += 3;
            reasons.push("Zorluk tercihinle uyumlu");
          }

          if (q === 7 && game.graphics.includes(a)) {
            score += 3;
            reasons.push("Görsel tarz seçimine uygun");
          }

          if (q === 8 && game.characterProgression.includes(a)) {
            score += 4;
            reasons.push("Karakter gelişimi beklentine uygun");
          }

          if (q === 9 && game.length.includes(a)) {
            score += 3;
            reasons.push("Oyun süresi tercihinle uyumlu");
          }

          if (q === 10 && game.vehicleInterest.includes(a)) {
            score += 5;
            reasons.push("Araç ilgine uygun");
          }

          if (q === 11 && game.horrorInterest.includes(a)) {
            score += 5;
            reasons.push("Korku tercihinle uyumlu");
          }

          if (q === 12 && game.strategyInterest.includes(a)) {
            score += 5;
            reasons.push("Strateji ilgine uygun");
          }

          if (q === 13 && game.challengeStyle.includes(a)) {
            score += 3;
            reasons.push("Meydan okuma tarzına uygun");
          }

          if (q === 14 && game.atmosphere.includes(a)) {
            score += 4;
            reasons.push("Atmosfer seçiminle uyumlu");
          }
        });

        return {
          ...game,
          score,
          reasons,
        };
      });

    return scoredGames
      .filter((game) => game.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  function getMatchPercent(score: number) {
    return Math.min(100, Math.round((score / MAX_SCORE) * 100));
  }

  function answerQuestion(option: QuestionOption) {
    setAnswers([
      ...answers,
      {
        questionIndex,
        label: option.label,
        value: option.value,
      },
    ]);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setFinished(true);
    }
  }

  function goBack() {
    if (questionIndex === 0) {
      setStarted(false);
      setAnswers([]);
      return;
    }

    setAnswers((prevAnswers) =>
      prevAnswers.filter((item) => item.questionIndex !== questionIndex - 1)
    );

    setQuestionIndex((prevIndex) => prevIndex - 1);
  }

  function restartApp() {
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
  }

  if (!started) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bugün Ne Oynasam?</Text>

        <Text style={styles.subtitle}>
          Oyun zevkine göre birkaç soruya cevap ver, sana en uygun oyunları
          önerelim.
        </Text>

        <Text style={styles.infoText}>15 soru • 1 dakika • 10 oyun önerisi</Text>

        <TouchableOpacity style={styles.button} onPress={() => setStarted(true)}>
          <Text style={styles.buttonText}>Teste Başla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (finished) {
    const recommendedGames = getRecommendation();
    const selectedPlatform = getSelectedPlatform();

    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.title}>Sonuç Hazır!</Text>

        <Text style={styles.resultSubtitle}>Sana Önerilen Oyunlar</Text>

        {selectedPlatform && selectedPlatform !== "Fark etmez" && (
          <Text style={styles.platformFilterText}>
            Platform filtresi: {selectedPlatform}
          </Text>
        )}

        {recommendedGames.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Uygun oyun bulunamadı</Text>

            <Text style={styles.emptyText}>
              Seçtiğin platform ve cevaplara tam uyan oyun bulamadık. Oyun
              havuzuna daha fazla oyun ekledikçe bu sonuçlar güçlenecek.
            </Text>
          </View>
        )}

        {recommendedGames.map((game, index) => {
          const matchPercent = getMatchPercent(game.score);
          const visibleReasons = game.reasons.slice(0, 3);

          return (
            <View key={game.id} style={styles.gameCard}>
              {game.image && (
                <Image source={game.image} style={styles.gameImage} />
              )}

              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.gameTitle}>🎮 {game.title}</Text>
                </View>

                <View style={styles.matchBadge}>
                  <Text style={styles.matchBadgeText}>%{matchPercent}</Text>
                </View>
              </View>

              <Text style={styles.matchText}>Oyun zevkine uyumlu</Text>

              <View style={styles.tagContainer}>
                {game.genres.slice(0, 2).map((genre) => (
                  <Text key={genre} style={styles.tag}>
                    {genre}
                  </Text>
                ))}

                {game.worldType?.[0] && (
                  <Text style={styles.tag}>{game.worldType[0]}</Text>
                )}

                {game.atmosphere?.[0] && (
                  <Text style={styles.tag}>{game.atmosphere[0]}</Text>
                )}
              </View>

              <Text style={styles.platformText}>
                {game.platforms.join(" • ")}
              </Text>

              <Text style={styles.gameStory}>
                {game.story || "Bu oyun cevaplarına göre önerildi."}
              </Text>

              {visibleReasons.length > 0 && (
                <View style={styles.reasonBox}>
                  <Text style={styles.reasonTitle}>Neden önerildi?</Text>

                  {visibleReasons.map((reason) => (
                    <Text key={reason} style={styles.reasonText}>
                      • {reason}
                    </Text>
                  ))}
                </View>
              )}

              <Text style={styles.scoreText}>Uyum puanı: {game.score}</Text>
            </View>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={restartApp}>
          <Text style={styles.buttonText}>Tekrar Başla</Text>
        </TouchableOpacity>
      </ScrollView>
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
          key={option.label}
          style={styles.optionButton}
          onPress={() => answerQuestion(option)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>
          {questionIndex === 0 ? "Ana ekrana dön" : "Önceki soru"}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },

  subtitle: {
    color: "#cfcfcf",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 23,
    maxWidth: 360,
  },

  infoText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },

  resultSubtitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  platformFilterText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },

  counter: {
    color: "#aaa",
    marginBottom: 20,
    fontSize: 16,
  },

  question: {
    fontSize: 25,
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
    fontSize: 17,
    textAlign: "center",
    lineHeight: 23,
  },

  backButton: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  backButtonText: {
    color: "#aaa",
    fontSize: 15,
    fontWeight: "600",
  },

  emptyBox: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 16,
    width: "100%",
    maxWidth: 430,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },

  emptyTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  gameCard: {
    backgroundColor: "#1f1f1f",
    padding: 14,
    borderRadius: 16,
    width: "100%",
    maxWidth: 430,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#333",
  },

  gameImage: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    marginBottom: 14,
    resizeMode: "cover",
  },

  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },

  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  rankText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  gameTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },

  matchBadge: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  matchBadgeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  matchText: {
    color: "#9ae6b4",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  tag: {
    color: "#e5e5e5",
    backgroundColor: "#2a2a2a",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "600",
  },

  platformText: {
    color: "#a3a3a3",
    fontSize: 13,
    marginBottom: 12,
  },

  gameStory: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 20,
  },

  reasonBox: {
    backgroundColor: "#181818",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#2b2b2b",
  },

  reasonTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  reasonText: {
    color: "#cfcfcf",
    fontSize: 13,
    lineHeight: 20,
  },

  scoreText: {
    color: "#4CAF50",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
  },
});
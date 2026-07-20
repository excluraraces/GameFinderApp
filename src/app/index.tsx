import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
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
  const [showSplash, setShowSplash] = useState(true);
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];
  useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);

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
  function getPlayerProfile() {
  const values = answers.map((a) => a.value);

  if (
    values.includes("RPG") ||
    values.includes("Çok önemli") ||
    values.includes("Açık dünya")
  ) {
    return [
      "🎭 Hikaye Sevdalısı",
      "🗺️ Açık Dünya Kaşifi",
      "⚔️ RPG Ustası",
    ];
  }

  if (
    values.includes("FPS") ||
    values.includes("Online rekabetçi")
  ) {
    return [
      "🎯 Rekabetçi Oyuncu",
      "🔫 FPS Tutkunu",
      "🏆 Kazanmayı Sever",
    ];
  }

  if (
    values.includes("Strateji") ||
    values.includes("Yavaş ve taktiksel")
  ) {
    return [
      "♟️ Taktik Ustası",
      "🧠 Stratejist",
      "📋 Planlamayı Sever",
    ];
  }

  if (
    values.includes("Korku") ||
    values.includes("Çok severim")
  ) {
    return [
      "👻 Korkusuz Oyuncu",
      "🌑 Gerilim Avcısı",
      "🎬 Atmosfer Tutkunu",
    ];
  }

  return [
    "🎮 Çok Yönlü Oyuncu",
    "✨ Yeni Deneyimlere Açık",
    "🚀 Oyun Kaşifi",
  ];
}
  if (showSplash) {
    return (
      <ImageBackground
        source={require("../../assets/images/game-background.png")}
        resizeMode="cover"
        style={styles.splashContainer}
      >
        <View style={styles.splashOverlay}>
          <View style={styles.splashBadge}>
            <Text style={styles.splashBadgeText}>Exclura Studio</Text>
          </View>

          <Text style={styles.splashTitle}>Oyununu Bul</Text>

          <Text style={styles.splashSubtitle}>
            Oyun zevkine en uygun önerileri hazırlıyoruz.
          </Text>

          <View style={styles.loadingDotsContainer}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (!started) {
    return (
      <ImageBackground
        source={require("../../assets/images/game-background.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <Text style={styles.title}>Bugün Ne Oynasam?</Text>

        <Text style={styles.subtitle}>
          Oyun zevkine göre birkaç soruya cevap ver, sana en uygun oyunları
          önerelim.
        </Text>

        <Text style={styles.infoText}>
          15 soru • 1 dakika • 10 oyun önerisi
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setStarted(true)}
        >
          <Text style={styles.buttonText}>Teste Başla</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  if (finished) {
    const recommendedGames = getRecommendation();
    const selectedPlatform = getSelectedPlatform();
    const playerProfile = getPlayerProfile();

    return (
  <ImageBackground
    source={require("../../assets/images/game-background.png")}
    resizeMode="cover"
    style={styles.resultBackground}
  >
      <ScrollView contentContainerStyle={styles.resultContainer}>
  <Text style={styles.title}>Sonuç Hazır!</Text>

  <View style={styles.profileCard}>
    <Text style={styles.profileTitle}>
      OYUNCU PROFİLİN
    </Text>

    {playerProfile.map((item) => (
      <Text key={item} style={styles.profileText}>
        {item}
      </Text>
    ))}
  </View>

  <Text style={styles.resultSubtitle}>
    Sana Önerilen Oyunlar
  </Text>

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


            </View>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={restartApp}>
          <Text style={styles.buttonText}>Tekrar Başla</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/game-background.png")}
      resizeMode="cover"
      style={styles.container}
    >
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
    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  resultBackground: {
    flex: 1,
    width: "100%",
  },

  splashContainer: {
    flex: 1,
    width: "100%",
  },

  splashOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(3, 8, 20, 0.42)",
  },

splashBadge: {
  backgroundColor: "#1f1f1f",
  borderWidth: 1,
  borderColor: "#333",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 999,
  marginBottom: 24,
},

splashBadgeText: {
  color: "#9ae6b4",
  fontSize: 14,
  fontWeight: "700",
  letterSpacing: 0.5,
},

splashTitle: {
  color: "white",
  fontSize: 34,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 12,
},

splashSubtitle: {
  color: "#cfcfcf",
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
  maxWidth: 300,
  marginBottom: 30,
},

loadingDotsContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
},

loadingDot: {
  width: 10,
  height: 10,
  borderRadius: 999,
  backgroundColor: "#4CAF50",
},
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  resultContainer: {
    flexGrow: 1,
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
  backgroundColor: "#22C55E",
  paddingVertical: 16,
  paddingHorizontal: 44,
  borderRadius: 16,
  marginTop: 10,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.24)",
  shadowColor: "#22C55E",
  shadowOpacity: 0.35,
  shadowRadius: 14,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  elevation: 8,
},

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  optionButton: {
  backgroundColor: "rgba(10, 18, 35, 0.88)",
  paddingVertical: 16,
  paddingHorizontal: 18,
  borderRadius: 16,
  width: "100%",
  maxWidth: 400,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  elevation: 4,
  },

  optionText: {
  color: "white",
  fontSize: 17,
  fontWeight: "600",
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
  backgroundColor: "rgba(10, 18, 35, 0.92)",
  padding: 16,
  borderRadius: 22,
  width: "100%",
  maxWidth: 430,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.12)",
  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 18,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 8,
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
  width: 32,
  height: 32,
  borderRadius: 999,
  backgroundColor: "rgba(255,255,255,0.10)",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.14)",
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
  backgroundColor: "#22C55E",
  paddingVertical: 7,
  paddingHorizontal: 12,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.22)",
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
  color: "#E5E7EB",
  backgroundColor: "rgba(255,255,255,0.08)",
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 999,
  fontSize: 12,
  fontWeight: "600",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
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
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: 14,
  padding: 13,
  marginTop: 14,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
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
  color: "#34D399",
  fontSize: 13,
  fontWeight: "bold",
  marginTop: 14,
},
profileCard: {
  width: "100%",
  maxWidth: 430,
  backgroundColor: "rgba(10,18,35,0.92)",
  borderRadius: 20,
  padding: 18,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
},

profileTitle: {
  color: "#34D399",
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 12,
  textAlign: "center",
},

profileText: {
  color: "white",
  fontSize: 15,
  marginBottom: 8,
  textAlign: "center",
  fontWeight: "600",
},
});
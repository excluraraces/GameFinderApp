import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  gamesByLanguage,
  questionDataByLanguage,
  translations,
} from "../data";
import type { Category, Game } from "../data/game";
import type {
  HardFilterField,
  Question,
  QuestionOption,
  ScoreField,
} from "../data/questions";

type Language = "tr" | "en";

type Answer = {
  questionId: string;
  label: string;
  value: string;
  kind: "hardFilter" | "preference";
  filterField?: HardFilterField;
  scoreField?: ScoreField;
  weight?: number;
  matchValues?: string[];
};

type ScoredGame = Game & {
  score: number;
  reasons: string[];
};

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState<Language | null>(null);
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const questionTranslateX = useRef(new Animated.Value(0)).current;

  const t = language ? translations[language] : translations.tr;

  const activeGames = language
    ? gamesByLanguage[language]
    : gamesByLanguage.tr;

  const questionData = language
    ? questionDataByLanguage[language]
    : questionDataByLanguage.tr;

  const selectedCategory = answers.find(
    (answer) => answer.questionId === "category"
  )?.value as Category | undefined;

  const activeQuestions: Question[] = selectedCategory
    ? [
        ...questionData.hardFilters,
        ...questionData.categoryBooks[selectedCategory],
        ...questionData.commonPreferences,
      ]
    : [...questionData.hardFilters];

  const currentQuestion = activeQuestions[questionIndex];

  const maxPreferenceScore = activeQuestions
    .filter((question) => question.kind === "preference")
    .reduce((total, question) => total + (question.weight ?? 1), 0);

  function translateGameTag(value: string) {
    const gameTags =
      ("gameTags" in t ? t.gameTags : {}) as Record<string, string>;

    return gameTags[value] ?? value;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  function getAnswerValue(questionId: string) {
    return answers.find((answer) => answer.questionId === questionId)?.value;
  }

  function getSelectedPlatform() {
    return getAnswerValue("platform");
  }

  function getSelectedCategory() {
    return getAnswerValue("category");
  }

  function getSelectedPlayMode() {
    return getAnswerValue("playMode");
  }

  function passesHardFilters(game: Game) {
    const platform = getSelectedPlatform();
    const category = getSelectedCategory();
    const playMode = getSelectedPlayMode();

    if (platform && !game.platforms.includes(platform as any)) {
      return false;
    }

    if (category && !game.categories.includes(category as Category)) {
      return false;
    }

    if (
      playMode &&
      playMode !== "Fark etmez" &&
      !game.playModes.includes(playMode as any)
    ) {
      return false;
    }

    return true;
  }

  function getReasonForMatch(scoreField: ScoreField, value: string) {
    switch (scoreField) {
      case "storyImportance":
        return t.reasons.story;
      case "tempo":
        return t.reasons.tempo;
      case "worldType":
        return t.reasons.worldType;
      case "difficulty":
        return t.reasons.difficulty;
      case "graphics":
        return t.reasons.graphics;
      case "characterProgression":
        return t.reasons.progression;
      case "length":
        return t.reasons.length;
      case "challengeStyle":
        return t.reasons.challenge;
      case "atmosphere":
        return t.reasons.atmosphere;
      case "features":
        return t.reasons.preference(translateGameTag(value));
      default:
        return t.reasons.preference(translateGameTag(value));
    }
  }

  function getRecommendation() {
    const scoredGames: ScoredGame[] = activeGames
      .filter((game) => passesHardFilters(game))
      .map((game) => {
        let score = 0;
        const reasons: string[] = [];

        answers
          .filter((answer) => answer.kind === "preference" && answer.scoreField)
          .forEach((answer) => {
            const scoreField = answer.scoreField!;
            const gameValues = game[scoreField] as string[];
            const wantedValues =
              answer.matchValues && answer.matchValues.length > 0
                ? answer.matchValues
                : [answer.value];

            const matches = wantedValues.some((value) =>
              gameValues.includes(value)
            );

            if (matches) {
              score += answer.weight ?? 1;
              reasons.push(getReasonForMatch(scoreField, answer.value));
            }
          });

        const category = getSelectedCategory();
        const playMode = getSelectedPlayMode();

        if (category) {
          reasons.push(t.reasons.category(translateGameTag(category)));
        }

        if (playMode && playMode !== "Fark etmez") {
          reasons.push(t.reasons.playMode(playMode));
        }

        return {
          ...game,
          score,
          reasons: [...new Set(reasons)],
        };
      });

    return scoredGames
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  function getMatchPercent(score: number) {
    if (maxPreferenceScore <= 0) {
      return 100;
    }

    return Math.min(
      100,
      Math.round((score / maxPreferenceScore) * 100)
    );
  }

  function selectLanguage(languageCode: Language) {
    if (selectedLanguage !== null) {
      return;
    }

    setSelectedLanguage(languageCode);

    setTimeout(() => {
      setLanguage(languageCode);
      setSelectedLanguage(null);
    }, 450);
  }

  function answerQuestion(option: QuestionOption) {
    if (selectedOption !== null || !currentQuestion) {
      return;
    }

    setSelectedOption(option.value);

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      label: option.label,
      value: option.value,
      kind: currentQuestion.kind,
      filterField: currentQuestion.filterField,
      scoreField: currentQuestion.scoreField,
      weight: currentQuestion.weight,
      matchValues: option.matchValues,
    };

    setTimeout(() => {
      Animated.timing(questionTranslateX, {
        toValue: -80,
        duration: 170,
        useNativeDriver: true,
      }).start(() => {
        const nextAnswers = [
          ...answers.filter(
            (answer) => answer.questionId !== currentQuestion.id
          ),
          newAnswer,
        ];

        setAnswers(nextAnswers);

        const categoryAfterAnswer =
          currentQuestion.id === "category"
            ? (option.value as Category)
            : (nextAnswers.find(
                (answer) => answer.questionId === "category"
              )?.value as Category | undefined);

        const questionsAfterAnswer: Question[] = categoryAfterAnswer
          ? [
              ...questionData.hardFilters,
              ...questionData.categoryBooks[categoryAfterAnswer],
              ...questionData.commonPreferences,
            ]
          : [...questionData.hardFilters];

        if (questionIndex < questionsAfterAnswer.length - 1) {
          setQuestionIndex((previousIndex) => previousIndex + 1);
          questionTranslateX.setValue(80);

          Animated.timing(questionTranslateX, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }).start(() => {
            setSelectedOption(null);
          });
        } else {
          setSelectedOption(null);
          setFinished(true);
          questionTranslateX.setValue(0);
        }
      });
    }, 150);
  }

  function goBack() {
    if (selectedOption !== null) {
      return;
    }

    if (questionIndex === 0) {
      setStarted(false);
      setAnswers([]);
      return;
    }

    const previousQuestion = activeQuestions[questionIndex - 1];

    setAnswers((previousAnswers) =>
      previousAnswers.filter(
        (answer) => answer.questionId !== previousQuestion?.id
      )
    );

    setQuestionIndex((previousIndex) => previousIndex - 1);
  }

  function restartApp() {
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedOption(null);
    questionTranslateX.setValue(0);
  }

  function getPlayerProfile() {
    const values = answers.map((answer) => answer.value);

    const profileScores: Record<string, number> = {
      story: 0,
      explorer: 0,
      challenger: 0,
      strategist: 0,
      competitor: 0,
      social: 0,
      collector: 0,
      creator: 0,
      relaxed: 0,
      horror: 0,
      speed: 0,
    };

    const add = (profile: keyof typeof profileScores, amount = 1) => {
      profileScores[profile] += amount;
    };

    values.forEach((value) => {
      if (
        [
          "RPG",
          "Çok önemli",
          "Seçim odaklı hikâye",
          "Yoğun hikâye",
          "Yoğun diyalog",
          "Hikâye kampanyası",
          "Hikâye odaklı",
        ].includes(value)
      ) {
        add("story", 2);
      }

      if (
        [
          "Açık dünya",
          "Sandbox / Yaratıcılık",
          "Sandbox",
          "Keşif",
          "Açık dünya sürüş",
        ].includes(value)
      ) {
        add("explorer", 2);
      }

      if (
        [
          "Zor",
          "Çok zor",
          "Zorlamalı",
          "Yüksek risk",
          "Boss savaşları",
          "Ranked",
        ].includes(value)
      ) {
        add("challenger", 2);
      }

      if (
        [
          "Strateji",
          "Taktiksel çatışma",
          "Taktiksel savaş",
          "Grand strategy",
          "Diplomasi",
          "Taktik",
        ].includes(value)
      ) {
        add("strategist", 2);
      }

      if (
        [
          "FPS / Nişancı",
          "Online rekabetçi",
          "PvP",
          "Ranked",
          "MOBA",
        ].includes(value)
      ) {
        add("competitor", 2);
      }

      if (
        [
          "Arkadaşlarla",
          "Takım koordinasyonu",
          "PvE co-op",
          "Co-op bulmaca",
          "Parti / Sosyal",
        ].includes(value)
      ) {
        add("social", 2);
      }

      if (
        [
          "Loot",
          "Karakter oluşturma",
          "Evet çok isterim",
          "Araç koleksiyonu",
        ].includes(value)
      ) {
        add("collector", 2);
      }

      if (
        [
          "Yönetim / Kurma",
          "Sandbox / Yaratıcılık",
          "Şehir kurma",
          "Base building",
          "Yaratıcılık / özgürlük",
        ].includes(value)
      ) {
        add("creator", 2);
      }

      if (
        [
          "Rahatlatıcı",
          "Rahatlatmalı",
          "Rahat sürüş",
          "Rahatlatıcı görevler",
        ].includes(value)
      ) {
        add("relaxed", 2);
      }

      if (
        [
          "Korku",
          "Psikolojik korku",
          "Survival horror",
          "Gerilim",
          "Kaçış / saklanma",
        ].includes(value)
      ) {
        add("horror", 2);
      }

      if (
        [
          "Yarış",
          "Arcade sürüş",
          "Drift",
          "Online yarış",
          "Hızlı ve aksiyonlu",
        ].includes(value)
      ) {
        add("speed", 2);
      }
    });

    const profileLabels: Record<string, string> = {
      story: t.profiles.story,
      explorer: t.profiles.explorer,
      challenger: t.profiles.challenger,
      strategist: t.profiles.strategist,
      competitor: t.profiles.competitor,
      social: t.profiles.social,
      collector: t.profiles.collector,
      creator: t.profiles.creator,
      relaxed: t.profiles.relaxed,
      horror: t.profiles.horror,
      speed: t.profiles.speed,
    };

    const topProfiles = Object.entries(profileScores)
      .filter(([, score]) => score > 0)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 3)
      .map(([profile]) => profileLabels[profile]);

    return topProfiles.length > 0
      ? topProfiles
      : [
          t.profiles.versatile,
          t.profiles.openToNewExperiences,
          t.profiles.gameExplorer,
        ];
  }

  const isCategoryQuestion = currentQuestion?.id === "category";

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

  if (language === null) {
    return (
      <ImageBackground
        source={require("../../assets/images/game-background.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.languageOverlay}>
          <Text style={styles.languageTitle}>Dilini Seç</Text>
          <Text style={styles.languageSubtitle}>Choose Your Language</Text>

          <View style={styles.languageButtonContainer}>
            <TouchableOpacity
  style={[
    styles.languageButton,
    selectedLanguage === "tr" && styles.selectedLanguageButton,
  ]}
  activeOpacity={0.9}
  disabled={selectedLanguage !== null}
  onPress={() => selectLanguage("tr")}
>
  <Image
    source={require("../../assets/images/flag-tr.png")}
    style={styles.flagImage}
  />

  <Text style={styles.languageButtonText}>Türkçe</Text>

  {selectedLanguage === "tr" && (
    <Text style={styles.selectedLanguageCheck}>✓</Text>
  )}
</TouchableOpacity>

            <TouchableOpacity
  style={[
    styles.languageButton,
    selectedLanguage === "en" && styles.selectedLanguageButton,
  ]}
  activeOpacity={0.9}
  disabled={selectedLanguage !== null}
  onPress={() => selectLanguage("en")}
>
  <Image
    source={require("../../assets/images/flag-en.png")}
    style={styles.flagImage}
  />

  <Text style={styles.languageButtonText}>English</Text>

  {selectedLanguage === "en" && (
    <Text style={styles.selectedLanguageCheck}>✓</Text>
  )}
</TouchableOpacity>
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
        <Text style={styles.title}>{t.appTitle}</Text>

        <Text style={styles.subtitle}>{t.appSubtitle}</Text>

        <Text style={styles.infoText}>{t.quizInfo}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setStarted(true)}
        >
          <Text style={styles.buttonText}>{t.start}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changeLanguageButton}
          onPress={() => setLanguage(null)}
        >
          <Text style={styles.changeLanguageText}>{t.changeLanguage}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  if (finished) {
    const recommendedGames = getRecommendation();
    const selectedPlatform = getSelectedPlatform();
    const selectedCategory = getSelectedCategory();
    const selectedPlayMode = getSelectedPlayMode();
    const playerProfile = getPlayerProfile();

    return (
  <ImageBackground
    source={require("../../assets/images/game-background.png")}
    resizeMode="cover"
    style={styles.resultBackground}
  >
      <ScrollView contentContainerStyle={styles.resultContainer}>
  <Text style={styles.title}>{t.resultReady}</Text>

  <View style={styles.profileCard}>
    <Text style={styles.profileTitle}>{t.playerProfile}</Text>

    {playerProfile.map((item) => (
      <Text key={item} style={styles.profileText}>
        {item}
      </Text>
    ))}
  </View>

  <Text style={styles.resultSubtitle}>{t.resultTitle}</Text>

        <View style={styles.filterSummary}>
          {selectedPlatform && (
            <Text style={styles.platformFilterText}>
              {t.platformFilter}: {selectedPlatform}
            </Text>
          )}

          {selectedCategory && (
            <Text style={styles.platformFilterText}>
              {t.categoryFilter}: {translateGameTag(selectedCategory)}
            </Text>
          )}

          {selectedPlayMode && (
            <Text style={styles.platformFilterText}>
              {t.playModeFilter}: {selectedPlayMode}
            </Text>
          )}
        </View>

        {recommendedGames.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>{t.noResult}</Text>

            <Text style={styles.emptyText}>{t.noResultDescription}</Text>
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

              <Text style={styles.matchText}>{t.compatibility}</Text>

              <View style={styles.tagContainer}>
                {game.categories.slice(0, 2).map((category) => (
                  <Text key={category} style={styles.tag}>
                    {translateGameTag(category)}
                  </Text>
                ))}

                {game.worldType?.[0] && (
                  <Text style={styles.tag}>
                    {translateGameTag(game.worldType[0])}
                  </Text>
                )}

                {game.atmosphere?.[0] && (
                  <Text style={styles.tag}>
                    {translateGameTag(game.atmosphere[0])}
                  </Text>
                )}
              </View>

              <Text style={styles.platformText}>
                {game.platforms.join(" • ")}
              </Text>

              <Text style={styles.gameStory}>
                {game.story || t.defaultGameStory}
              </Text>

              {visibleReasons.length > 0 && (
                <View style={styles.reasonBox}>
                  <Text style={styles.reasonTitle}>{t.recommendationReason}</Text>

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
          <Text style={styles.buttonText}>{t.restart}</Text>
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
      <ScrollView
        style={styles.questionScroll}
        contentContainerStyle={[
          styles.questionScrollContent,
          isCategoryQuestion && styles.categoryQuestionScrollContent,
        ]}
        showsVerticalScrollIndicator={isCategoryQuestion}
      >
        <Animated.View
          style={[
            styles.questionSlideContainer,
            isCategoryQuestion && styles.categoryQuestionSlideContainer,
            {
              transform: [{ translateX: questionTranslateX }],
            },
          ]}
        >
          <Text style={styles.counter}>
            {t.question} {questionIndex + 1} / {activeQuestions.length}
          </Text>

          <Text style={styles.question}>{currentQuestion?.question}</Text>

          <View
            style={[
              styles.optionsContainer,
              isCategoryQuestion && styles.categoryOptionsGrid,
            ]}
          >
            {currentQuestion?.options.map((option) => {
              const isSelected = selectedOption === option.value;

              return (
                <TouchableOpacity
                  key={option.label}
                  style={[
                    styles.optionButton,
                    isCategoryQuestion && styles.categoryOptionButton,
                    isSelected && styles.selectedOptionButton,
                  ]}
                  onPress={() => answerQuestion(option)}
                  activeOpacity={0.9}
                  disabled={selectedOption !== null}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isCategoryQuestion && styles.categoryOptionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isSelected && <Text style={styles.optionCheck}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            disabled={selectedOption !== null}
          >
            <Text style={styles.backButtonText}>
              {questionIndex === 0 ? t.backHome : t.previousQuestion}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  languageOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(3, 8, 20, 0.52)",
  },
  selectedLanguageButton: {
  borderColor: "#22C55E",
  borderWidth: 2,
  backgroundColor: "rgba(34, 197, 94, 0.18)",
  shadowColor: "#22C55E",
  shadowOpacity: 1,
  shadowRadius: 22,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  elevation: 16,
  transform: [{ scale: 1.02 }],
},

selectedLanguageCheck: {
  color: "#4ADE80",
  fontSize: 24,
  fontWeight: "bold",
  marginLeft: "auto",
  textShadowColor: "#22C55E",
  textShadowRadius: 10,
},

  languageTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  languageSubtitle: {
    color: "#cfcfcf",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 34,
  },

  languageButtonContainer: {
    width: "100%",
    maxWidth: 380,
    gap: 14,
  },

  languageButton: {
    width: "100%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10, 18, 35, 0.92)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

 

  languageButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  languageHint: {
    color: "#8f98a8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 18,
  },

  changeLanguageButton: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  changeLanguageText: {
    color: "#cfcfcf",
    fontSize: 14,
    fontWeight: "600",
  },

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

  filterSummary: {
    alignItems: "center",
    marginBottom: 18,
  },

  platformFilterText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },

  questionScroll: {
    flex: 1,
    width: "100%",
  },

  questionScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  categoryQuestionScrollContent: {
    justifyContent: "flex-start",
    paddingTop: 34,
    paddingBottom: 40,
  },

  questionSlideContainer: {
    width: "100%",
    alignItems: "center",
  },

  categoryQuestionSlideContainer: {
    maxWidth: 880,
  },

  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },

  categoryOptionsGrid: {
    maxWidth: 880,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  categoryOptionButton: {
    width: "48.5%",
    maxWidth: 420,
    minHeight: 62,
    justifyContent: "center",
    marginBottom: 14,
  },

  categoryOptionText: {
    fontSize: 16,
    paddingHorizontal: 6,
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
    position: "relative",
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
flagImage: {
  width: 48,
  height: 32,
  marginRight: 16,
  borderRadius: 6,
  resizeMode: "cover",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",
},
selectedOptionButton: {
  borderColor: "#3B82F6",
  borderWidth: 2,
  backgroundColor: "rgba(30, 64, 175, 0.32)",
  shadowColor: "#3B82F6",
  shadowOpacity: 0.75,
  shadowRadius: 18,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  elevation: 12,
  transform: [{ scale: 0.99 }],
},

selectedOptionText: {
  color: "#DBEAFE",
},

optionCheck: {
  position: "absolute",
  right: 18,
  color: "#60A5FA",
  fontSize: 22,
  fontWeight: "bold",
},
});
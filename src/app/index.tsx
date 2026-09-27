import GameDescription from "../components/game-description";
import { resultAd } from "../ads/result-ad";
import { styles } from "../styles/home";
import { createRecommendations, type Answer } from "../domain/recommendations";
import VolumeSlider from "../components/volume-slider";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Animated,
  ActivityIndicator,
  Easing,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  gamesByLanguage,
  questionDataByLanguage,
  translations,
} from "../data";
import type { Category } from "../data/game";
import { valueLabel as englishValueLabels } from "../data/question.en";
import type {
  Question,
  QuestionOption,
} from "../data/questions";
import {
  getFavorites,
  toggleFavorite,
} from "../storage/favorites";
import {
  getSettings,
  updateSetting,
  type AppSettings,
} from "../storage/settings";

type Language = "tr" | "en";

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState<Language | null>(null);
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);
  const [preparingResults, setPreparingResults] = useState(false);
  const completingQuiz = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; resultAd.discard(); };
  }, []);
  useEffect(() => {
    if (started && !finished) resultAd.prepare();
  }, [started, finished]);

  async function finishQuiz() {
    if (completingQuiz.current) return;
    completingQuiz.current = true;
    setPreparingResults(true);
    try { await resultAd.showBeforeResults(); }
    finally {
      if (mounted.current) {
        setFinished(true);
        setSelectedOption(null);
        setPreparingResults(false);
      }
      completingQuiz.current = false;
    }
  }
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const questionTranslateX = useRef(new Animated.Value(0)).current;
  const questionScroll = useRef<ScrollView>(null);
  const transitionBusy = useRef(false);
  const enteringQuestion = useRef(false);
  const questionOpacity = questionTranslateX.interpolate({
    inputRange: [-28, 0, 28],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  // Start the entrance after React commits the new question, while it is hidden.
  useLayoutEffect(() => {
    if (!enteringQuestion.current) return;
    enteringQuestion.current = false;
    questionScroll.current?.scrollTo({ y: 0, animated: false });
    const entrance = Animated.timing(questionTranslateX, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    entrance.start(({ finished: completed }) => {
      if (!completed || !mounted.current) return;
      transitionBusy.current = false;
      setSelectedOption(null);
    });
    return () => entrance.stop();
  }, [questionIndex, questionTranslateX]);

  useEffect(() => () => { questionTranslateX.stopAnimation(); }, [questionTranslateX]);

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
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState<AppSettings>({
    musicEnabled: true,
    soundEnabled: true,
    volume: 80,
    language: null,
  });

  const maxPreferenceScore = activeQuestions
    .filter((question) => question.kind === "preference")
    .reduce((total, question) => total + (question.weight ?? 1), 0);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  useEffect(() => {
    loadFavorites();
    loadSettings();
  }, []);

  const [storageError, setStorageError] = useState<"load" | "save" | null>(null);
  const settingsBusy = useRef(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [volumePreview, setVolumePreview] = useState<number | null>(null);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [settingsReady, setSettingsReady] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const favoriteBusy = useRef(new Set<number>());

  async function loadFavorites() {
    try {
      setFavoriteIds(await getFavorites());
      setFavoritesReady(true);
    } catch { setStorageError("load"); }
  }

  async function loadSettings() {
    try {
      const saved = await getSettings();
      setAppSettings(saved);
      setLanguage(saved.language);
      setSettingsReady(true);
    } catch { setStorageError("load"); }
    finally { setSettingsLoaded(true); }
  }

  async function handleSettingChange<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    if (!settingsReady || settingsBusy.current) return;
    settingsBusy.current = true;
    setSavingSettings(true);
    try {
      setAppSettings(await updateSetting(key, value));
    } catch { setStorageError("save"); }
    finally {
      settingsBusy.current = false;
      setSavingSettings(false);
    }
  }

  async function handleFavorite(gameId: number) {
    if (!favoritesReady || favoriteBusy.current.has(gameId)) return;
    favoriteBusy.current.add(gameId);
    try {
      const enabled = await toggleFavorite(gameId);
      setFavoriteIds(current => enabled
        ? [...new Set([...current, gameId])]
        : current.filter(id => id !== gameId));
    } catch { setStorageError("save"); }
    finally { favoriteBusy.current.delete(gameId); }
  }

  const storageNotice = storageError && (
    <View style={{ position: "absolute", bottom: 24, left: 16, right: 16, backgroundColor: "#7f1d1d", padding: 16, borderRadius: 12 }} accessibilityLiveRegion="assertive">
      <Text style={{ color: "white", marginBottom: 8 }}>
        {storageError === "load"
          ? (language === "en" ? "Saved data could not be loaded. Please retry." : "Kayıtlı veriler okunamadı. Lütfen yeniden dene.")
          : (language === "en" ? "Could not save. Your change was not applied; please retry." : "Kaydedilemedi. Değişiklik uygulanmadı; lütfen yeniden dene.")}
      </Text>
      <TouchableOpacity onPress={() => {
        setStorageError(null);
        if (!favoritesReady) void loadFavorites();
        if (!settingsReady) void loadSettings();
      }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>{language === "en" ? "OK / Retry" : "Tamam / Yeniden dene"}</Text>
      </TouchableOpacity>
    </View>
  );

  function translateGameTag(value: string) {
    const gameTags =
      ("gameTags" in t ? t.gameTags : {}) as Record<string, string>;

    return gameTags[value] ?? (language === "en" ? englishValueLabels[value] : undefined) ?? value;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const { getSelectedPlatform, getSelectedCategory, getSelectedPlayMode, getRecommendation, getMatchPercent, getPlayerProfile } = createRecommendations({
    answers, activeGames, maxPreferenceScore, t, translateGameTag,
  });

  async function selectLanguage(languageCode: Language) {
    if (!settingsReady || settingsBusy.current) {
      return;
    }
    settingsBusy.current = true;
    setSelectedLanguage(languageCode);
    try {
      const saved = await updateSetting("language", languageCode);
      setAppSettings(saved);
      setLanguage(languageCode);
    } catch { setStorageError("save"); }
    finally {
      settingsBusy.current = false;
      setSelectedLanguage(null);
    }
  }

  function answerQuestion(option: QuestionOption) {
    if (transitionBusy.current || selectedOption !== null || completingQuiz.current || !currentQuestion) {
      return;
    }

    transitionBusy.current = true;
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

      Animated.timing(questionTranslateX, {
        toValue: -28,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished: completed }) => {
        if (!completed || !mounted.current) return;
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
          enteringQuestion.current = true;
          questionTranslateX.setValue(28);
          setQuestionIndex((previousIndex) => previousIndex + 1);
        } else {
          transitionBusy.current = false;
          questionTranslateX.setValue(0);
          void finishQuiz();
        }
      });
  }

  function goBack() {
    if (transitionBusy.current || selectedOption !== null || completingQuiz.current) {
      return;
    }

    if (questionIndex === 0) {
      resultAd.discard();
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
    questionTranslateX.stopAnimation();
    transitionBusy.current = false;
    enteringQuestion.current = false;
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setFinished(false);
    setSelectedOption(null);
    questionTranslateX.setValue(0);
  }

  const isCategoryQuestion = currentQuestion?.id === "category";

  if (preparingResults) {
    return (
      <View style={[styles.splashContainer, { backgroundColor: "#121826", justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#6EE7B7" />
        <Text accessibilityLiveRegion="polite" style={{ color: "white", marginTop: 16 }}>
          {language === "en" ? "Opening your recommendations…" : "Önerilerin açılıyor…"}
        </Text>
      </View>
    );
  }

  if (showSplash || !settingsLoaded) {
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

          <Text style={styles.splashTitle}>{language === "en" ? "Find Your Game" : "Oyununu Bul"}</Text>

          <Text style={styles.splashSubtitle}>
            {language === "en" ? "Preparing recommendations for your gaming taste." : "Oyun zevkine en uygun önerileri hazırlıyoruz."}
          </Text>

          <View style={styles.loadingDotsContainer}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        </View>
      {storageNotice}
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
              disabled={!settingsReady || selectedLanguage !== null}
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
              disabled={!settingsReady || selectedLanguage !== null}
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
      {storageNotice}
      </ImageBackground>
    );
  }

  if (showFavorites) {
    const favoriteGames = activeGames.filter((game) =>
      favoriteIds.includes(game.id)
    );

    return (
      <ImageBackground
        source={require("../../assets/images/game-background.png")}
        resizeMode="cover"
        style={styles.resultBackground}
      >
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.resultContainer}>
          <Text style={styles.title}>
            {language === "tr" ? "Favoriler" : "Favorites"}
          </Text>

          {favoriteGames.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>
                {language === "tr" ? "Henüz favori yok" : "No favorites yet"}
              </Text>
              <Text style={styles.emptyText}>
                {language === "tr"
                  ? "Beğendiğin oyunları kalp ikonuyla favorilere ekleyebilirsin."
                  : "You can add games you like to favorites with the heart icon."}
              </Text>
            </View>
          ) : (
            favoriteGames.map((game) => (
              <View key={game.id} style={styles.gameCard}>
                {game.image && (
                  <Image source={game.image} style={styles.gameImage} />
                )}

                <View style={styles.cardHeader}>
                  <Text style={styles.gameTitle}>🎮 {game.title}</Text>

                  <TouchableOpacity
                    style={styles.favoriteButton}
                    disabled={!favoritesReady}
                    onPress={() => handleFavorite(game.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteIcon}>♥</Text>
                  </TouchableOpacity>
                </View>

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
                  {game.platforms.map(translateGameTag).join(" • ")}
                </Text>

                <GameDescription text={game.story || t.defaultGameStory} language={language} title={game.title} />
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowFavorites(false)}
          >
            <Text style={styles.buttonText}>
              {language === "tr" ? "Geri" : "Back"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      {storageNotice}
      </ImageBackground>
    );
  }

  if (showSettings) {
    return (
      <ImageBackground
        source={require("../../assets/images/game-background.png")}
        resizeMode="cover"
        style={styles.resultBackground}
      >
        <ScrollView contentContainerStyle={styles.settingsContainer}>
          <Text style={styles.title}>
            {language === "tr" ? "Ayarlar" : "Settings"}
          </Text>

          <Text style={styles.settingsSubtitle}>
            {language === "tr"
              ? "Ses deneyimini kendi zevkine göre ayarla."
              : "Customize the audio experience to your preference."}
          </Text>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextArea}>
                <Text style={styles.settingTitle}>
                  {language === "tr" ? "Arka Plan Müziği" : "Background Music"}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === "tr"
                    ? "Uygulama müziğini aç veya kapat."
                    : "Turn the app music on or off."}
                </Text>
              </View>
              <Switch
                disabled={!settingsReady || savingSettings}
                value={appSettings.musicEnabled}
                onValueChange={(value) =>
                  handleSettingChange("musicEnabled", value)
                }
                trackColor={{ false: "#374151", true: "#22C55E" }}
                thumbColor="#F9FAFB"
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingRow}>
              <View style={styles.settingTextArea}>
                <Text style={styles.settingTitle}>
                  {language === "tr" ? "Ses Efektleri" : "Sound Effects"}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === "tr"
                    ? "Buton ve seçim seslerini aç veya kapat."
                    : "Turn button and selection sounds on or off."}
                </Text>
              </View>
              <Switch
                disabled={!settingsReady || savingSettings}
                value={appSettings.soundEnabled}
                onValueChange={(value) =>
                  handleSettingChange("soundEnabled", value)
                }
                trackColor={{ false: "#374151", true: "#22C55E" }}
                thumbColor="#F9FAFB"
              />
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.volumeHeader}>
              <View style={styles.settingTextArea}>
                <Text style={styles.settingTitle}>
                  {language === "tr" ? "Ses Seviyesi" : "Volume"}
                </Text>
                <Text style={styles.settingDescription}>
                  {language === "tr" ? "Genel ses seviyesi" : "Master volume"}
                </Text>
              </View>
              <Text style={styles.volumeValue}>{language === "en" ? `${volumePreview ?? appSettings.volume}%` : `%${volumePreview ?? appSettings.volume}`}</Text>
            </View>

            <VolumeSlider
              value={appSettings.volume}
              disabled={!settingsReady || savingSettings}
              label={language === "tr" ? "Ses Seviyesi" : "Volume"}
              onPreview={setVolumePreview}
              onCommit={value => handleSettingChange("volume", value)}
            />
          </View>

          <Text style={styles.settingsSavedText}>
            {language === "tr"
              ? "Ayarlar otomatik kaydedilir."
              : "Settings are saved automatically."}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowSettings(false)}
          >
            <Text style={styles.buttonText}>
              {language === "tr" ? "Geri" : "Back"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      {storageNotice}
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
          style={styles.button}
          onPress={() => setShowFavorites(true)}
        >
          <Text style={styles.buttonText}>
            {language === "tr" ? "Favoriler" : "Favorites"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.buttonText}>
            {language === "tr" ? "Ayarlar" : "Settings"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changeLanguageButton}
          onPress={() => setLanguage(null)}
        >
          <Text style={styles.changeLanguageText}>{t.changeLanguage}</Text>
        </TouchableOpacity>
      {storageNotice}
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
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.resultContainer}>
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
                {t.platformFilter}: {translateGameTag(selectedPlatform)}
              </Text>
            )}

            {selectedCategory && (
              <Text style={styles.platformFilterText}>
                {t.categoryFilter}: {translateGameTag(selectedCategory)}
              </Text>
            )}

            {selectedPlayMode && (
              <Text style={styles.platformFilterText}>
                {t.playModeFilter}: {translateGameTag(selectedPlayMode)}
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

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    disabled={!favoritesReady}
                    onPress={() => handleFavorite(game.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.favoriteIcon}>
                      {favoriteIds.includes(game.id) ? "♥" : "♡"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.matchBadge}>
                    <Text style={styles.matchBadgeText}>
                      {language === "en" ? `${matchPercent}%` : `%${matchPercent}`}
                    </Text>
                  </View>
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
                {game.platforms.map(translateGameTag).join(" • ")}
              </Text>

              <GameDescription text={game.story || t.defaultGameStory} language={language} title={game.title} />

              {visibleReasons.length > 0 && (
                <View style={styles.reasonBox}>
                  <Text style={styles.reasonTitle}>
                    {t.recommendationReason}
                  </Text>

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
    {storageNotice}
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
        ref={questionScroll}
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
              opacity: questionOpacity,
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
    {storageNotice}
      </ImageBackground>
  );

}

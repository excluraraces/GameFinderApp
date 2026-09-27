import type { Category, Game, Platform, PlayMode } from "../data/game";
import type { HardFilterField, ScoreField } from "../data/questions";
import type { translations } from "../data/translations";

export type Answer = {
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


type RecommendationContext = {
  answers: Answer[];
  activeGames: Game[];
  maxPreferenceScore: number;
  t: typeof translations.tr | typeof translations.en;
  translateGameTag: (value: string) => string;
};

export function createRecommendations({ answers, activeGames, maxPreferenceScore, t, translateGameTag }: RecommendationContext) {
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

    if (platform && !game.platforms.includes(platform as Platform)) {
      return false;
    }

    if (category && !game.categories.includes(category as Category)) {
      return false;
    }

    if (
      playMode &&
      playMode !== "Fark etmez" &&
      !game.playModes.includes(playMode as PlayMode)
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


  return { getSelectedPlatform, getSelectedCategory, getSelectedPlayMode, getRecommendation, getMatchPercent, getPlayerProfile };
}

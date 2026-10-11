import { buildPlayerProfile } from "./player-profile";
import { matchedPreferenceValue, passesRequiredPreferences } from "./preference-matching";
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
  requiredMatch?: boolean;
  noPreference?: boolean;
};

type ScoredGame = Game & {
  score: number;
  reasons: string[];
};


type RecommendationContext = {
  tieBreakSeed?: number;
  previousRecommendationIds?: number[];
  answers: Answer[];
  activeGames: Game[];
  maxPreferenceScore: number;
  t: typeof translations.tr | typeof translations.en;
  translateGameTag: (value: string) => string;
};

export function createRecommendations({ answers, activeGames, maxPreferenceScore, t, translateGameTag, tieBreakSeed = 0, previousRecommendationIds = [] }: RecommendationContext) {
  // Re-answering a question replaces its evidence; never score it twice.
  answers = [...new Map(answers.map(answer => [answer.questionId, answer])).values()];

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

  function getRecommendation() {
    const scoredGames: ScoredGame[] = activeGames
      .filter((game) => passesHardFilters(game) && passesRequiredPreferences(game, answers))
      .map((game) => {
        let score = 0;
        const evidence: { text: string; weight: number }[] = [];

        answers
          .filter((answer) => answer.kind === "preference" && answer.scoreField && !answer.noPreference)
          .forEach((answer) => {
            const scoreField = answer.scoreField!;
            const matchedValue = matchedPreferenceValue(game, answer);

            if (matchedValue !== undefined) {
              score += answer.weight ?? 1;
              if ((answer.weight ?? 1) > 0) {
                evidence.push({
                  weight: answer.weight ?? 1,
                  text: t.reasons.matched(t.reasons.fields[scoreField],
                    translateGameTag(answer.value), translateGameTag(matchedValue)),
                });
              }
            }
          });

        const reasons = evidence.sort((a, b) => b.weight - a.weight).map(item => item.text);
        if (!reasons.length) reasons.push(t.reasons.filtersOnly);
        const platform = getSelectedPlatform();
        if (platform) reasons.push(t.reasons.platform(translateGameTag(platform)));
        const category = getSelectedCategory();
        const playMode = getSelectedPlayMode();

        if (category) {
          reasons.push(t.reasons.category(translateGameTag(category)));
        }

        if (playMode && playMode !== "Fark etmez") {
          reasons.push(t.reasons.playMode(translateGameTag(playMode)));
        }

        return {
          ...game,
          score,
          reasons: [...new Set(reasons)],
        };
      });

    // Canonical IDs keep a quiz's order stable across languages and catalog order.
    // Shuffle before the stable score sort so ties at the top-ten cutoff are fair too.
    scoredGames.sort((a, b) => a.id - b.id);
    let randomState = tieBreakSeed >>> 0;
    for (let i = scoredGames.length - 1; i > 0; i--) {
      // Mulberry32: deterministic randomness for this quiz, never inside a comparator.
      randomState = (randomState + 0x6d2b79f5) >>> 0;
      let value = Math.imul(randomState ^ (randomState >>> 15), randomState | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      const random = ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      const j = Math.floor(random * (i + 1));
      [scoredGames[i], scoredGames[j]] = [scoredGames[j], scoredGames[i]];
    }

    // Keep clearly better matches ahead. Within a band of at most ten
    // percentage points, vary discovery without changing the displayed score.
    const randomOrder = new Map(scoredGames.map((game, index) => [game.id, index]));
    const bandWidth = Number.isFinite(maxPreferenceScore)
      ? Math.floor(Math.max(0, maxPreferenceScore) * 0.1) : 0;
    const previous = new Map(previousRecommendationIds.map((id, index) => [id, index]));
    const exposure = (id: number) => {
      const index = previous.get(id);
      return index === undefined ? 0 : index < 3 ? 2 : 1;
    };
    const ranked = scoredGames.sort((a, b) => b.score - a.score);
    const result: ScoredGame[] = [];
    for (let start = 0; start < ranked.length && result.length < 10;) {
      let end = start + 1;
      const best = ranked[start].score;
      while (end < ranked.length && best - ranked[end].score <= bandWidth &&
        (best === 0 || ranked[end].score > 0)) end++;
      const band = ranked.slice(start, end).sort((a, b) =>
        exposure(a.id) - exposure(b.id) || randomOrder.get(a.id)! - randomOrder.get(b.id)!);
      // With a small pool, all games may already have been shown. Still avoid
      // repeating the same first choice when a similarly good option exists.
      if (start === 0 && band.length > 1 && band[0].id === previousRecommendationIds[0]) {
        band.push(band.shift()!);
      }
      result.push(...band.slice(0, 10 - result.length));
      start = end;
    }
    return result;
  }

  function getMatchPercent(score: number) {
    if (!Number.isFinite(maxPreferenceScore) || maxPreferenceScore <= 0 || !Number.isFinite(score)) {
      return null;
    }

    return Math.min(
      100,
      Math.max(0, Math.round((score / maxPreferenceScore) * 100))
    );
  }

  function getMatchSummary(score: number) {
    const percent = getMatchPercent(score);
    const level = percent === null ? "unavailable" : percent === 0 ? "filtersOnly"
      : percent < 40 ? "limited" : percent < 70 ? "partial" : percent < 90 ? "good" : "strong";
    return { percent, level } as const;
  }


  function getPlayerProfileDetails() {
    return buildPlayerProfile(answers);
  }

  function getPlayerProfile() {
    const profile = getPlayerProfileDetails();
    return profile.traits.length
      ? profile.traits.slice(0, 3).map(trait => t.profiles[trait.id])
      : [t.profiles.versatile, t.profiles.openToNewExperiences, t.profiles.gameExplorer];
  }

  return { getSelectedPlatform, getSelectedCategory, getSelectedPlayMode, getRecommendation, getMatchPercent, getMatchSummary, getPlayerProfile, getPlayerProfileDetails };
}

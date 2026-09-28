import type { Category, Game, Platform, PlayMode } from "../data/game";
import { hardFilterQuestions } from "../data/questions";
import type { Answer } from "./recommendations";

export type RecoveryOption = {
  category: Category;
  playMode: string;
  count: number;
  categoryChanged: boolean;
  modeChanged: boolean;
};

export function getRecoveryOptions(answers: Answer[], games: Game[]): RecoveryOption[] {
  const value = (id: string) => answers.find(answer => answer.questionId === id)?.value;
  const platform = value("platform") as Platform | undefined;
  const category = value("category");
  const mode = value("playMode");
  if (!platform || !category || !mode) return [];
  const available = games.filter(game => game.platforms.includes(platform));
  const countMatches = (nextCategory: Category, nextMode: string) => available.filter(game =>
    game.categories.includes(nextCategory) &&
    (nextMode === "Fark etmez" || game.playModes.includes(nextMode as PlayMode))
  ).length;
  if (countMatches(category as Category, mode)) return [];

  const options: RecoveryOption[] = [];
  for (const categoryOption of hardFilterQuestions.find(question => question.id === "category")!.options) {
    const nextCategory = categoryOption.value as Category;
    // Keep the current mode where possible; otherwise offer concrete supported modes.
    const modes = countMatches(nextCategory, mode)
      ? [mode]
      : hardFilterQuestions.find(question => question.id === "playMode")!.options
        .map(option => option.value).filter(value => value !== "Fark etmez" && value !== mode);
    for (const nextMode of modes) {
      const count = countMatches(nextCategory, nextMode);
      if (count) options.push({ category: nextCategory, playMode: nextMode, count,
        categoryChanged: nextCategory !== category, modeChanged: nextMode !== mode });
    }
  }
  return options.sort((a, b) =>
    Number(a.categoryChanged) + Number(a.modeChanged) - Number(b.categoryChanged) - Number(b.modeChanged) ||
    Number(a.categoryChanged) - Number(b.categoryChanged) || b.count - a.count ||
    (a.category < b.category ? -1 : a.category > b.category ? 1 : a.playMode < b.playMode ? -1 : 1)
  ).slice(0, 3);
}

export function applyRecoveryOption(answers: Answer[], option: RecoveryOption, label: (value: string) => string): Answer[] {
  const categoryChanged = answers.find(answer => answer.questionId === "category")?.value !== option.category;
  return answers.filter(answer => !categoryChanged || answer.kind === "hardFilter").map(answer => {
    const nextValue = answer.questionId === "category" ? option.category
      : answer.questionId === "playMode" ? option.playMode : undefined;
    return nextValue === undefined ? answer : { ...answer, value: nextValue, label: label(nextValue) };
  });
}

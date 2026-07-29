import { games } from "./game";
import { englishGames } from "./game.en";

import { englishQuestions } from "./question.en";
import { questions } from "./questions";

export const gamesByLanguage = {
  tr: games,
  en: englishGames,
};

export const questionsByLanguage = {
  tr: questions,
  en: englishQuestions,
};

export { translations } from "./translations";
export type { Language } from "./translations";
export { englishGames, englishQuestions, games, questions };

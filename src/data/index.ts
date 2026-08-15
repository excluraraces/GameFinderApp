import { games } from "./game";
import { englishGames } from "./game.en";
import {
  categoryQuestionBooksEn,
  commonPreferenceQuestionsEn,
  hardFilterQuestionsEn,
} from "./question.en";
import {
  categoryQuestionBooks,
  commonPreferenceQuestions,
  hardFilterQuestions,
} from "./questions";
import { translations } from "./translations";

export {
  categoryQuestionBooks, categoryQuestionBooksEn, commonPreferenceQuestions, commonPreferenceQuestionsEn, englishGames, games, hardFilterQuestions, hardFilterQuestionsEn, translations
};

  export type {
    Category,
    Game,
    Platform,
    PlayMode
  } from "./game";

export type {
  HardFilterField,
  Question,
  QuestionKind,
  QuestionOption,
  ScoreField
} from "./questions";

export const gamesByLanguage = {
  tr: games,
  en: englishGames,
} as const;

export const questionDataByLanguage = {
  tr: {
    hardFilters: hardFilterQuestions,
    categoryBooks: categoryQuestionBooks,
    commonPreferences: commonPreferenceQuestions,
  },
  en: {
    hardFilters: hardFilterQuestionsEn,
    categoryBooks: categoryQuestionBooksEn,
    commonPreferences: commonPreferenceQuestionsEn,
  },
} as const;

// Geçiş sürecinde mevcut importların patlamaması için.
// Yeni dinamik akışta questionDataByLanguage kullanılacak.
export const questionsByLanguage = {
  tr: hardFilterQuestions,
  en: hardFilterQuestionsEn,
} as const;
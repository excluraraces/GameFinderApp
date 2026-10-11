import type { Game } from '../data/game';
import type { Answer } from './recommendations';

export function matchedPreferenceValue(game: Game, answer: Answer): string | undefined {
  if (answer.noPreference || answer.kind !== 'preference' || !answer.scoreField) return undefined;
  const wanted = answer.matchValues?.length ? answer.matchValues : [answer.value];
  return wanted.find(value => game[answer.scoreField!].includes(value));
}

export function passesRequiredPreferences(game: Game, answers: Answer[]): boolean {
  return answers.every(answer => !answer.requiredMatch || answer.noPreference || matchedPreferenceValue(game, answer) !== undefined);
}

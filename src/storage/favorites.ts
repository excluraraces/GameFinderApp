import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@gamefinder_favorites";
let pending: Promise<unknown> = Promise.resolve();
function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const result = pending.then(operation);
  pending = result.catch(() => undefined);
  return result;
}

async function readFavorites(): Promise<number[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!data) return [];
  let parsed: unknown;
  try { parsed = JSON.parse(data); } catch { return []; }
  if (!Array.isArray(parsed)) return [];
  return [...new Set(parsed.filter((id): id is number =>
    typeof id === "number" && Number.isSafeInteger(id) && id > 0))];
}

export function getFavorites(): Promise<number[]> {
  return enqueue(readFavorites);
}

function changeFavorite(gameId: number, desired?: boolean): Promise<boolean> {
  return enqueue(async () => {
    if (!Number.isSafeInteger(gameId) || gameId <= 0) throw new Error("Invalid game ID");
    const favorites = await readFavorites();
    const enabled = desired ?? !favorites.includes(gameId);
    const updated = enabled ? [...new Set([...favorites, gameId])] : favorites.filter(id => id !== gameId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return enabled;
  });
}

export async function addFavorite(gameId: number): Promise<void> {
  await changeFavorite(gameId, true);
}
export async function removeFavorite(gameId: number): Promise<void> {
  await changeFavorite(gameId, false);
}
export async function isFavorite(gameId: number): Promise<boolean> {
  return (await getFavorites()).includes(gameId);
}
export function toggleFavorite(gameId: number): Promise<boolean> {
  return changeFavorite(gameId);
}

import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "@gamefinder_settings";
export type AppSettings = { musicEnabled: boolean; soundEnabled: boolean; volume: number; language: "tr" | "en" | null };
export const DEFAULT_SETTINGS: AppSettings = { musicEnabled: true, soundEnabled: true, volume: 80, language: null };
let pending: Promise<unknown> = Promise.resolve();
function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const result = pending.then(operation);
  pending = result.catch(() => undefined);
  return result;
}
function normalize(value: unknown): AppSettings {
  const saved = value && typeof value === "object" && !Array.isArray(value)
    ? value as Partial<AppSettings> : {};
  return {
    language: saved.language === "tr" || saved.language === "en" ? saved.language : null,
    musicEnabled: typeof saved.musicEnabled === "boolean" ? saved.musicEnabled : DEFAULT_SETTINGS.musicEnabled,
    soundEnabled: typeof saved.soundEnabled === "boolean" ? saved.soundEnabled : DEFAULT_SETTINGS.soundEnabled,
    volume: typeof saved.volume === "number" && Number.isFinite(saved.volume)
      ? Math.max(0, Math.min(100, saved.volume)) : DEFAULT_SETTINGS.volume,
  };
}
async function readSettings(): Promise<AppSettings> {
  const data = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!data) return { ...DEFAULT_SETTINGS };
  try { return normalize(JSON.parse(data)); } catch { return { ...DEFAULT_SETTINGS }; }
}
export function getSettings(): Promise<AppSettings> { return enqueue(readSettings); }
export function saveSettings(settings: AppSettings): Promise<void> {
  const snapshot = normalize(settings);
  return enqueue(() => AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(snapshot)));
}
export function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<AppSettings> {
  return enqueue(async () => {
    const updated = normalize({ ...await readSettings(), [key]: value });
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  });
}
export async function resetSettings(): Promise<AppSettings> {
  await saveSettings(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS };
}

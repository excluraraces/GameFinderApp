import type { Answer } from './recommendations';

export const PROFILE_IDS = ['story', 'explorer', 'challenger', 'strategist', 'competitor', 'social', 'collector', 'creator', 'relaxed', 'horror', 'speed', 'driver', 'solver', 'survivor', 'simulator', 'manager', 'quickplay', 'sports'] as const;
export type ProfileId = typeof PROFILE_IDS[number];
type Signal = Partial<Record<ProfileId, number>>;
type Signals = Record<string, Signal>;

// Each answer contributes at most its question weight. Shared signals split that
// budget; a partly positive answer contributes less than an emphatic one.
const features: Signals = {
  'Karakter oluşturma': { collector: .65, creator: .35 },
  'Seçim odaklı hikâye': { story: 1 }, 'Yoğun hikâye': { story: 1 },
  'Yoğun diyalog': { story: 1 }, 'Hikâye kampanyası': { story: 1 }, 'Hikâye odaklı': { story: 1 },
  'Loot': { collector: 1 }, 'Keşif': { explorer: 1 }, 'Boss savaşları': { challenger: 1 },
  'Hızlı çatışma': { speed: 1 }, 'Taktiksel çatışma': { strategist: .8, challenger: .2 },
  'Gerçekçi çatışma': { simulator: .65, strategist: .35 },
  'PvP': { competitor: 1 }, 'Ranked': { competitor: .8, challenger: .2 },
  'Takım koordinasyonu': { social: .7, strategist: .3 },
  'Battle Royale': { competitor: .65, survivor: .35 }, 'PvE co-op': { social: 1 },
  'Yakın dövüş': { challenger: .65, speed: .35 }, 'Silahlı çatışma': { speed: .7, challenger: .3 },
  'Stealth': { strategist: .7, explorer: .3 },
  'Arcade sürüş': { speed: .6, driver: .4 }, 'Simülasyon sürüş': { driver: .7, simulator: .3 },
  'Araç simülasyonu': { driver: .7, simulator: .3 },
  'Açık dünya sürüş': { driver: .6, explorer: .4 },
  'Araç modifiye': { creator: .6, collector: .4 }, 'Araç koleksiyonu': { collector: 1 },
  'Kısa yarışlar': { quickplay: .8, speed: .2 }, 'Online yarış': { competitor: .7, speed: .3 },
  'Drift': { speed: .7, challenger: .3 }, 'Kariyer modu': { collector: .7, simulator: .3 },
  'Rahat sürüş': { relaxed: .6, driver: .4 },
  'Gerçek zamanlı strateji': { strategist: 1 }, 'Sıra tabanlı strateji': { strategist: 1 },
  'Grand strategy': { strategist: .7, manager: .3 }, 'Taktiksel savaş': { strategist: 1 },
  'Ekonomi yönetimi': { manager: .8, strategist: .2 }, 'Diplomasi': { strategist: 1 },
  'Ordu yönetimi': { strategist: .7, manager: .3 }, 'Şehir kurma': { creator: .6, manager: .4 },
  'Uzun kampanya': { strategist: .6, collector: .4 }, 'Sandbox özgürlüğü': { creator: .6, explorer: .4 },
  'Psikolojik korku': { horror: 1 }, 'Survival horror': { horror: .6, survivor: .4 },
  'Aksiyon korku': { horror: .65, challenger: .35 }, 'Kaçış / saklanma': { survivor: .6, horror: .4 },
  'Kaynak yönetimi': { manager: .55, survivor: .45 }, 'Gerilim': { horror: 1 },
  'Bulmaca': { solver: 1 }, 'Çevresel bulmaca': { solver: .8, explorer: .2 },
  'Fizik bulmacası': { solver: 1 }, 'Optik bulmaca': { solver: 1 }, 'Co-op bulmaca': { solver: .6, social: .4 },
  'İş simülasyonu': { simulator: .7, manager: .3 }, 'Yaşam simülasyonu': { simulator: .7, creator: .3 },
  'Rahatlatıcı görevler': { relaxed: 1 }, 'Koloni yönetimi': { manager: .7, survivor: .3 },
  'Spor yönetimi': { manager: .7, sports: .3 }, 'Uzun vadeli büyüme': { manager: 1 }, 'Taktik': { strategist: 1 },
  'Yaratıcılık / özgürlük': { creator: 1 }, 'Crafting': { creator: .6, survivor: .4 },
  'Hayatta kalma': { survivor: 1 }, 'Kullanıcı içerikleri': { creator: .7, social: .3 },
  'Base building': { creator: .75, survivor: .25 }, 'Yüksek risk': { survivor: .6, challenger: .4 },
  'Basketbol': { sports: 1 }, 'Dövüş sporu': { sports: 1 }, 'Raket / golf': { sports: 1 }, 'Diğer takım sporları': { sports: 1 },
  'Futbol': { sports: 1 }, 'Araç sporu': { sports: .6, speed: .4 },
  'Takım kurma': { manager: .6, sports: .4 }, 'Uzun kariyer': { collector: .6, sports: .4 },
  'Kısa maçlar': { quickplay: 1 }, 'Karakter yetenekleri': { collector: .6, strategist: .4 },
  'Sosyal çıkarım': { social: .6, solver: .4 }, 'Mini oyunlar': { social: .6, quickplay: .4 },
};

const fields: Record<string, Signals> = {
  features,
  storyImportance: { 'Çok önemli': { story: 1 }, 'Biraz önemli': { story: .4 } },
  worldType: { 'Açık dünya': { explorer: 1 }, 'Lineer hikaye': { story: .7 }, 'Sandbox': { creator: .6, explorer: .4 } },
  characterProgression: { 'Evet çok isterim': { collector: 1 }, 'Biraz olsun': { collector: .4 } },
  difficulty: { 'Kolay': { relaxed: .8 }, 'Zor': { challenger: .8 }, 'Çok zor': { challenger: 1 } },
  tempo: { 'Hızlı ve aksiyonlu': { speed: 1 }, 'Yavaş ve taktiksel': { strategist: 1 }, 'Gerilimli': { horror: .8 }, 'Rahatlatıcı': { relaxed: 1 } },
  challengeStyle: { 'Rahatlatmalı': { relaxed: 1 }, 'Zorlamalı': { challenger: 1 } },
  horrorInterest: { 'Çok severim': { horror: 1 }, 'Bazen oynarım': { horror: .35 } },
  length: { 'Kısa': { quickplay: 1 } },
};

// Visual style stays neutral; the intended activity provides profile evidence.
const questionSignals: Record<string, Signals> = {
  'sim-realism': {},
  'sim-mood': {
    'Rahatlatıcı görevler': { relaxed: 1 },
    'Kariyer modu': { simulator: .7, challenger: .3 },
    'Ekonomi yönetimi': { manager: .8, strategist: .2 },
    'Sandbox özgürlüğü': { creator: .6, explorer: .4 },
  },
};

export type ProfileEvidence = { questionId: string; label: string; points: number };
export type ProfileTrait = { id: ProfileId; points: number; percent: number; evidence: ProfileEvidence[] };
export type PlayerProfile = { traits: ProfileTrait[]; mixed: boolean; informativeAnswers: number };

export function buildPlayerProfile(answers: Answer[]): PlayerProfile {
  const scores = new Map<ProfileId, { points: number; evidence: ProfileEvidence[] }>();
  let informativeAnswers = 0;
  // Last answer wins if a question was answered again. Aliases in matchValues are
  // recommendation alternatives, not independent evidence for a personality.
  const unique = new Map(answers.map(answer => [answer.questionId, answer]));
  for (const answer of unique.values()) {
    if (answer.noPreference) continue;
    let signal: Signal | undefined;
    let weight = 1;
    if (answer.questionId === 'playMode') {
      signal = answer.value === 'Arkadaşlarla' ? { social: 1 }
        : answer.value === 'Online rekabetçi' ? { competitor: 1 } : undefined;
    } else if (answer.kind === 'preference') {
      signal = (questionSignals[answer.questionId] ?? fields[answer.scoreField ?? ''])?.[answer.value];

      const rawWeight = answer.weight ?? 1;
      if (!Number.isFinite(rawWeight) || rawWeight <= 0) continue;
      weight = Math.min(5, rawWeight);
      if (signal && Object.values(signal).some(value => value > 0)) informativeAnswers++;
    }
    if (!signal) continue;
    for (const [key, strength] of Object.entries(signal)) {
      if (strength <= 0) continue;
      const id = key as ProfileId;
      const entry = scores.get(id) ?? { points: 0, evidence: [] };
      const points = weight * strength;
      entry.points += points;
      entry.evidence.push({ questionId: answer.questionId, label: answer.label || answer.value, points });
      scores.set(id, entry);
    }
  }
  // Platform, category, or play mode alone cannot establish a player profile.
  if (!informativeAnswers) return { traits: [], mixed: false, informativeAnswers: 0 };
  const ranked = [...scores.entries()].sort(([a, x], [b, y]) => y.points - x.points || y.evidence.length - x.evidence.length || a.localeCompare(b));
  const total = ranked.reduce((sum, [, entry]) => sum + entry.points, 0);
  const traits: ProfileTrait[] = ranked.map(([id, entry]) => ({
    id, points: entry.points, percent: Math.floor(entry.points / total * 100),
    evidence: entry.evidence.sort((a, b) => b.points - a.points || a.questionId.localeCompare(b.questionId)),
  }));
  // Largest-remainder rounding keeps the complete distribution exactly at 100%.
  const remainder = 100 - traits.reduce((sum, trait) => sum + trait.percent, 0);
  const byFraction = traits.map((trait, index) => ({ index, fraction: trait.points / total * 100 - trait.percent }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (const { index } of byFraction.slice(0, remainder)) traits[index].percent++;
  return { traits, mixed: traits.length > 1 && traits[0].percent - traits[1].percent <= 5, informativeAnswers };
}

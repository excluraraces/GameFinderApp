import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { PlayerProfile, ProfileId } from '../domain/player-profile';
import { profileDescriptions } from '../data/player-profile-copy';

type Props = { profile: PlayerProfile; language: 'tr' | 'en'; labels: Record<ProfileId, string> };
const copy = {
  tr: {
    title: 'OYUNCU PROFİLİN', subtitle: 'Bugünkü oyun tarzın', mixed: 'Birden fazla eğilim öne çıkıyor',
    distinct: 'Öne çıkan eğilimin', evidence: 'Seçimlerin', more: 'Tüm eğilimleri gör', less: 'Daha az göster',
    note: 'Yüzdeler, bu testteki ağırlıklı tercih dağılımını gösterir; beceri puanı değildir.',
    empty: 'Tarzın henüz belirginleşmedi', emptyBody: 'Bu cevaplarla belirgin bir eğilim çıkaramadık. Oyun önerilerin seçtiğin filtre ve tercihlere göre hazırlandı.',
    other: (value: number) => `Diğer eğilimler: %${value}`,
    percent: (value: number) => `%${value}`,
  },
  en: {
    title: 'YOUR PLAYER PROFILE', subtitle: 'Your play style today', mixed: 'More than one style stands out',
    distinct: 'Your leading preference', evidence: 'Your choices', more: 'See all preferences', less: 'Show less',
    note: 'Percentages show your weighted preferences in this quiz, not a skill rating.',
    empty: 'Your style is still taking shape', emptyBody: 'These answers do not point to a clear preference yet. Your game recommendations still use your selected filters and preferences.',
    other: (value: number) => `Other preferences: ${value}%`,
    percent: (value: number) => `${value}%`,
  },
};

export default function PlayerProfileCard({ profile, language, labels }: Props) {
  const [expanded, setExpanded] = useState(false);
  const t = copy[language];
  const visible = expanded ? profile.traits : profile.traits.slice(0, 3);
  const remaining = profile.traits.slice(3).reduce((sum, trait) => sum + trait.percent, 0);
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{t.title}</Text>
      <Text style={styles.title}>{t.subtitle}</Text>
      {profile.traits.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.name}>{t.empty}</Text>
          <Text style={styles.description}>{t.emptyBody}</Text>
        </View>
      ) : (
        <>
          <Text style={styles.badge}>{profile.mixed ? t.mixed : t.distinct}</Text>
          {visible.map((trait, index) => {
            const color = index === 0 ? '#6EE7B7' : index === 1 ? '#93C5FD' : '#C4B5FD';
            const reasons = [...new Set(trait.evidence.map(item => item.label))].slice(0, 2);
            return (
              <View key={trait.id} style={[styles.trait, index === 0 && styles.leading]}>
                <View style={styles.row}>
                  <Text style={[styles.name, { color }]}>{labels[trait.id]}</Text>
                  <Text style={[styles.percent, { color }]}>{t.percent(trait.percent)}</Text>
                </View>
                <View
                  style={styles.track}
                  accessible
                  accessibilityRole="progressbar"
                  accessibilityLabel={labels[trait.id]}
                  accessibilityValue={{ min: 0, max: 100, now: trait.percent, text: t.percent(trait.percent) }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={trait.percent}
                  aria-valuetext={t.percent(trait.percent)}
                >
                  <View style={[styles.fill, { width: `${trait.percent}%`, backgroundColor: color }]} />
                </View>
                {index === 0 && <Text style={styles.description}>{profileDescriptions[language][trait.id]}</Text>}
                <Text style={styles.evidence}>{t.evidence}: {reasons.join(' · ')}</Text>
              </View>
            );
          })}
          {profile.traits.length > 3 && (
            <View style={styles.footer}>
              {!expanded && <Text style={styles.other}>{t.other(remaining)}</Text>}
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                aria-expanded={expanded}
                onPress={() => setExpanded(value => !value)}
                style={styles.toggle}
              >
                <Text style={styles.toggleText}>{expanded ? t.less : t.more}</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.note}>{t.note}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', maxWidth: 430, backgroundColor: 'rgba(10,18,35,0.96)', borderRadius: 22, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(110,231,183,0.24)' },
  eyebrow: { color: '#6EE7B7', fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 7 },
  title: { color: '#F8FAFC', fontSize: 25, fontWeight: '800', lineHeight: 32 },
  badge: { color: '#B9C7DB', fontSize: 12, lineHeight: 18, marginTop: 6, marginBottom: 18 },
  trait: { paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  leading: { paddingTop: 0 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  name: { color: '#F8FAFC', fontSize: 16, fontWeight: '700', lineHeight: 23, flex: 1, minWidth: 0 },
  percent: { fontSize: 22, fontWeight: '800', lineHeight: 27, fontVariant: ['tabular-nums'] },
  track: { height: 6, width: '100%', borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginTop: 10 },
  fill: { height: '100%', borderRadius: 3 },
  description: { color: '#D4DDE9', fontSize: 13, lineHeight: 20, marginTop: 12 },
  evidence: { color: '#A8B7CA', fontSize: 12, lineHeight: 19, marginTop: 8 },
  footer: { paddingTop: 12 },
  other: { color: '#A8B7CA', fontSize: 12, lineHeight: 18 },
  toggle: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start', paddingRight: 16 },
  toggleText: { color: '#6EE7B7', fontWeight: '700', fontSize: 13 },
  note: { color: '#A8B7CA', fontSize: 11, lineHeight: 17, marginTop: 12 },
  empty: { paddingVertical: 16 },
});

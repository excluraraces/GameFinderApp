import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

const stops = [[59,130,246], [167,139,250], [52,211,153]];
const colors = Array.from({ length: 48 }, (_, i) => {
  const position = i / 47 * 2;
  const from = stops[Math.min(1, Math.floor(position))];
  const to = stops[Math.min(2, Math.floor(position) + 1)];
  const mix = position - Math.floor(position);
  return `rgb(${from.map((channel, n) => Math.round(channel + (to[n] - channel) * mix)).join(',')})`;
});
colors[47] = '#34D399';

export function Spectrum() {
  return <View style={s.spectrum} accessible={false}>{colors.map((color, i) => <View key={i} style={{ flex: 1, backgroundColor: color }} />)}</View>;
}

export function StudioBrand() {
  return <View accessible accessibilityLabel="Exclura Studio" style={s.brand}>
    <View style={s.symbol}><Text style={s.symbolText}>E</Text><View style={s.symbolAccent} /></View>
    <View><Text style={s.wordmark}>EXCLURA</Text><Text style={s.studio}>S T U D I O</Text></View>
  </View>;
}

export function ScreenHeading({ children, eyebrow = 'EXCLURA STUDIO' }: { children: string; eyebrow?: string }) {
  return <View style={s.heading}>
    <Text style={s.eyebrow}>{eyebrow}</Text>
    <Text accessibilityRole="header" style={s.title}>{children}</Text>
    <View style={s.underline}><Spectrum /></View>
  </View>;
}

export function LaunchScreen({ ready, language, onComplete }: { ready: boolean; language: 'tr' | 'en' | null; onComplete: () => void }) {
  const [progress] = useState(() => new Animated.Value(0));
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    // Reserve the final part for actual settings and background readiness.
    const animation = Animated.timing(progress, { toValue: ready ? 1 : 0.82, duration: ready ? 1800 : 1400, easing: Easing.out(Easing.cubic), useNativeDriver: false });
    animation.start(({ finished }) => { if (finished && ready) complete.current(); });
    return () => animation.stop();
  }, [ready, progress]);
  return <View style={s.launch}>
    <View style={s.haloBlue} /><View style={s.haloPurple} />
    <View style={s.launchContent}>
      <StudioBrand />
      <Text style={s.launchEyebrow}>{language === 'en' ? 'YOUR NEXT ADVENTURE' : 'BİR SONRAKİ MACERAN'}</Text>
      <Text accessibilityRole="header" style={s.launchTitle}>{language === 'en' ? 'Find your\nnext game.' : 'Sıradaki oyununu\nkeşfet.'}</Text>
      <Text style={s.description}>{language === 'en' ? 'A new gaming experience, tailored to you.' : 'Sana özel bir oyun deneyimi başlıyor.'}</Text>
      <View style={s.loadingArea}>
        <View style={s.loadingLabels}><Text style={s.loadingLabel}>{language === 'en' ? 'GETTING READY' : 'HAZIRLANIYOR'}</Text><Text style={s.loadingDot}>●</Text></View>
        <View accessibilityRole="progressbar" accessibilityLabel={language === 'en' ? 'Loading application' : 'Uygulama yükleniyor'} accessibilityState={{ busy: true }} style={s.track}>
          <Animated.View style={{ width: progress.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] }), height: '100%', overflow: 'hidden', borderRadius: 8 }}><Spectrum /></Animated.View>
        </View>
        <Text style={s.loadingHint}>{language === 'en' ? 'Great games. Your way.' : 'İyi oyunlar. Senin tarzın.'}</Text>
      </View>
    </View>
    <Text style={s.footer}>BUGÜN NE OYNASAM</Text>
  </View>;
}

const s = StyleSheet.create({
  spectrum: { flex: 1, flexDirection: 'row', width: '100%', minHeight: 3 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 52 },
  symbol: { width: 52, height: 56, borderRadius: 15, backgroundColor: '#17243F', borderWidth: 1, borderColor: '#425C92', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  symbolText: { fontSize: 34, fontWeight: '900', color: '#C4B5FD', fontStyle: 'italic' },
  symbolAccent: { position: 'absolute', bottom: 0, height: 3, left: 12, right: 12, backgroundColor: '#34D399' },
  wordmark: { color: '#EEF4FF', fontSize: 25, fontWeight: '800', letterSpacing: 4 },
  studio: { color: '#93C5FD', fontSize: 11, fontWeight: '600', marginTop: 5, letterSpacing: 3 },
  heading: { alignItems: 'center', width: '100%', maxWidth: 440, marginBottom: 26 },
  eyebrow: { color: '#A5B4FC', fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  title: { fontSize: 34, lineHeight: 42, fontWeight: '800', color: '#DDE9FF', letterSpacing: -0.8, textAlign: 'center' },
  underline: { width: 68, height: 4, borderRadius: 4, overflow: 'hidden', marginTop: 17 },
  launch: { flex: 1, width: '100%', backgroundColor: '#080F20', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 28 },
  launchContent: { width: '100%', maxWidth: 360 },
  haloBlue: { position: 'absolute', width: 380, height: 380, borderRadius: 190, backgroundColor: '#102044', top: -200, right: -170 },
  haloPurple: { position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: '#191831', bottom: -190, left: -160 },
  launchEyebrow: { color: '#A5B4FC', fontSize: 10, letterSpacing: 2.5, fontWeight: '700', marginBottom: 14 },
  launchTitle: { color: '#E7EEFF', fontSize: 38, lineHeight: 46, fontWeight: '800', letterSpacing: -1.2 },
  description: { color: '#99AAC6', fontSize: 15, lineHeight: 24, marginTop: 16, maxWidth: 280 },
  loadingArea: { marginTop: 46 },
  loadingLabels: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  loadingLabel: { color: '#B8C7E0', fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  loadingDot: { color: '#34D399', fontSize: 10 },
  track: { height: 7, borderRadius: 8, backgroundColor: '#202D45', overflow: 'hidden' },
  loadingHint: { color: '#8293AF', fontSize: 12, marginTop: 15 },
  footer: { position: 'absolute', bottom: 28, color: '#7385A5', fontSize: 9, letterSpacing: 3, fontWeight: '600' },
});

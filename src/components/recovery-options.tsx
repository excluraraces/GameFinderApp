import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { RecoveryOption } from "../domain/recommendation-recovery";

export default function RecoveryOptions({ options, language, translate, onSelect }: {
  options: RecoveryOption[];
  language: "tr" | "en" | null;
  translate: (value: string) => string;
  onSelect: (option: RecoveryOption) => void;
}) {
  const en = language === "en";
  return <View style={styles.container}>
    <Text style={styles.heading}>{en ? "Try a nearby alternative" : "Yakın bir alternatif deneyelim"}</Text>
    <Text style={styles.description}>{options.length
      ? en ? "These options have games on your platform. Choose which selection to change." : "Bu seçeneklerde platformuna uygun oyunlar var. Hangi seçimi değiştireceğine sen karar ver."
      : en ? "Our library has no alternatives for this platform yet. You can start again to choose another platform." : "Kütüphanemizde bu platform için henüz alternatif yok. Başka bir platform seçmek için yeniden başlayabilirsin."}</Text>
    {options.map(option => {
      const changes = [
        option.categoryChanged ? `${en ? "Category" : "Kategori"}: ${translate(option.category)}` : null,
        option.modeChanged ? `${en ? "Play mode" : "Oynama biçimi"}: ${translate(option.playMode)}` : null,
      ].filter(Boolean).join("\n");
      const action = option.categoryChanged
        ? en ? "Answer questions for this category →" : "Bu kategorinin sorularına geç →"
        : en ? "Show games with my answers →" : "Cevaplarımla oyunları göster →";
      return <TouchableOpacity key={`${option.category}:${option.playMode}`} accessibilityRole="button"
        accessibilityLabel={`${changes}. ${option.count} ${en ? "available games" : "oyun mevcut"}. ${action}`}
        onPress={() => onSelect(option)} style={styles.option} activeOpacity={0.75}>
        <Text style={styles.changes}>{changes}</Text>
        <Text style={styles.count}>{option.count} {en ? "games in the library" : "oyun kütüphanede mevcut"}</Text>
        <Text style={styles.action}>{action}</Text>
      </TouchableOpacity>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  container: { width: "100%", marginTop: 20, gap: 12 },
  heading: { color: "#F3F4F6", fontSize: 18, fontWeight: "700" },
  description: { color: "#CBD5E1", fontSize: 14, lineHeight: 21 },
  option: { backgroundColor: "#142A32", borderColor: "#345D60", borderWidth: 1, borderRadius: 14, padding: 16, gap: 8, minHeight: 48 },
  changes: { color: "#F3F4F6", fontSize: 16, lineHeight: 23, fontWeight: "600" },
  count: { color: "#CBD5E1", fontSize: 13 },
  action: { color: "#6EE7B7", fontSize: 14, lineHeight: 21, fontWeight: "600" },
});

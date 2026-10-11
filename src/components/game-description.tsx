import { StyleSheet, Text, View } from "react-native";

type Props = { text: string; language: "tr" | "en"; title: string };

// The parent list owns vertical scrolling. Full text must contribute to the
// card height so the reasons and final restart button remain reachable.
export default function GameDescription({ text, language, title }: Props) {
  return (
    <View style={styles.container}>
      <Text accessibilityLabel={`${title} - ${language === "en" ? "Game description" : "Oyun açıklaması"}: ${text}`} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", minWidth: 0, flexShrink: 0 },
  text: { color: "#cfcfcf", fontSize: 14, lineHeight: 21 },
});

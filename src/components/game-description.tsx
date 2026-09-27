import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = { text: string; language: "tr" | "en"; title: string };
const PREVIEW_HEIGHT = 140;

export default function GameDescription({ text, language, title }: Props) {
  const [contentHeight, setContentHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const overflowing = contentHeight > PREVIEW_HEIGHT + 1;
  const english = language === "en";

  return (
    <View style={styles.container}>
      <ScrollView
        key={expanded ? "expanded" : "preview"}
        style={[styles.scroll, !expanded && styles.limited]}
        contentContainerStyle={styles.content}
        nestedScrollEnabled
        scrollEnabled={!expanded && overflowing}
        showsVerticalScrollIndicator
        persistentScrollbar
        indicatorStyle="white"
        onContentSizeChange={(_, height) => setContentHeight(height)}
        accessibilityLabel={`${title} - ${english ? "Game description" : "Oyun açıklaması"}`}
      >
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
      {overflowing && (
        <View style={styles.footer}>
          {!expanded && <Text style={styles.hint}>{english ? "Scroll to read more" : "Devamını okumak için kaydır"}</Text>}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ expanded }}
            onPress={() => setExpanded(value => !value)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{expanded
              ? (english ? "Show less" : "Kısalt")
              : (english ? "Show full text" : "Tamamını göster")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", minWidth: 0 },
  scroll: { flexGrow: 0, flexShrink: 1 },
  limited: { maxHeight: PREVIEW_HEIGHT },
  content: { paddingRight: 12, paddingBottom: 4 },
  text: { color: "#cfcfcf", fontSize: 14, lineHeight: 21, flexShrink: 1 },
  footer: { marginTop: 6, alignItems: "flex-start" },
  hint: { color: "#9CA3AF", fontSize: 12, lineHeight: 18 },
  button: { minHeight: 44, justifyContent: "center", paddingVertical: 8, paddingRight: 16 },
  buttonText: { color: "#6EE7B7", fontSize: 13, fontWeight: "600" },
});

import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles as homeStyles } from "../styles/home";

type Props = PropsWithChildren<{ language: "tr" | "en"; onRestart: () => void }>;

export default function ResultsLayout({ children, language, onRestart }: Props) {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.list} removeClippedSubviews={false}>
        <View collapsable={false} style={homeStyles.resultContainer}>
          {children}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity accessibilityRole="button" onPress={onRestart}
          style={[homeStyles.button, styles.restart]}>
          <Text style={homeStyles.buttonText}>{language === "en" ? "Start a new test" : "Tekrar teste başla"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, minHeight: 0, width: "100%" },
  list: { flex: 1, minHeight: 0 },
  // A normal layout sibling reserves space; never overlays the last card.
  footer: { flexShrink: 0, alignItems: "center", paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, backgroundColor: "#0B1426" },
  restart: { width: "100%", maxWidth: 430, minWidth: 0, marginTop: 0 },
});

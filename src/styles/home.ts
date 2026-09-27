import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  languageOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(3, 8, 20, 0.52)",
  },
  selectedLanguageButton: {
    borderColor: "#22C55E",
    borderWidth: 2,
    backgroundColor: "rgba(34, 197, 94, 0.18)",
    shadowColor: "#22C55E",
    shadowOpacity: 1,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 16,
    transform: [{ scale: 1.02 }],
  },

  selectedLanguageCheck: {
    color: "#4ADE80",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "auto",
    textShadowColor: "#22C55E",
    textShadowRadius: 10,
  },

  languageTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  languageSubtitle: {
    color: "#cfcfcf",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 34,
  },

  languageButtonContainer: {
    width: "100%",
    maxWidth: 380,
    gap: 14,
  },

  languageButton: {
    width: "100%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10, 18, 35, 0.92)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },



  languageButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  languageHint: {
    color: "#8f98a8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 18,
  },

  changeLanguageButton: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  changeLanguageText: {
    color: "#cfcfcf",
    fontSize: 14,
    fontWeight: "600",
  },

  resultBackground: {
    flex: 1,
    width: "100%",
  },

  splashContainer: {
    flex: 1,
    width: "100%",
  },

  splashOverlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(3, 8, 20, 0.42)",
  },

  splashBadge: {
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginBottom: 24,
  },

  splashBadgeText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  splashTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  splashSubtitle: {
    color: "#cfcfcf",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
    marginBottom: 30,
  },

  loadingDotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#4CAF50",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  resultContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },

  subtitle: {
    color: "#cfcfcf",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 23,
    maxWidth: 360,
  },

  infoText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },

  resultSubtitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  filterSummary: {
    alignItems: "center",
    marginBottom: 18,
  },

  platformFilterText: {
    color: "#9ae6b4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },

  questionScroll: {
    flex: 1,
    width: "100%",
  },

  questionScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  categoryQuestionScrollContent: {
    justifyContent: "flex-start",
    paddingTop: 34,
    paddingBottom: 40,
  },

  questionSlideContainer: {
    width: "100%",
    alignItems: "center",
  },

  categoryQuestionSlideContainer: {
    maxWidth: 880,
  },

  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },

  categoryOptionsGrid: {
    maxWidth: 880,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  categoryOptionButton: {
    width: "48.5%",
    maxWidth: 420,
    minHeight: 62,
    justifyContent: "center",
    marginBottom: 14,
  },

  categoryOptionText: {
    fontSize: 16,
    paddingHorizontal: 6,
  },

  counter: {
    color: "#aaa",
    marginBottom: 20,
    fontSize: 16,
  },

  question: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    paddingHorizontal: 44,
    borderRadius: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    shadowColor: "#22C55E",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  optionButton: {
    position: "relative",
    backgroundColor: "rgba(10, 18, 35, 0.88)",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  optionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 23,
  },

  backButton: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  backButtonText: {
    color: "#aaa",
    fontSize: 15,
    fontWeight: "600",
  },

  emptyBox: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 16,
    width: "100%",
    maxWidth: 430,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },

  emptyTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    color: "#cfcfcf",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  gameCard: {
    backgroundColor: "rgba(10, 18, 35, 0.92)",
    padding: 16,
    borderRadius: 22,
    width: "100%",
    maxWidth: 430,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },

  gameImage: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    marginBottom: 14,
    resizeMode: "cover",
  },

  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },

  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.10)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  rankText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  gameTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },

  matchBadge: {
    backgroundColor: "#22C55E",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },

  matchBadgeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  matchText: {
    color: "#9ae6b4",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  tag: {
    color: "#E5E7EB",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  platformText: {
    color: "#a3a3a3",
    fontSize: 13,
    marginBottom: 12,
  },


  reasonBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 13,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  reasonTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  reasonText: {
    color: "#cfcfcf",
    fontSize: 13,
    lineHeight: 20,
  },

  scoreText: {
    color: "#34D399",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 14,
  },
  profileCard: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "rgba(10,18,35,0.92)",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  profileTitle: {
    color: "#34D399",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  profileText: {
    color: "white",
    fontSize: 15,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  flagImage: {
    width: 48,
    height: 32,
    marginRight: 16,
    borderRadius: 6,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  selectedOptionButton: {
    borderColor: "#3B82F6",
    borderWidth: 2,
    backgroundColor: "rgba(30, 64, 175, 0.32)",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.75,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
    transform: [{ scale: 0.99 }],
  },

  selectedOptionText: {
    color: "#DBEAFE",
  },

  optionCheck: {
    position: "absolute",
    right: 18,
    color: "#60A5FA",
    fontSize: 22,
    fontWeight: "bold",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  favoriteIcon: {
    fontSize: 28,
    color: "#ff4d6d",
  },
  settingsContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  settingsSubtitle: {
    color: "#cfcfcf",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: -10,
    marginBottom: 24,
    maxWidth: 360,
  },

  settingsCard: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "rgba(10, 18, 35, 0.92)",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  settingTextArea: {
    flex: 1,
  },

  settingTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 5,
  },

  settingDescription: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 19,
  },

  settingDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.09)",
    marginVertical: 18,
  },

  volumeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  volumeValue: {
    color: "#34D399",
    fontSize: 18,
    fontWeight: "bold",
  },






  settingsSavedText: {
    color: "#9ae6b4",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 4,
  },

});

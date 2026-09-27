import Constants, { ExecutionEnvironment } from "expo-constants";
import { AppState } from "react-native";
import { createInterstitialController } from "./interstitial-controller";

// Deliberately test-only. Live IDs and consent flow will be added before release.
// Release builds skip ads, so a store build cannot accidentally serve test ads.
let initialization: Promise<unknown> | undefined;
export const resultAd = createInterstitialController(async () => {
  if (!__DEV__ || Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return null;
  // Expo Go does not contain this native module. Require only after the guard.
  const sdk: typeof import("react-native-google-mobile-ads") = require("react-native-google-mobile-ads");
  initialization ??= sdk.default().initialize().catch(error => {
    initialization = undefined;
    throw error;
  });
  await initialization;
  const ad = sdk.InterstitialAd.createForAdRequest(sdk.TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });
  const events = {
    loaded: sdk.AdEventType.LOADED,
    closed: sdk.AdEventType.CLOSED,
    error: sdk.AdEventType.ERROR,
  };
  return {
    listen: (event, callback) => ad.addAdEventListener(events[event], callback),
    load: () => ad.load(),
    show: () => ad.show(),
  };
}, () => AppState.currentState === "active");

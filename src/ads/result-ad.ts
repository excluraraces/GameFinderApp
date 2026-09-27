// Web and other non-native targets never import the native advertising SDK.
export const resultAd = {
  prepare() {},
  discard() {},
  showBeforeResults: async () => {},
};

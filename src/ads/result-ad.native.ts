// Ad-free release: results never initialize or wait for an advertising SDK.
export const resultAd = {
  prepare() {},
  discard() {},
  showBeforeResults: async () => {},
};

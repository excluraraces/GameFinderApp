import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export const APP_BACKGROUND_COLOR = '#030814';
const BackgroundReadyContext = createContext(false);
export const useBackgroundReady = () => useContext(BackgroundReadyContext);

// Keep the native launch screen until the actual wallpaper has been displayed.
if (Platform.OS !== 'web') {
  void SplashScreen.preventAutoHideAsync().catch(() => {});
}

export function AppBackground({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [laidOut, setLaidOut] = useState(false);

  useEffect(() => {
    if (ready) return;
    // A corrupt/missing image must not trap the user on the launch screen.
    const timeout = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timeout);
  }, [ready]);

  useEffect(() => {
    if (!ready || !laidOut || Platform.OS === 'web') return;
    const frame = requestAnimationFrame(() => {
      void SplashScreen.hideAsync().catch(() => {});
    });
    return () => cancelAnimationFrame(frame);
  }, [ready, laidOut]);

  return (
    <BackgroundReadyContext.Provider value={ready}>
      <View style={styles.root} onLayout={() => setLaidOut(true)}>
        <Image
          source={require('../../assets/images/game-background.webp')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="high"
          transition={0}
          accessible={false}
          pointerEvents="none"
          onDisplay={() => setReady(true)}
          onError={() => setReady(true)}
        />
        {children}
      </View>
    </BackgroundReadyContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: APP_BACKGROUND_COLOR },
});

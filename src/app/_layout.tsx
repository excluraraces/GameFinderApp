import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { AppBackground } from '../components/app-background';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: 'transparent' } };

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppBackground>
        <ThemeProvider value={theme}>
          <StatusBar style="light" />
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
          </SafeAreaView>
        </ThemeProvider>
      </AppBackground>
    </SafeAreaProvider>
  );
}

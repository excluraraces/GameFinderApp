import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { AppBackground } from '../components/app-background';

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: 'transparent' } };

export default function RootLayout() {
  return (
    <AppBackground>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
      </ThemeProvider>
    </AppBackground>
  );
}

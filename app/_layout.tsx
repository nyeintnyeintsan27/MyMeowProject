// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Welcome Page */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Auth Pages - folder name က auth (parentheses မပါ) */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        
        {/* Main Pages */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
        
        {/* Modal */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
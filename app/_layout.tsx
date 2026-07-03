// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      {/* (tabs) ကို သီးခြားသတ်မှတ်မယ့်အစား */}
      <Stack.Screen name="(tabs)/index" />
      <Stack.Screen name="(tabs)/explore" />
      <Stack.Screen name="(tabs)/hospital" />
      <Stack.Screen name="(tabs)/message" />
      <Stack.Screen name="(tabs)/profile" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
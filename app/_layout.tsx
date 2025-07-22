import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { ThemeProvider } from "@/components/ThemeContext";
import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-vehicle/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="vehicle-details/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="clients/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sell-vehicle/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="installment/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="add-client/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="client-details/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sale-details/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
        </NavigationThemeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

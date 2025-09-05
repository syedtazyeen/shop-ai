import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { ChatProvider } from "./store/chat";
import AdvisorScreen from "./AdvisorScreen";
import SplashScreen from "./SplashScreen";
import { colors } from "./lib/colors";

import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

import { StatusBar } from "expo-status-bar";
import * as Splash from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons"; // example icon set

/**
 * App content with safe area + chat context
 */
function MainApp() {
  const insets = useSafeAreaInsets();

  return (
    <ChatProvider>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <AdvisorScreen />
      </View>
    </ChatProvider>
  );
}

/**
 * Root App with font preloading and splash screen
 */
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    async function loadAssets() {
      try {
        // Keep splash visible
        await Splash.preventAutoHideAsync();

        await Font.loadAsync(Ionicons.font);

        if (fontsLoaded) {
          await Splash.hideAsync();
        }
      } catch (e) {
        console.warn("Asset loading failed:", e);
      }
    }

    loadAssets();
  }, [fontsLoaded]);

  if (!isReady) {
    return <SplashScreen onFinish={() => setIsReady(true)} />;
  }

  return (
    <SafeAreaProvider>
      <MainApp />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

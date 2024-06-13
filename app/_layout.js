import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { useFonts, Handlee_400Regular } from "@expo-google-fonts/handlee";
import { StyleSheet, ImageBackground } from "react-native";

const image = require("../assets/images/goldengrass.jpg");

export default function RootLayout() {
  const [showBackground, setShowBackground] = useState(true);

  const [fontsLoaded] = useFonts({
    Handlee_400Regular,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBackground(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!fontsLoaded || showBackground) {
    return (
      <ImageBackground source={image} style={styles.image}></ImageBackground>
    );
  }

  return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6b9b82",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "",
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="game"
          options={{
            title: "Playing",
          }}
        />
      </Stack>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "center",
  },
});

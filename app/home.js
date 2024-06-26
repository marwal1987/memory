import { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CustomButton from "../components/CustomButton";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require("../assets/images/water/20.jpg");

export default function Home() {
  const [level, setLevel] = useState("dev");
  const [theme, setTheme] = useState("default");
  const router = useRouter();

  async function pickImagesAndStartGame() {
    if (theme === "custom") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: 27,
      });

      if (!result.canceled) {
        const newImages = await Promise.all(
          result.assets.map(async (asset) => {
            const manipResult = await ImageManipulator.manipulateAsync(
              asset.uri,
              [{ resize: { width: 800 } }],
              { compress: 1, format: "png" }
            );
            return { uri: manipResult.uri };
          })
        );

        await AsyncStorage.setItem("customImages", JSON.stringify(newImages));
        router.push(`/game?level=${level}&theme=custom`);
      }
    } else {
      router.push(`/game?level=${level}&theme=${theme}`);
    }
  }

  return (
    <ImageBackground
      source={image}
      style={styles.bgImage}
      blurRadius={15}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={styles.h1}>Game settings</Text>

          <Text style={styles.h2}>Choose number of cards:</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={level}
            onValueChange={(itemValue) => setLevel(itemValue)}
          >
            <Picker.Item label="8 cards" value="dev" />
            <Picker.Item label="18 cards" value="easy" />
            <Picker.Item label="28 cards" value="medium" />
            <Picker.Item label="40 cards" value="hard" />
            <Picker.Item label="54 cards" value="advanced" />
          </Picker>

          <Text style={styles.h2}>Choose theme:</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={theme}
            onValueChange={(itemValue) => setTheme(itemValue)}
          >
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>

          {/* <Text style={styles.h2}>Choose players:</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={player}
            onValueChange={(itemValue) => setTheme(itemValue)}
          >
            <Picker.Item label="1 player" value="default" />
            <Picker.Item label="2 players" value="custom" />
          </Picker> */}
        </View>

        <CustomButton
          bgColor="#693e83"
          textColor="#eee"
          rounded={10}
          width="200px"
          onPress={pickImagesAndStartGame}
        >
          Start Game
        </CustomButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 48,
  },
  pickerContainer: {
    justifyContent: "start",
    gap: 12,
  },
  h1: {
    fontSize: 48,
    color: "#111901",
    fontFamily: "Handlee_400Regular",
  },
  h2: {
    fontSize: 24,
    color: "#111901",
    fontFamily: "Handlee_400Regular",
  },
  dropdown: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#693E83dd",
  },
  bgImage: {
    flex: 1,
    width: "100%",
  },
});

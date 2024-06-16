import { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
              [{ resize: { width: 160 } }],
              { compress: 1, format: "png" }
            );
            return { uri: manipResult.uri };
          })
        );

        await AsyncStorage.setItem("customImages", JSON.stringify(newImages));
        router.push(`/game?level=${level}&theme=custom`);
      }
    } else {
      // Om temat är default, navigera direkt till spelet utan att välja bilder
      router.push(`/game?level=${level}&theme=${theme}`);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Set level and theme</Text>

        <Text style={styles.h2}>Choose number of cards:</Text>
        <Picker
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
          selectedValue={theme}
          onValueChange={(itemValue) => setTheme(itemValue)}
        >
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>

      <View>
        <CustomButton
          bgColor="#e5dc7b"
          rounded={10}
          onPress={pickImagesAndStartGame}
        >
          Start Game
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // gap: 20,
    padding: 48,
  },
  h1: {
    fontSize: 36,
    marginBottom: 20,
    fontFamily: "Handlee_400Regular",
  },
  h2: {
    fontSize: 22,
    // marginBottom: 20,
    fontFamily: "Handlee_400Regular",
  },
});

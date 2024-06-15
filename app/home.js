import { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Home() {
  const [level, setLevel] = useState("easy");
  const [theme, setTheme] = useState("default");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.h1}>Set level and theme</Text>
      
      <Text style={styles.h2}>Choose number of cards:</Text>
      <Picker
        selectedValue={level}
        onValueChange={(itemValue) => setLevel(itemValue)}
      >
        <Picker.Item label="8 cards (dev)" value="dev" />
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
        <Picker.Item label="Custom (not supported yet)" value="custom" />
      </Picker>
      </View>

      <View>
      <CustomButton
        bgColor="#e5dc7b"
        rounded={10}
        onPress={() => router.push(`/game?level=${level}&theme=${theme}`)}
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

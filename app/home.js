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
      <Text style={styles.title}>Lorem ipsum...</Text>
      <Text>Choose Level:</Text>
      <Picker
        selectedValue={level}
        onValueChange={(itemValue) => setLevel(itemValue)}
      >
        <Picker.Item label="Level 1" value="easy" />
        <Picker.Item label="Level 2" value="medium" />
        <Picker.Item label="Level 3" value="hard" />
      </Picker>
      <Text>Choose Theme:</Text>
      <Picker
        selectedValue={theme}
        onValueChange={(itemValue) => setTheme(itemValue)}
      >
        <Picker.Item label="Default" value="default" />
      </Picker>
      <CustomButton
        bgColor="#9c64ce"
        rounded={10}
        onPress={() => router.push(`/game?level=${level}&theme=${theme}`)}
      >
        Start Game
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
  },
});

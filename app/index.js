import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CustomLink from "../components/CustomLink";

const image = require("../assets/images/goldengrass.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage} blurRadius={0}>
        <Text style={styles.largeText}>Play MEMORY with your Memories!</Text>
        <Text style={styles.mediumText}>
          Use your own photos and start playing!
        </Text>

        <CustomLink bgColor="#e5dc7b" width="200px" rounded={10} href={"/home"}>
          New Game
        </CustomLink>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeText: {
    fontSize: 36,
    fontFamily: "Handlee_400Regular",
    fontWeight: "bold",
    color: "#000",
    maxWidth: "80%",
    textAlign: "center",
  },
  mediumText: {
    fontSize: 24,
    color: "#222",
    fontFamily: "Handlee_400Regular",
    maxWidth: "80%",
    textAlign: "center",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    resizeMode: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 72,
  },
});

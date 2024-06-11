import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CustomLink from "../components/CustomLink";

const image = require("../assets/images/photos.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} blurRadius={6}>
        <Text style={styles.largeText}>Play MEMORY with your Memories!</Text>
        <Text style={styles.mediumText}>
          Use your own photos and start playing!
        </Text>
        {/* <Text style={styles.mediumText}>Structure your day!</Text> */}

        <CustomLink bgColor="#e8c128" width="200px" rounded={50} href={"/home"}>
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
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    gap: 72,
  },
});

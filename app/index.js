import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CustomLink from "../components/CustomLink";

const image = require("../assets/images/water/20.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage} blurRadius={5}>
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>Play MEMORY with your Memories!</Text>
          <Text style={styles.mediumText}>
            Use your own photos and start playing MEMORY!
          </Text>
        </View>

        <CustomLink
          bgColor="#693e83"
          textColor="#f1f1f1"
          width="200px"
          rounded={10}
          href={"/home"}
        >
          New Game
        </CustomLink>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  largeText: {
    fontSize: 36,
    fontFamily: "Handlee_400Regular",
    color: "#111901",
    maxWidth: "80%",
    textAlign: "center",
  },
  mediumText: {
    fontSize: 24,
    color: "#111901",
    fontFamily: "Handlee_400Regular",
    maxWidth: "80%",
    textAlign: "center",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    resizeMode: "center",
    justifyContent: "space-around",
    alignItems: "center",
    // gap: 80,
  },
});

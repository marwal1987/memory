import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CustomLink from "../components/CustomLink";

const image = require("../assets/images/mountain.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage} blurRadius={150}>
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>Play MEMORY with your Memories!</Text>
          <Text style={styles.mediumText}>
            Use your own photos and start playing MEMORY!
          </Text>
        </View>

        <CustomLink
          bgColor="#553355"
          textColor="#eee"
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
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "start",
    gap: 20,
  },
  largeText: {
    fontSize: 36,
    fontFamily: "Handlee_400Regular",
    color: "#eee",
    maxWidth: "80%",
    textAlign: "center",
  },
  mediumText: {
    fontSize: 24,
    color: "#eee",
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

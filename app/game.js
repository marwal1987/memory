import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "./imageAssets.js";
import CustomLink from "../components/CustomLink.js";
import CustomButton from "../components/CustomButton.js";

const image = require("../assets/images/white-pattern.jpg");

const levels = {
  dev: { numCards: 8, size: 165 },
  easy: { numCards: 18, size: 120 },
  medium: { numCards: 28, size: 95 },
  hard: { numCards: 40, size: 75 },
  advanced: { numCards: 54, size: 62 },
};

function generateBoard(level, customImages = null) {
  const { numCards } = levels[level];
  const numPairs = numCards / 2;
  const selectedImages = customImages
    ? customImages.slice(0, numPairs)
    : images.slice(0, numPairs);

  const cards = [...selectedImages, ...selectedImages].map((image, i) => ({
    id: i,
    image,
    flipped: false,
    matched: false,
  }));

  const shuffledCards = cards
    .sort(() => Math.random() - 0.5)
    .slice(0, numCards);

  return shuffledCards;
}

export default function Game() {
  const { level, theme } = useLocalSearchParams();
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [canInteract, setCanInteract] = useState(true);

  useEffect(() => {
    async function loadImages() {
      if (theme === "custom") {
        const storedImages = await AsyncStorage.getItem("customImages");
        if (storedImages) {
          const customImages = JSON.parse(storedImages);
          setBoard(generateBoard(level, customImages));
        }
      } else {
        setBoard(generateBoard(level));
      }
    }
    loadImages();
  }, [level, theme]);

  async function handleCardPress(index) {
    if (!canInteract) return;

    const newBoard = [...board];
    const card = newBoard[index];

    // Kontrollera om kortet redan är vänt eller redan matchat
    if (card.flipped || card.matched) return;

    // Vänd kortet
    card.flipped = true;
    setBoard(newBoard);
    setSelectedCards([...selectedCards, index]);

    // Om ett kort redan är valt, hantera matchningslogik
    if (selectedCards.length === 1) {
      setCanInteract(false);
      const [firstIndex] = selectedCards;
      const firstCard = newBoard[firstIndex];

      // Om korten matchar
      if (firstCard.image === card.image) {
        firstCard.matched = true;
        card.matched = true;
        setMatches(matches + 1);

        if (matches + 1 === Math.ceil(board.length / 2)) {
          setModalVisible(true);
        }
        setSelectedCards([]);
        setCanInteract(true);
      } else {
        // Om korten inte matchar, vänd tillbaka efter en viss tid och tillåt interaktion
        setTimeout(() => {
          firstCard.flipped = false;
          card.flipped = false;
          setBoard([...newBoard]);
          setSelectedCards([]);
          setCanInteract(true);
        }, 1600);
      }
    } else {
      // Om inget kort är valt, tillåt interaktion igen
      setCanInteract(true);
    }
  }

  function handleNewGame() {
    setBoard(
      generateBoard(
        level,
        theme === "custom" ? board.map((card) => card.image) : null
      )
    );
    setMatches(0);
    setModalVisible(false);
    setCanInteract(true);
  }

  const cardSize = levels[level].size;

  return (
    <ImageBackground source={image} style={styles.bgImage} blurRadius={50}>
      <View style={styles.container}>
        <View style={styles.board}>
          {board.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                card.flipped ? styles.flipped : styles.unflipped,
                { width: cardSize, height: cardSize },
              ]}
              onPress={() => handleCardPress(index)}
              disabled={!canInteract || card.flipped || card.matched}
            >
              {card.flipped || card.matched ? (
                <Image
                  source={card.image}
                  style={{ width: cardSize, height: cardSize }}
                />
              ) : (
                <Text style={styles.cardText}>?</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Congratulations! You completed the game!
            </Text>
            <CustomButton
              bgColor="#553355"
              textColor="#eee"
              onPress={handleNewGame}
              rounded={10}
            >
              Restart
            </CustomButton>
            <CustomLink
              bgColor="#255525"
              textColor="#eee"
              href={"/home"}
              rounded={10}
            >
              Home
            </CustomLink>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#434f22",
  },
  cardText: {
    fontSize: 48,
    fontFamily: "Handlee_400Regular",
    textAlign: "center",
    color: "#eee",
  },
  modalTitle: {
    fontSize: 48,
    fontFamily: "Handlee_400Regular",
    textAlign: "center",
    color: "#fff",
  },
  flipped: {
    backgroundColor: "#255525",
  },
  unflipped: {
    backgroundColor: "#553355",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 64,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    resizeMode: "center",
  },
});

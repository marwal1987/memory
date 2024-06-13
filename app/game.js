import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import images from "./imageAssets.js";
import CustomLink from "../components/CustomLink.js";
import CustomButton from "../components/CustomButton.js";

const levels = {
  dev: { numCards: 8, size: 160 },
  easy: { numCards: 18, size: 110 },
  medium: { numCards: 28, size: 91 },
  hard: { numCards: 40, size: 71 },
  advanced: { numCards: 54, size: 58 }
};

function generateBoard(level) {
  const { numCards } = levels[level];
  const numPairs = numCards / 2;
  const selectedImages = images.slice(0, numPairs);

  const cards = [...selectedImages, ...selectedImages].map((image, i) => ({
    id: i,
    image,
    flipped: false,
    matched: false,
  }));

  const shuffledCards = cards.sort(() => Math.random() - 0.5).slice(0, numCards);
  
  return shuffledCards;
}

export default function Game() {
  const { level, theme } = useLocalSearchParams();
  const [board, setBoard] = useState(generateBoard(level));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [canInteract, setCanInteract] = useState(true);

  function handleCardPress(index) {
    if (!canInteract) return;

    const newBoard = [...board];
    const card = newBoard[index];
    if (card.flipped || card.matched) return;

    card.flipped = true;
    setBoard(newBoard);
    setSelectedCards([...selectedCards, index]);

    if (selectedCards.length === 1) {
      setCanInteract(false);
      const [firstIndex] = selectedCards;
      const firstCard = board[firstIndex];

      if (firstCard.image === card.image) {
        firstCard.matched = true;
        card.matched = true;
        setMatches(matches + 1);
        setSelectedCards([]);
        setCanInteract(true); // Allow interaction after match

        if (matches + 1 === Math.ceil(board.length / 2)) {
          setModalVisible(true);
        }
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          card.flipped = false;
          setBoard([...newBoard]);
          setSelectedCards([]);
          setCanInteract(true);
        }, 1600);
      }
    }
  }

  function handleNewGame() {
    setBoard(generateBoard(level));
    setMatches(0);
    setModalVisible(false);
    setCanInteract(true);
  }

  const cardSize = levels[level].size;

  return (
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
            disabled={!canInteract || card.flipped || card.matched} // Disable interaction based on canInteract state and card state
            >
              {card.flipped || card.matched ? (
                <Image
                  source={card.image}
                  style={{ width: cardSize, height: cardSize }}
                />
              ) : (
                <Text style={styles.title}>?</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Congratulations! You completed the game!
            </Text>
            <CustomButton bgColor="#e5dc7b" onPress={handleNewGame} width="200px" rounded={10}>Restart</CustomButton>
            <CustomLink bgColor="#6b9b82" href={"/home"} width="200px" rounded={10}>Home</CustomLink>
          </View>
        </Modal>
    </View>
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
    elevation: 8,
    borderWidth: 1,
    borderColor: "#8ec4a8",
  },
  title: {
    fontSize: 48,
    fontFamily: "Handlee_400Regular",
    textAlign: "center",
    color: "#222",
  },
  modalTitle: {
    fontSize: 48,
    fontFamily: "Handlee_400Regular",
    textAlign: "center",
    color: "#fff",
  },
  flipped: {
    backgroundColor: "#e5dc7b",
  },
  unflipped: {
    backgroundColor: "#e5dc7b",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 64,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import images from "./imageAssets.js";

const levels = {
  easy: { rows: 4, cols: 3, size: 120 },
  medium: { rows: 7, cols: 5, size: 68 },
  hard: { rows: 9, cols: 6, size: 55 },
};

function generateBoard(level) {
  const { rows, cols } = levels[level];
  const numCards = (rows * cols) / 2;
  const selectedImages = images.slice(0, numCards);
  const cards = [...selectedImages, ...selectedImages].map((image, i) => ({
    id: i,
    image,
    flipped: false,
    matched: false,
  }));
  return cards.sort(() => Math.random() - 0.5);
}

export default function Game() {
  const { level, theme } = useLocalSearchParams();
  const [board, setBoard] = useState(generateBoard(level));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setElapsedTime(Date.now() - startTime);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [startTime]);

  function handleCardPress(index) {
    const newBoard = [...board];
    const card = newBoard[index];
    if (card.flipped || card.matched) return;

    card.flipped = true;
    setBoard(newBoard);
    setSelectedCards([...selectedCards, index]);

    if (selectedCards.length === 1) {
      const [firstIndex] = selectedCards;
      const firstCard = board[firstIndex];

      if (firstCard.image === card.image) {
        firstCard.matched = true;
        card.matched = true;
        setMatches(matches + 1);
        setSelectedCards([]);

        if (matches + 1 === board.length / 2) {
          setModalVisible(true);
        }
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          card.flipped = false;
          setBoard([...newBoard]);
          setSelectedCards([]);
        }, 1000);
      }
    }
  }

  function handleNewGame() {
    setBoard(generateBoard(level));
    setMatches(0);
    setElapsedTime(0);
    // setStartTime(Date.now());
    setModalVisible(false);
  }

  const cardSize = levels[level].size;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.timer}>Time: {Math.floor(elapsedTime / 1000)} seconds</Text> */}
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
          <Text style={styles.title}>
            Congratulations! You completed the game!
          </Text>
          <Button title="New Game" onPress={handleNewGame} />
          <Button title="Home" onPress={() => router.push("/home")} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerStats: {
    // padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: "#f1f1f1",
  },
  timer: {
    textAlign: "right",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 20,
  },
  flipped: {
    backgroundColor: "#e8c128",
  },
  unflipped: {
    backgroundColor: "#9c64ce",
  },
  image: {
    resizeMode: "cover",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 55,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

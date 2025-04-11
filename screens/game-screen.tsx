import NumberContainer from "@/components/game/number-container";
import Card from "@/components/ui/card";
import InstructionText from "@/components/ui/instruction-text";
import PrimaryButton from "@/components/ui/primary-button";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "@/components/game/guess-log-item";
import Title from "@/components/ui/title";

function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = (props: {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
}) => {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "greater" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  useEffect(() => {
    if (currentGuess === props.userNumber) props.onGameOver(guessRounds.length);
  }, [currentGuess, props.userNumber, props.onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower
        </InstructionText>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="add" size={24} color={"white"} />
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="remove" size={24} color={"white"} />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 600) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          {/* <View style={styles.buttonContainer}> */}
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="add" size={24} color={"white"} />
          </PrimaryButton>
          {/* </View> */}
          <NumberContainer>{currentGuess}</NumberContainer>
          {/* <View style={styles.buttonContainer}> */}
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="remove" size={24} color={"white"} />
          </PrimaryButton>
          {/* </View> */}
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((round) => (
          <Text key={round}>{round}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item) => `${item}`}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

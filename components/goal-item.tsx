import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = (props: {
  text: string;
  onDeleteItem: (goalId: string) => void;
  id: string;
}) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={() => props.onDeleteItem(props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "#ffffff",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

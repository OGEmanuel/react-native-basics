import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "../../components/goal-item";
import GoalInput from "@/components/goal-input";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const [modalIsvisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState<any[]>([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const addGoalHandler = (enteredGoalText: string) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  };

  const deleteGoalHandler = (goalId: string) => {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((goal) => goal.id !== goalId)
    );
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#5e0acc"}
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoalHandler={addGoalHandler}
          visible={modalIsvisible}
          setModalIsVisible={setModalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});

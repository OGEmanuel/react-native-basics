import IconButton from "@/components/icon-button";
import List from "@/components/meal-detail/list";
import Subtitle from "@/components/meal-detail/subtitle";
import MealDetails from "@/components/meal-details";
import { MEALS } from "@/data/dummy-data";
import { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MealDetailsScreen = (props: { route: any; navigation: any }) => {
  const mealId = props.route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const headerButtonPressHandler = () => {
    console.log("Pressed!");
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        // return <Button title="Tap me!" onPress={headerButtonPressHandler} />;
        return (
          <IconButton
            icon={"star"}
            color="white"
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [props.navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal?.title}</Text>
      <MealDetails
        affordability={selectedMeal?.affordability as string}
        complexity={selectedMeal?.affordability as string}
        duration={selectedMeal?.duration as number}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal?.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal?.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

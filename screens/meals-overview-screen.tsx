import MealItem from "@/components/meal-item";
import { CATEGORIES, MEALS } from "@/data/dummy-data";
import Meal from "@/models/meal";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MealsOverviewScreen = (props: { route: any; navigation: any }) => {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    )?.title;

    props.navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, props.navigation]);

  const renderMealItem = (itemData: Meal) => {
    return (
      <MealItem
        title={itemData.title}
        imageUrl={itemData.imageUrl}
        affordability={itemData.affordability}
        complexity={itemData.complexity}
        duration={itemData.duration}
        id={itemData.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => renderMealItem(itemData.item)}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

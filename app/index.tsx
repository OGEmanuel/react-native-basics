import { Button, StyleSheet, Text } from "react-native";
import CategoriesScreen from "@/screens/categories-screen";
import * as SystemUI from "expo-system-ui";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "@/screens/meals-overview-screen";
import MealDetailsScreen from "@/screens/meal-details-screen";

const Stack = createNativeStackNavigator();

const App = () => {
  SystemUI.setBackgroundColorAsync("#24180f");

  return (
    // <NavigationContainer>
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#351401",
          },
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: "#3f2f25",
          },
        }}
      >
        <Stack.Screen
          name="MealsCategories"
          component={CategoriesScreen}
          options={{
            title: "All Categories",
          }}
        />
        <Stack.Screen
          name="MealsOverview"
          component={MealsOverviewScreen}
          // options={({ route, navigation }) => {
          //   const catId = route?.params?.categoryId;
          //   return {
          //     title: catId,
          //   };
          // }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailsScreen}
          // options={{
          //   headerRight: () => {
          //     return <Button title="Tap me!" />;
          //   },
          // }}
        />
      </Stack.Navigator>
    </>
    // </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});

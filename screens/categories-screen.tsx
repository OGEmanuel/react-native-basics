import CategoryGridTile from "@/components/category-grid-tile";
import { CATEGORIES } from "@/data/dummy-data";
import { FlatList } from "react-native";

interface Category {
  id: string;
  title: string;
  color: string;
}

const CategoriesScreen = (props: { navigation: any }) => {
  const renderCategoryItem = (item: Category) => {
    const pressHandler = () => {
      props.navigation.navigate("MealsOverview", {
        categoryId: item.id,
      });
    };

    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => renderCategoryItem(itemData.item)}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

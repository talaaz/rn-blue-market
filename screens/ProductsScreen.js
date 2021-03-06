import React, { useState, useEffect } from "react";
import { Title } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { firebase } from "../firebase";
//Helper component
import ProductItem from "../components/ProductItem";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../store/actions/products";
import * as cartActions from "../store/actions/cart";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";

const ProductsScreen = (props) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  //get products from store
  const productss = useSelector((state) => state.products.availableProducts);

  //dispatch actions
  const dispatch = useDispatch();

  //dipatch the action of fething products
  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);
  //set the initial value of picker to products
  useEffect(() => {
    setSelectedValue(productss);
  }, [productss]);

  //functions to sort products by price in ascending and descending orders
  const productssAscending = productss.slice(0).sort((a, b) => {
    return parseFloat(a.price) - parseFloat(b.price);
  });
  const productssDescending = productss.slice(0).sort((a, b) => {
    return parseFloat(b.price) - parseFloat(a.price);
  });

  //Refresh the screen to fetch new changes from products
  const onRefresh = () => {
    setRefreshing(true);

    dispatch(productActions.fetchProducts());

    setRefreshing(false);
  };

  //UI of drop down menu and flatlist
  return (
    <View style={styles.screen}>
      <View style={styles.itemContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item key={"unselectable"} label="Sort By" value={productss} />
          <Picker.Item label="Low to High" value={productssAscending} />
          <Picker.Item label="High to Low" value={productssDescending} />
        </Picker>
      </View>

      <FlatList
        data={selectedValue}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onViewDetail={() => {
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              console.log("product screen");
              console.log(itemData.item);
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

//Navigation to add header icons
ProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Blue Market",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("Basket");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
  },
});

export default ProductsScreen;

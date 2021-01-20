/*Here the detail of products are shown */
import React from "react";
import { Button } from "react-native";
import {
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as cartActions from "../store/actions/cart";
import Colors from "../constants/Colors";

const ProductDetailsScreen = (props) => {
  //get data out of store
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  //select the product which user has clicked on
  const productId = props.navigation.getParam("productId");
  const selectedProducts = availableProducts.find(
    (prod) => prod.id === productId
  );

  const dispatch = useDispatch();

  //UI
  return (
    <ScrollView>
      <Image source={{ uri: selectedProducts.imageUrl }} style={styles.image} />

      <View style={styles.descriptionContainer}>
        <Text>{selectedProducts.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.price}>{selectedProducts.price} Kr.</Text>
        <Button
          title="Add to basket"
          color={Colors.primaryColor}
          onPress={() => {
            console.log("detail screen ");
            console.log(selectedProducts);
            if (typeof selectedProducts !== null) {
              dispatch(cartActions.addToCart(selectedProducts));
            } else {
              console.log("error ya tala");
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer2}>
        <Button
          title="Open Map"
          color={Colors.primaryColor}
          onPress={() => {
            props.navigation.navigate("Map", {
              CondLat: selectedProducts.lat,
              CondLong: selectedProducts.long,
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

//Make the title as the clicked product's title
ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),

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

//Style
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  descriptionContainer: {
    paddingTop: 5,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 5,
  },
  price: {
    fontSize: 18,
  },
  map: {
    height: 300,
    width: "100%",
  },
  buttonContainer2: {
    justifyContent: "space-between",
    margin: 20,
    width: "90%",
  },
});

export default ProductDetailsScreen;

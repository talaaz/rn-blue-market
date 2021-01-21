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

import { StyleSheet, View, FlatList } from "react-native";

const ProductsScreen = (props) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const productss = useSelector((state) => state.products.availableProducts);
  console.log("type:");
  console.log(typeof productss);
  console.log("productss");

  const productssAscending = productss.slice(0).sort((a, b) => {
    return parseFloat(a.price) - parseFloat(b.price);
  });
  const productssDescending = productss.slice(0).sort((a, b) => {
    return parseFloat(b.price) - parseFloat(a.price);
  });

  const [selectedValue, setSelectedValue] = useState(productssAscending);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        setUsername(user.displayName);
        console.log(username);
      } else {
        // No user is signed in.
        setUsername("");

        console.log("Not signed in");
      }
      setUser(user);
    });
  }, []);

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  return (
    <View style={styles.list}>
      {/*<Title> {"Welcome " + username + "!"}</Title>*/}
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Sort By" value={productss} />
        <Picker.Item label="Low to High" value={productssAscending} />
        <Picker.Item label="High to Low" value={productssDescending} />
      </Picker>

      <FlatList
        data={selectedValue}
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
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductsScreen;

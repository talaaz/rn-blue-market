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

import { StyleSheet, View, FlatList } from "react-native";
import Colors from "../constants/Colors";

const UserProductsScreen = (props) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const productss = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        setUserId(user.uid);
        console.log(uid);
      } else {
        // No user is signed in.
        setUserId("");

        console.log("Not signed in");
      }
      setUser(user);
    });
  }, []);

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const productssById = productss.filter(
    (prod) => prod.ownerId === userId // "lGKJj6DwSseN3Jzm3jjrnZx1uiO2"
  );
  console.log(productssById);

  return (
    <View style={styles.list}>
      {/*<Title> {"Welcome " + username + "!"}</Title>*/}
      <FlatList
        data={productssById}
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

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Products",
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
          title="AddItem"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate("Sell");
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
    backgroundColor: Colors.backgroundColor,
  },
});

export default UserProductsScreen;

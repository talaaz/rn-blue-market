
import React, { useContext, useReducer, useState, useEffect } from "react";

import { Title } from "react-native-paper";
import ProductItem from "../components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as basketActions from "../store/actions/basket";


import { firebase } from "../firebase";

import * as productActions from "../store/actions/products"
import { firebase } from "../firebase";



const ProductsScreen = (props) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.



        setUsername(user.displayName);

        setUser(user);
        console.log(username);
      } else {
        // No user is signed in.
      }
    });
  });

    useEffect(() => {
      dispatch(productActions.fetchProducts());
    },  [dispatch]);



  return (
    <View style={styles.list}>
      <Title> {"Welcome " + username + "!"}</Title>
      <FlatList
        data={products}
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
            onAddToBasket={() => {
              dispatch(basketActions.addToBasket(itemData.item));
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductsScreen;

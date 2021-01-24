import React, { useState, useEffect } from "react";
import { Title } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { firebase } from "../firebase";
//Helper component
import UserProductItem from "../components/UserProductItem";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../store/actions/products";

import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import Colors from "../constants/Colors";

//await db.collection('product').doc('DC').delete();

const UserProductsScreen = (props) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  //get data from store
  const productss = useSelector((state) => state.products.availableProducts);
  //dispatch action
  const dispatch = useDispatch();
  //get the current user's id
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
  //fetch products
  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);
  //filter products matching the user's id
  const productssById = productss.filter(
    (prod) => prod.ownerId === userId // "lGKJj6DwSseN3Jzm3jjrnZx1uiO2"
  );

  const onRefresh = () => {
    setRefreshing(true);

    dispatch(productActions.fetchProducts());

    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={productssById}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <UserProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            description={itemData.item.description}
            onDelete={() => {
              //dispatch(cartActions.addToCart(itemData.item.id));
              //Delete product-folder from storage.

              let storageRef = firebase.storage().ref();

              //delete image.
              storageRef
                .child(`product/${itemData.item.id}/image.jpg`)
                .delete();
              //delete folder.
              storageRef.child(`product/${itemData.item.id}`).delete();
              //Delete product from firestore.

              firebase
                .firestore()
                .collection("product")
                .doc(itemData.item.id)
                .delete();

              onRefresh();
            }}
          />
        )}
      />
    </SafeAreaView>
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

import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
//GET DATA OUT OF STORE
import { useSelector, useDispatch } from "react-redux";
//GET HELPER COMPONENTS
import BasketItem from "../components/BasketItem";
import * as cartActions from "../store/actions/cart";
const BasketScreen = (props) => {
  //get data out of store
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartIems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        quantity: state.cart.items[key].quantity,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          Subtotal:
          <Text style={styles.itemAmount}>{totalAmount.toFixed(2)}Kr.</Text>
        </Text>

        <Button
          title="Checkout"
          disabled={cartIems.length === 0}
          onPress={() => {
            props.navigation.navigate("Payment");
          }}
        />
      </View>
      <FlatList
        data={cartIems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <BasketItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.deleteFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

BasketScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Shopping Basket",
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  itemText: {
    fontSize: 18,
  },
  itemAmount: {
    color: Colors.primaryColor,
  },
});

export default BasketScreen;

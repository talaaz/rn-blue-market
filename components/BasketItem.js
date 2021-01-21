import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

const BasketItem = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.qty}>{props.quantity}x</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.amount}>{props.amount}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.onRemove}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    margin: 8,
  },
  onRemove: {
    margin: 10,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    margin: 10,
  },
  title: {},
  amount: {},
});

export default BasketItem;

import React from "react";
import { View, Text, StyleSheet, ImageBackground, Button } from "react-native";
import Colors from "../constants/Colors";

const ProductItem = (props) => {
  return (
    <View style={styles.productItem}>
      <View style={{ ...styles.productRow, ...styles.productHeader }}>
        <ImageBackground source={{ uri: props.image }} style={styles.image}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{ ...styles.productRow, ...styles.productDetail }}>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            color={Colors.primaryColor}
            borderRadius={6}
            title="add to basket"
            onPress={props.onAddToCart}
          />
          <Text>{props.price.toFixed(2)}Kr.</Text>
          <Button
            style={styles.button}
            color={Colors.primaryColor}
            borderRadius={6}
            title="details"
            onPress={props.onViewDetail}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productRow: {
    flexDirection: "row",
  },
  productItem: {
    height: 300, //dynamic with dimensions API
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    margin: 20,
  },
  productDetail: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
  },
  productHeader: {
    height: "85%",
  },
  titleContainer: {
    backgroundColor: "rgba(100, 60, 164,0.5)",
    paddingVertical: 6.9,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-end",
  },
});

export default ProductItem;

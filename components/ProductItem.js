import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import { Card } from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const ProductItem = (props) => {
  return (
    <View>
      <Card>
        <Card.Title numberOfLines={1}>{props.title}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: props.image }} />
        <Card.Divider />

        <Card.Divider />
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            color={Colors.primaryColor}
            borderRadius={6}
            title="add to basket"
            onPress={props.onAddToCart}
          />
          <Text>{props.price}Kr.</Text>
          <Button
            style={styles.button}
            color={Colors.primaryColor}
            borderRadius={6}
            title="details"
            onPress={props.onViewDetail}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});

export default ProductItem;

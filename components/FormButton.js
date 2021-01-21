/*
https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
*/
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("screen");

export default function FormButton({ title, modeValue, ...rest }) {
  return (
    <Button
      mode={modeValue}
      color={Colors.primaryColor}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
});

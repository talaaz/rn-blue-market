/*
https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
*/
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("screen");

export default function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      mode="outlined"
      {...rest}
      theme={{
        colors: {
          placeholder: Colors.primaryColor,
          text: Colors.primaryColor,
          primary: Colors.primaryColor,
          underlineColor: Colors.primaryColor,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});

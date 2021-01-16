import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import FormInput from "../components/FormInput";

const PaymentScreen = (props) => {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.textInput}>
      <FormInput
        style={styles.textInput}
        theme={{
          colors: {
            placeholder: Colors.primaryColor,
            text: Colors.primaryColor,
            primary: Colors.primaryColor,
            underlineColor: Colors.primaryColor,
          },
        }}
        textContentType="emailAddress"
        label="Email"
        placeholder="user@gmail.com"
        mode="outlined"
        onChangeText={(emailText) => setText(emailText)}
      />
      <FormInput
        style={styles.textInput}
        theme={{
          colors: {
            placeholder: Colors.primaryColor,
            text: Colors.primaryColor,
            primary: Colors.primaryColor,
            underlineColor: Colors.primaryColor,
          },
        }}
        label="Full Name"
        mode="outlined"
        onChangeText={(nametext) => setText(nametext)}
      />
      <FormInput
        style={styles.textInput}
        theme={{
          colors: {
            placeholder: Colors.primaryColor,
            text: Colors.primaryColor,
            primary: Colors.primaryColor,
            underlineColor: Colors.primaryColor,
          },
        }}
        label="Phone number"
        keyboardType="numeric"
        maxLength={8}
        mode="outlined"
        onChangeText={(phoneNumber) => setText(phoneNumber)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 5,
    padding: 10,
  },
});

export default PaymentScreen;

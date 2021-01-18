import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import Colors from "../constants/Colors";
import FormInput from "../components/FormInput";
import CreditCardDisplay from "react-native-credit-card-display";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch } from "react-redux";
import * as cartActions from "../store/actions/cart";

const PaymentScreen = (props) => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const cartItems = props.navigation.getParam("cartItems");
  const totalAmount = props.navigation.getParam("totalAmount");

  const dispatch = useDispatch();

  return (
    <View>
      <ScrollView>
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
          label="Email"
          mode="outlined"
          onChangeText={(hehe) => setText(hehe)}
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
          label="Name"
          value={fullName}
          mode="outlined"
          onChangeText={(cartName) => setFullName(cartName)}
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
          label="number"
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          mode="outlined"
          onChangeText={(cardNum) => setCardNumber(cardNum)}
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
          label="cvc"
          keyboardType="numeric"
          maxLength={3}
          value={cvcNumber}
          mode="outlined"
          onChangeText={(cvcNum) => setCvcNumber(cvcNum)}
        />

        <CreditCardDisplay
          cardStyles={{ marginHorizontal: 40 }}
          number={cardNumber}
          cvc={cvcNumber}
          expiration="04/11"
          name={fullName}
        />
        <Button
          color={Colors.primaryColor}
          borderRadius={6}
          margin={10}
          padding={20}
          width={40}
          title={"confirm"}
          onPress={() => {
            dispatch(cartActions.resetCart(cartItems, totalAmount));
          }}
        />
      </ScrollView>
    </View>
  );
};

PaymentScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Checkout",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="done"
          iconName="ios-home"
          onPress={() => {
            // delete resetCart

            navData.navigation.navigate("Products");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textInput: {
    marginHorizontal: 10,
    padding: 10,
  },
});

export default PaymentScreen;

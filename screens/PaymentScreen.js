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
import FormButton from "../components/FormButton";

const PaymentScreen = (props) => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const cartItems = props.navigation.getParam("cartItems");
  const totalAmount = props.navigation.getParam("totalAmount");

  const [isValidCartName, setValidCartName] = useState(false);
  const [isValidCartCvc, setValidCartCvc] = useState(false);
  const [isValidCartNumber, setValidCartNumber] = useState(false);

  const dispatch = useDispatch();

  const nameHandler = (cartName) => {
    if (cartName.lenght === 0) {
      setValidCartName(false);
    } else {
      setValidCartName(true);
    }
    setFullName(cartName);
  };

  const cvcHandler = (cvcNum) => {
    if (cvcNum.lenght < 3) {
      setValidCartCvc(false);
    } else {
      setValidCartCvc(true);
    }
    setCvcNumber(cvcNum);
  };

  const numHandler = (cardNum) => {
    if (cardNum.lenght < 16) {
      setValidCartNumber(false);
    } else {
      setValidCartNumber(true);
    }
    setCardNumber(cardNum);
  };

  return (
    <View>
      <ScrollView>
        <FormInput
          style={styles.textInput}
          autoCapitalize="characters"
          label="Name"
          value={fullName}
          onChangeText={nameHandler}
        />
        {!isValidCartName && <Text>Name is not valid!</Text>}

        <FormInput
          style={styles.textInput}
          label="number"
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={numHandler}
        />
        {!isValidCartNumber && <Text>Number is 16 ints!</Text>}

        <FormInput
          style={styles.textInput}
          label="cvc"
          keyboardType="numeric"
          maxLength={3}
          value={cvcNumber}
          onChangeText={cvcHandler}
        />
        {!isValidCartCvc && <Text>Cvc is 3 ints!</Text>}

        <CreditCardDisplay
          cardStyles={{ marginHorizontal: 50 }}
          number={cardNumber}
          cvc={cvcNumber}
          expiration="04/11"
          name={fullName}
        />
        <View style={styles.buttonContainer}>
          <FormButton
            title={"confirm"}
            onPress={() => {
              if (!isValidCartName || !isValidCartCvc || !isValidCartNumber) {
                Alert.alert("Invalid Input!", "Check your info...", [
                  { text: "Ok!", style: "cancel" },
                ]);
                return;
              } else {
                dispatch(cartActions.resetCart(cartItems, totalAmount));
              }
            }}
          />
        </View>
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
  buttonContainer: {
    justifyContent: "space-between",
    margin: 20,
    width: "90%",
  },
});

export default PaymentScreen;

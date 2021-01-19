/*
https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
*/
import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Snackbar } from "react-native-paper";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";
import { firebase } from "../firebase";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const login = async (email, password) => {
    setLoading(true);

    //TODO Firebase Login check
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...
        console.log("Signed in");
        navigation.navigate("Home");
      })
      .catch((error) => {
        setVisible(true);
        setErrorMessage(error.message);
        console.log(error);
      });

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome!</Title>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        labelName="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton
        title="Login"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => login(email, password)}
      />
      <FormButton
        title="Sign up here"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate("Sign up")}
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
          onPress: () => {
            // Do something
          },
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
}

LoginScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Blue Market",
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
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

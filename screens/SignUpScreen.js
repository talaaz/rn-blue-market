import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Title, Text, Avatar, Snackbar } from "react-native-paper";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

import { firebase } from "../firebase";
const defaultPic = require("../assets/default_profile_pic.jpg");

export default function SignupScreen({ navigation }) {
  const [profilePic, setProfilePic] = useState(defaultPic);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          credential.user
            .updateProfile({ firstName: firstName, lastName: lastName })
            .then(async () => {
              // Go back to log in screen after succesfully created an user.
              navigation.goBack();
            });
        });
    } catch (e) {
      setVisible(true);
      setErrorCode(e.code);
      setErrorMessage(e.message);
      console.log(e);
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={profilePic}></Avatar.Image>
      <Title style={styles.titleText}>Let's get started!</Title>
      <FormInput
        labelName="Firstname"
        value={firstName}
        autoCapitalize="none"
        onChangeText={(userFirstName) => setFirstName(userFirstName)}
      />
      <FormInput
        labelName="Lastname"
        value={lastName}
        autoCapitalize="none"
        onChangeText={(userLastName) => setLastName(userLastName)}
      />
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
        title="Signup"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => register(firstName, lastName, email, password)}
      />
      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#5b3a70"
        onPress={() => navigation.goBack()}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});

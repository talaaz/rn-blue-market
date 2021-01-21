import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { firebase } from "../firebase";
import {
  Portal,
  TextInput,
  Dialog,
  Button,
  Paragraph,
  Caption,
} from "react-native-paper";
import FormInput from "../components/FormInput";

export default ReauthenticationDialog = ({ dismiss, ...rest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (email, password) => {
    //TODO Firebase Login check
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
        console.log("Re-authentication successful");
        dismiss();
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  return (
    <Portal>
      <Dialog onDismiss={dismiss} {...rest}>
        <Dialog.Title>Re-authentication</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Your account needs re-authentication in order to continue.
          </Paragraph>
          <Caption>{errorMessage}</Caption>
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
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={dismiss}>Dismiss</Button>
          <Button onPress={() => login(email, password)}>Log in</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

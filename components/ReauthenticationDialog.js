import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { firebase } from "../firebase";
import {
  Portal,
  TextInput,
  Dialog,
  Button,
  Paragraph,
} from "react-native-paper";
import FormInput from "../components/FormInput";

export default ReauthenticationDialog = ({ dismiss, ...rest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    //TODO Firebase Login check

    // Prompt the user to re-provide their sign-in credentials
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user, credential }) => {
        // Signed in
        // ...
        user
          .reauthenticateWithCredential(credential)
          .then(function () {
            // User re-authenticated.
            console.log("Re-authentication successful");
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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

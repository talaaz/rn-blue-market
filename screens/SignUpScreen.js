/*
 Acknowlegdement:
 For design: https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
 For uploadImage: https://github.com/SimCoderYoutube/InstagramClone/blob/master/frontend/components/main/Save.js

C:/Users/Valde/Documents/LAPTOP-PLFGULU9/Documents/It-elektronik/5. Semester/Selvstudie i Mobilapplikationsudvikling/BlueMarket/rn-blue-market/assets/default_profile_pic.jpg
*/

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { IconButton, Title, Text, Avatar, Snackbar } from "react-native-paper";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

import { firebase } from "../firebase";

export default function SignupScreen({ navigation }) {
  const [credential, setCredential] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await firebase
        .storage()
        .ref()
        .child("default_profile_pic.jpg")
        .getDownloadURL()
        .then((url) => {
          setProfilePic(url);
        });
    }
    fetchData();
  });

  const onDismissSnackBar = () => setVisible(false);

  const uploadImage = async () => {
    const childPath = `users/${firebase.auth().currentUser.uid}/profilepic.jpg`;
    console.log(childPath);

    const response = await fetch(profilePic);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((url) => {
        setProfilePic(url);
        console.log(url);
      });
    };

    const taskError = (snapshot) => {
      setVisible(true);
      setErrorCode(snapshot.error.code);
      setErrorMessage(snapshot.error.message);
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          uploadImage();
          credential.user
            .updateProfile({
              displayName: firstName + " " + lastName,
              photoURL: profilePic,
            })
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
      <Avatar.Image size={100} source={{ uri: profilePic }}></Avatar.Image>
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

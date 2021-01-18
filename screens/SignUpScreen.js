/*
 Acknowlegdement:
 For design: https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
 For uploadImage: https://github.com/SimCoderYoutube/InstagramClone/blob/master/frontend/components/main/Save.js

C:/Users/Valde/Documents/LAPTOP-PLFGULU9/Documents/It-elektronik/5. Semester/Selvstudie i Mobilapplikationsudvikling/BlueMarket/rn-blue-market/assets/default_profile_pic.jpg
*/

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { IconButton, Title, Text, Avatar, Snackbar } from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

import { firebase } from "../firebase";

export default function SignupScreen({ navigation }) {
  const [
    camPermission,
    askForCameraPermission,
    getCameraPermission,
  ] = Permissions.usePermissions(Permissions.CAMERA, { ask: true });

  const [
    storagePermission,
    askForStoragePermission,
    getStoragePermission,
  ] = Permissions.usePermissions(Permissions.MEDIA_LIBRARY, { ask: true });

  const [credential, setCredential] = useState(null);
  const [localProfileURL, setLocalProfileURL] = useState("");
  const [cloudProfileURL, setCloudProfileURL] = useState();

  const [defaultPic, setDefaultPic] = useState(true);
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
    (async () => {
      // Fetch cloud based profilePic.
      if (defaultPic) {
        await firebase
          .storage()
          .ref()
          .child("images/profilepic.jpg")
          .getDownloadURL()
          .then((url) => {
            setProfilePic(url);
          });
      }
    })();
  });

  const onDismissSnackBar = () => setVisible(false);

  const takePictureWithCamera = async () => {
    console.log("Opening Camera");
    if (!camPermission || camPermission.status !== "granted") {
      setVisible(true);
      setErrorMessage("Permission for accessing phone camera wasn't granted");
      return;
    }
    //Permission granted open camera.
  };

  const fetchPictureFromGallery = async () => {
    // Check media storage permissions. Send snackbar error if not given.
    console.log("Opening Gallery");
    if (!storagePermission || storagePermission.status !== "granted") {
      setVisible(true);
      setErrorMessage("Permission for accessing phone storage wasn't granted");
      return;
    }
    //Permission granted open image-picker.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setDefaultPic(false);
      setProfilePic(result.uri);
    }
  };

  const uploadImage = async () => {
    const childPath = `users/${
      firebase.auth().currentUser.uid
    }/profile/profilepic.jpg`;
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
      <View style={styles.imageContainer}>
        <Avatar.Image size={100} source={{ uri: profilePic }}></Avatar.Image>
      </View>
      <View style={styles.linkContainer}>
        <Text onPress={() => takePictureWithCamera()} style={styles.linkText}>
          {"Take picture"}
        </Text>
        <Text onPress={() => fetchPictureFromGallery()} style={styles.linkText}>
          {"Get picture from Gallery"}
        </Text>
        <Text onPress={() => setDefaultPic(true)} style={styles.linkText}>
          {"Set default picture"}
        </Text>
      </View>
      <View style={styles.formContainer}>
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
      </View>
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
  imageContainer: {
    alignItems: "center",
  },
  linkContainer: {
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
  },

  formContainer: {
    alignItems: "center",
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },

  linkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
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

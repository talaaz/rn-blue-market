import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  Title,
  Subheading,
  Text,
  Avatar,
  Snackbar,
  Button,
} from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

import { firebase } from "../firebase";

const { width, height } = Dimensions.get("screen");

const UserProfileScreen = (props) => {
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

  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [newProfileURL, setNewProfileURL] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [visible, setVisible] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setSigned(true);
        setProfileURL(user.photoURL);
        setUsername(user.displayName);
        setEmail(user.email);
        setUser(user);
        console.log("Signed in");
      } else {
        // No user is signed in.
        setSigned(false);
        setUser(null);
        console.log("Not signed in");
      }
    });
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

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setNewProfileURL(result.uri);
      setProfileURL(result.uri);
    }
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setNewProfileURL(result.uri);
      setProfileURL(result.uri);
    }
  };

  if (!signed) {
    return (
      <View style={styles.container}>
        <Title>Not Logged In</Title>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>Update account information</Title>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <View style={styles.imageContainer}>
          <Subheading>Update profile picture</Subheading>
          <Avatar.Image size={100} source={{ uri: profileURL }}></Avatar.Image>

          <Text onPress={() => takePictureWithCamera()} style={styles.linkText}>
            {"Take picture"}
          </Text>
          <Text
            onPress={() => fetchPictureFromGallery()}
            style={styles.linkText}
          >
            {"Get picture from Gallery"}
          </Text>
          <Button
            mode="outlined"
            style={styles.formButton}
            contentStyle={styles.formButtonContainer}
            labelStyle={styles.formButtonLabel}
            onPress={() => {
              console.log("Change Profile pic");
            }}
          >
            {"Change Picture"}
          </Button>
        </View>
        <View style={styles.contentContainer}>
          <Subheading>Change your email-address</Subheading>
          <FormInput
            labelName="Email"
            mode={"outlined"}
            value={newEmail}
            placeholder={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setNewEmail(userEmail)}
          />
          <Button
            mode="outlined"
            style={styles.formButton}
            contentStyle={styles.formButtonContainer}
            labelStyle={styles.formButtonLabel}
            onPress={() => {
              // Re-authenticate.

              user
                .updateEmail(newEmail)
                .then(function () {
                  // Update successful.
                  setVisible(true);
                  setErrorMessage("Email succesfully updated");
                })
                .catch(function (error) {
                  // An error happened.
                  setVisible(true);
                  setErrorMessage(error.message);
                });
            }}
          >
            {"Change email"}
          </Button>
        </View>
        <View style={styles.contentContainer}>
          <Subheading>Change your accounts username</Subheading>
          <FormInput
            labelName="Username"
            mode={"outlined"}
            placeholder={username}
            value={newUsername}
            autoCapitalize="none"
            onChangeText={(userUsername) => setNewUsername(userUsername)}
          />
          <Button
            mode="outlined"
            style={styles.formButton}
            contentStyle={styles.formButtonContainer}
            labelStyle={styles.formButtonLabel}
            onPress={() => {
              user
                .updateProfile({
                  displayName: newUsername,
                })
                .then(function () {
                  // Update successful.
                  setVisible(true);
                  setErrorMessage("Username succesfully updated");
                })
                .catch(function (error) {
                  // An error happened.
                  setVisible(true);
                  setErrorMessage(error.message);
                });
            }}
          >
            {"Update username"}
          </Button>
        </View>
        <View style={styles.contentContainer}>
          <Subheading>Change your password</Subheading>
          <FormInput
            labelName="Password"
            mode={"outlined"}
            placeholder={password}
            value={newPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(userPassword) => setNewPassword(userPassword)}
          />
          <Button
            mode="outlined"
            style={styles.formButton}
            contentStyle={styles.formButtonContainer}
            labelStyle={styles.formButtonLabel}
            onPress={() => {
              // Re-authenticate.
              user
                .updatePassword(newPassword)
                .then(function () {
                  // Update successful.
                  setVisible(true);
                  setErrorMessage("Password succesfully updated");
                })
                .catch(function (error) {
                  // An error happened.
                  setVisible(true);
                  setErrorMessage(error.message);
                });
            }}
          >
            {"Change password"}
          </Button>
        </View>
        <View style={styles.contentContainer}>
          <Subheading>Change account information</Subheading>
        </View>

        <View style={styles.contentContainer}>
          <Button
            mode="outlined"
            style={styles.formButton}
            contentStyle={styles.formButtonContainer}
            labelStyle={styles.formButtonLabel}
            onPress={() => {
              // Double check.
              // Re-authenticate.
              // Remove Firestore documents.
              // Remove Storage material.
              // Delete user.
              setVisible(true);
              setErrorMessage("User is deleted ;)");
            }}
          >
            {"Delete account"}
          </Button>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User settings",
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  settingsContainer: {
    padding: 25,
    width: width,
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
  },

  formContainer: {
    alignItems: "center",
  },
  formButtonContainer: { width: width / 1.5, height: height / 15 },

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
  formButton: {
    marginTop: 10,
  },
  formButtonLabel: {
    fontSize: 16,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});

export default UserProfileScreen;

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title, Avatar } from "react-native-paper";
import { firebase } from "../firebase";

const UserProfileScreen = (props) => {
  const [signed, setSigned] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setSigned(true);
        setProfileURL(user.photoURL);
        setUsername(user.displayName);

        console.log("Signed in");
      } else {
        // No user is signed in.
        setSigned(false);
        setUsername();
        console.log("Not signed in");
      }
    });
  });
  return (
    <View style={styles.container}>
      <Title>{signed ? `Welcome ${username}` : "Not signed in"}</Title>
      <Avatar.Image size={100} source={{ uri: profileURL }}></Avatar.Image>
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
});

export default UserProfileScreen;

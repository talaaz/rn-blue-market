import React, { useState, useEffect } from "react";

import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Avatar, Subheading } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems, DrawerView } from "react-navigation-drawer";

import { firebase } from "../firebase";

const InternalMenu = (props) => {
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

        console.log(profileURL);
      } else {
        // No user is signed in.
        setSigned(false);
        setUsername("");
        setProfileURL("");
        console.log("Not signed in");
      }
    });
  });

  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.imagecontainer}>
        <Avatar.Image
          source={{ uri: profileURL }}
          size={100}
          style={styles.avatarimage}
        />
        <Subheading>{username}</Subheading>
        <Text style={styles.linkText} onPress={() => firebase.auth().signOut()}>
          Sign Out
        </Text>
      </View>
      <ScrollView style={styles.navigationcontainer}>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagecontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navigationcontainer: {},
  avatarimage: {},

  linkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SidebarMenu = (props) => <InternalMenu {...props} />;

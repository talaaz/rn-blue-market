import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Avatar, Subheading, Button } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

import { firebase } from "../firebase";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SignedMenu = [
  { id: 0, name: "Home", icon: "home-outline", navScreen: "Home" },
  {
    id: 1,
    name: "My Products",
    icon: "clipboard-multiple-outline",
    navScreen: "MyProducts",
  },
  {
    id: 2,
    name: "User settings",
    icon: "account-settings",
    navScreen: "User",
  },
];

const NotSignedMenu = [
  { id: 0, name: "Home", icon: "home-outline", navScreen: "Home" },
  { id: 1, name: "Sign in", icon: "login", navScreen: "SignIn" },
];

const InternalMenu = (props) => {
  const [signed, setSigned] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const [username, setUsername] = useState("");

  const navigateToScreen = (navScreen) => {
    props.navigation.navigate(navScreen);
  };
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
  const ImageContainer = () => {
    if (signed)
      return (
        <View style={styles.imagecontainer}>
          <Avatar.Image
            source={{ uri: profileURL }}
            size={100}
            style={styles.avatarimage}
          />
          <Subheading style={styles.username}>{username}</Subheading>
          <Text
            style={styles.linkText}
            onPress={() => firebase.auth().signOut()}
          >
            Sign out
          </Text>
        </View>
      );
    return <View></View>;
  };

  const NavigationContainer = (props) => {
    return (
      <FlatList
        scrollEnabled={true}
        data={signed ? SignedMenu : NotSignedMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToScreen(item.navScreen)}>
            <View style={styles.itemcontainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={30}
                style={styles.icon}
              />
              <Text style={styles.menuText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <ImageContainer />
      <NavigationContainer {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.alternateColor,
    height: screenHeight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  imagecontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navigationcontainer: {},
  itemcontainer: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.primaryColor,
  },
  avatarimage: {},
  icon: { paddingLeft: 20, color: Colors.alternateColor },
  username: {
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  menuText: {
    fontSize: 16,
    color: Colors.alternateColor,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
  },
  linkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SidebarMenu = (props) => <InternalMenu {...props} />;

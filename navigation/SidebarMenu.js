//A costumized sidebar menu, in order to change sign in-sign out and drawer options depending on the signing status
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
  {
    id: 0,
    index: 0,
    name: "Home",
    icon: "home-outline",
    navScreen: "Home",
    current: false,
  },
  {
    id: 1,
    index: 1,
    name: "My Products",
    icon: "clipboard-multiple-outline",
    navScreen: "MyProducts",
    current: false,
  },
  {
    id: 2,
    index: 2,
    name: "User settings",
    icon: "account-settings",
    navScreen: "User",
    current: false,
  },
];

const NotSignedMenu = [
  {
    id: 0,
    index: 0,
    name: "Home",
    icon: "home-outline",
    navScreen: "Home",
    current: false,
  },
  {
    id: 1,
    index: 3,
    name: "Sign in",
    icon: "login",
    navScreen: "SignIn",
    current: false,
  },
];

const InternalMenu = (props) => {
  const [signed, setSigned] = useState(false);
  const [profileURL, setProfileURL] = useState("");
  const [username, setUsername] = useState("");

  const navigateToScreen = (navScreen) => {
    props.navigation.navigate(navScreen);
  };

  const signOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate("Home");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setSigned(true);
        setProfileURL(user.photoURL);
        setUsername(user.displayName);
      } else {
        // No user is signed in.
        setSigned(false);
        setUsername("");
        setProfileURL("");
      }
    });
  });
  useEffect(() => {
    if (signed) {
      SignedMenu.forEach((obj) => {
        obj.current = false;
      });
      let index = SignedMenu.findIndex(({ index }) => {
        return index === props.navigation.state.index;
      });
      if (index > -1) SignedMenu[index].current = true;
    } else {
      NotSignedMenu.forEach((obj) => {
        obj.current = false;
      });
      let index = NotSignedMenu.findIndex(({ index }) => {
        return index === props.navigation.state.index;
      });

      if (index > -1) NotSignedMenu[index].current = true;
    }
  });
  const ImageContainer = (props) => {
    if (signed)
      return (
        <View style={styles.imagecontainer}>
          <Avatar.Image
            source={{ uri: profileURL }}
            size={100}
            style={styles.avatarimage}
          />
          <Subheading style={styles.username}>{username}</Subheading>
          <Text style={styles.linkText} onPress={() => signOut()}>
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
            <View
              style={
                item.current ? styles.altItemcontainer : styles.itemcontainer
              }
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={30}
                style={item.current ? styles.altIcon : styles.icon}
              />
              <Text style={item.current ? styles.altMenuText : styles.menuText}>
                {item.name}
              </Text>
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
    backgroundColor: Colors.backgroundColor,
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
  },
  avatarimage: {},
  icon: { paddingLeft: 20, color: Colors.primaryColor },
  username: {
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  menuText: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
  },
  linkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  altItemcontainer: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.primaryColor,
  },
  altIcon: { paddingLeft: 20, color: Colors.backgroundColor },
  altMenuText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
  },
});

export default SidebarMenu = (props) => <InternalMenu {...props} />;

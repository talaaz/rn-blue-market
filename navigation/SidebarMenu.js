import React, { Component, useState } from "react";

import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems, DrawerView } from "react-navigation-drawer";

const logo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png";

const InternalMenu = (props) => {
  return (
    <View>
      <Avatar.Image />
    </View>
  );
};

export default SidebarMenu = (props) => (
  <SafeAreaView
    style={styles.container}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <View style={styles.imagecontainer}>
      <Avatar.Image source={{ uri: logo }} size={100} />
    </View>
    <ScrollView style={styles.navigationcontainer}>
      <DrawerItems {...props} />
      <DrawerItems></DrawerItems>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagecontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationcontainer: {},
});

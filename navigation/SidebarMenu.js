import React, { useState } from "react";

import { StyleSheet, ScrollView, View } from "react-native";
import { Avatar } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems, DrawerView } from "react-navigation-drawer";

const logo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png";

const InternalMenu = (props) => {
  const [pressed, setPressed] = useState(false);
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.imagecontainer}>
        <Avatar.Image
          source={{ uri: logo }}
          size={100}
          style={styles.avatarimage}
        />
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
    height: 200,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationcontainer: {},
  avatarimage: {},
});

export default SidebarMenu = (props) => <InternalMenu {...props} />;

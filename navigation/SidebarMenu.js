import React from "react";

import { StyleSheet, ScrollView, View, Image } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems, DrawerView } from "react-navigation-drawer";

const logo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png";
export default SidebarMenu = (props) => (
  <SafeAreaView
    style={styles.container}
    forceInset={{ top: "always", horizontal: "never" }}
  >
    <View
      style={{
        height: 200,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: logo }} style={{ height: 100, width: 100 }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

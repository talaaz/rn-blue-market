import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const UserProfileScreen = (props) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text>UserProfileScreen</Text>
      <Button onPress={onToggleSnackBar}>{visible ? "Hide" : "Show"}</Button>
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

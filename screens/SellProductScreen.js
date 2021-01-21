import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import Loading from "../components/Loading";
import { firebase } from "../firebase";
import Colors from "../constants/Colors";

require("firebase/firestore");

const SellProductScreen = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addItem = async (title, price, description) => {
    setLoading(true);

    try {
      await firebase.firestore().collection("product").add({
        title: title,
        price: price,
        description: description,
        ownerId: "",
        imageUrl: "",
      });
    } catch {
      //  setVisible(true);
      // setErrorCode(e.code);
      // setErrorMessage(e.message);
      console.log("wfe");
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormInput
          labelName="title"
          value={title}
          autoCapitalize="none"
          mode="outlined"
          onChangeText={(title) => setTitle(title)}
        />
        <FormInput
          labelName="price"
          value={price}
          autoCapitalize="none"
          mode="outlined"
          onChangeText={(price) => setPrice(price)}
        />
        <FormInput
          labelName="description"
          value={description}
          autoCapitalize="none"
          mode="outlined"
          onChangeText={(description) => setDescription(description)}
        />
        <FormButton
          title="Add item"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={() => addItem(title, description)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SellProductScreen;

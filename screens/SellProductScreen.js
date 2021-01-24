import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import Loading from "../components/Loading";
import { firebase } from "../firebase";
import Colors from "../constants/Colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const SellProductScreen = (props) => {
  const [pictureURL, setPictureURL] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [camPerm, setCamPerm] = useState("");
  const [mediaPerm, setMediaPerm] = useState("");
  const [locPerm, setLocPerm] = useState("");
  //permissions to camera
  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync().then(({ status }) => {
        setCamPerm(status);
      });

      await ImagePicker.requestMediaLibraryPermissionsAsync().then(
        ({ status }) => {
          setMediaPerm(status);
        }
      );
      await Location.requestPermissionsAsync().then(({ status }) => {
        setLocPerm(status);
      });

      console.log("Camera permission is : " + camPerm);

      console.log("Media permission is : " + mediaPerm);
      console.log("Location permission is : " + locPerm);
    })();
  });

  const takePictureWithCamera = async () => {
    console.log("Opening Camera");
    //Permission granted open camera.

    if (camPerm !== "granted") {
      console.log("Camera permission not granted");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setPictureURL(result.uri);
      setLoadingImage(false);
    }
  };

  const fetchPictureFromGallery = async () => {
    // Check media storage permissions. Send snackbar error if not given.
    console.log("Opening Gallery");

    if (mediaPerm !== "granted") {
      console.log("Media permission not granted");
      return;
    }
    //Permission granted open image-picker.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setPictureURL(result.uri);

      setLoadingImage(false);
    }
  };

  const uploadImage = async (productRef) => {
    const childPath = `product/${productRef.id}/image.jpg`;
    console.log(childPath);

    const response = await fetch(pictureURL);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(async (url) => {
        console.log(url);
        productRef.update({ imageUrl: url }).then(() => {
          props.navigation.goBack();
          setLoading(false);
        });
      });
    };

    const taskError = (snapshot) => {
      setVisible(true);
      setErrorCode(snapshot.error.code);
      setErrorMessage(snapshot.error.message);
      console.log(snapshot);
      setLoading(false);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const addItem = async (title, price, description) => {
    setLoading(true);
    let newprice = parseFloat(price);
    let uid = firebase.auth().currentUser.uid;

    //console.log(position.coords);
    let data = {
      title: title,
      price: newprice,
      description: description,
      lat: 0,
      long: 0,
      ownerId: uid,
      imageUrl: "",
    };
    try {
      const newProductRef = await firebase
        .firestore()
        .collection("product")
        .doc();
      const res = newProductRef.set(data).then(async () => {
        uploadImage(newProductRef);
        if (locPerm === "granted") {
          Location.getCurrentPositionAsync({}).then((location) => {
            newProductRef.update({
              long: location.coords.longitude,
              lat: location.coords.latitude,
            });
          });
        }
      });
    } catch (error) {
      //  setVisible(true);
      // setErrorCode(e.code);
      // setErrorMessage(e.message);
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  //UI
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              loadingImage
                ? require("../assets/default-image.jpg")
                : { uri: pictureURL }
            }
          />
          <Text onPress={() => takePictureWithCamera()} style={styles.linkText}>
            {"Take picture"}
          </Text>
          <Text
            onPress={() => fetchPictureFromGallery()}
            style={styles.linkText}
          >
            {"Get picture from Gallery"}
          </Text>
        </View>
        <View style={styles.formContainer}>
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
          <TextInput
            style={styles.description}
            label={"description"}
            value={description}
            autoCapitalize="none"
            mode="outlined"
            multiline={true}
            numberOfLines={5}
            theme={{
              colors: {
                placeholder: Colors.primaryColor,
                text: Colors.primaryColor,
                primary: Colors.primaryColor,
                underlineColor: Colors.primaryColor,
              },
            }}
            onChangeText={(description) => setDescription(description)}
          />
          <FormButton
            title="Add item"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => addItem(title, price, description)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    width: screenWidth / 1.3,
    height: screenHeight / 4,
    resizeMode: "contain",
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    width: screenWidth / 1.5,
  },
  loginButtonLabel: {
    fontSize: 16,
  },
});

export default SellProductScreen;

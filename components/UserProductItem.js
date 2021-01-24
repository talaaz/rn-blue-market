import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import Lightbox from "react-native-lightbox";

const UserProductItem = (props) => {
  return (
    <View>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />

        <View style={styles.imageContainer}>
          <Lightbox underlayColor="white">
            <Card.Image source={{ uri: props.image }} style={styles.image} />
          </Lightbox>
        </View>

        <Card.Divider />

        <Text style={{ marginBottom: 10 }}>{props.description}</Text>

        <Card.Divider />
        <Text>Price: {props.price}</Text>
        <Button
          //  icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          color={Colors.primaryColor}
          onPress={props.onDelete}
          title="Delete"
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
});

export default UserProductItem;

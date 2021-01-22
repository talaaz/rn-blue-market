import React from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";

const UserProductItem = (props) => {
  return (
    <View>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: props.image }} />
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

export default UserProductItem;

/*
https://www.chatkitty.com/blog/posts/building-a-chat-app-with-react-native-and-firebase-part-1/
*/

import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AuthStack from "./AuthStack";

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

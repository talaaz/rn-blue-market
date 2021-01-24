import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
//Header Button component to makke a costumized header in order to add icons
const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={22}
      color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;

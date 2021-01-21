import React from "react";
import { Platform } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Colors from "../constants/Colors";

import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import BasketScreen from "../screens/BasketScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SellProductScreen from "../screens/SellProductScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PaymentScreen from "../screens/PaymentScreen";
import MapScreen from "../screens/MapScreen";
import SidebarMenu from "./SidebarMenu";
import UserProductsScreen from "../screens/UserProductsScreen";

import { Ionicons } from "@expo/vector-icons";
const defatultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsScreen,
    ProductDetail: {
      screen: ProductDetailsScreen,
    },
    Basket: {
      screen: BasketScreen,
    },
    Payment: {
      screen: PaymentScreen,
    },
    Map: {
      screen: MapScreen,
    },
  },
  {
    defaultNavigationOptions: defatultStackNavOptions,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducrs: UserProductsScreen,
    Sell: {
      screen: SellProductScreen,
    },
  },
  {
    defaultNavigationOptions: defatultStackNavOptions,
  }
);

const UserProfileNavigator = createStackNavigator(
  {
    UserProfile: UserProfileScreen,
  },
  {
    defaultNavigationOptions: defatultStackNavOptions,
  }
);

const SignInNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    defaultNavigationOptions: defatultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: ProductsNavigator,
    },
    MyProducts: UserProductsNavigator,
    User: UserProfileNavigator,
    SignIn: {
      screen: SignInNavigator,
    },
  },
  {
    contentComponent: SidebarMenu,
    contentOptions: {
      activeTintColor: Colors.primaryColor,
    },
  }
);

export default createAppContainer(MainNavigator);

import React from "react";
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/Colors';

import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BasketScreen from '../screens/BasketScreen';
import FiltersScreen from '../screens/FiltersScreen';
import UserProfileScreen  from '../screens/UserProfileScreen';

import SignInScreen  from '../screens/SignInScreen';
import SignUpScreen  from '../screens/SignUpScreen';


import { Ionicons } from '@expo/vector-icons';
const defatultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const ProductsNavigator = createStackNavigator({
    Products: ProductsScreen,
    ProductDetail :{
        screen: ProductDetailsScreen
    },
    Basket:{
        screen: BasketScreen
    }

}, {
    defaultNavigationOptions: defatultStackNavOptions
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen

}, {
    defaultNavigationOptions: defatultStackNavOptions
})


const UserProfileNavigator = createStackNavigator({
    UserProfile: UserProfileScreen

}, {
    defaultNavigationOptions: defatultStackNavOptions
})


const SignInNavigator = createStackNavigator({
    SignIn: SignInScreen,
    SignUp :{
        screen: SignUpScreen
    },

}, {
    defaultNavigationOptions: defatultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: ProductsNavigator
    },
    Filters: FiltersNavigator,
    User: UserProfileNavigator,
    SignIn: SignInNavigator, 


}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
    }
})


export default createAppContainer(MainNavigator);
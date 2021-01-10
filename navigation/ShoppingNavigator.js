import React from "react";
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/Colors';

import ProductsScreen from "../screens/ProductsScreen";


const defatultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const ProductsNavigator = createStackNavigator({
    Products: ProductsScreen
}, {
    defaultNavigationOptions: defatultStackNavOptions
});



export default createAppContainer(ProductsNavigator);
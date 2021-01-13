import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,ImageBackground, Button, Platform} from 'react-native';
import Colors from '../constants/Colors'

const BasketItem = props => {
    return (
        <View style={styles.item}>
        <Text>
            <Text>QTY</Text>
            <Text>TITLE</Text>
        </Text>  
        <View>
            <Text>$AMT</Text>
            <TouchableOpacity onPress={props.onRemove} style={styles.onRemove}>
                <Ionicons name={Platform.OS==='android'? 'md-trash': 'ios-trash'}
                size={23}
                color="red"/>
            </TouchableOpacity>
        </View>      
        
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between'
    }


})

export default BasketItem;
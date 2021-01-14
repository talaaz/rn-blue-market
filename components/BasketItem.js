import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';

const BasketItem = props => {
    return (
        <View style={styles.item}>
        <Text style={styles.itemInfo}>
            <Text style={styles.qty}>{props.quantity}</Text>
            <Text style={styles.title}>{props.title}</Text>
        </Text>  
        <View style={styles.itemInfo}>
            <Text style={styles.amount}>{props.amount}</Text>
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
        justifyContent:'space-between',
        marginHorizontal:20
    },
    onRemove:{
        margin:20
    },
    itemInfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    qty:{
    },
    title:{

    },
    amount:{

    }


})

export default BasketItem;
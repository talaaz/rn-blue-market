import React from 'react';
import {View, Text, StyleSheet,ImageBackground, Button, Platform} from 'react-native';
import Colors from '../constants/Colors'

const ProductItem = props => {
    return (
        <View style={styles.productItem}>
            <View style={{...styles.productRow,...styles.productHeader}} >
                <ImageBackground 
                    source={{uri: props.image}} 
                    style={styles.image}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text> 
                    </View>
                </ImageBackground>
      
                </View>


                <View style={{...styles.productRow,...styles.productDetail}}>
                    <Button style={styles.button} title="add to basket" onPress={props.onAddToBasket}/>
                    <Text>${props.price.toFixed(2)}</Text>
                    <Button style={styles.button}  title="details" onPress={props.onViewDetail}/>
                </View>
                
            </View>
    )
}


const styles = StyleSheet.create({
    productRow:{
        flexDirection:'row'
    },
    productItem:{
        height:300, //dynamic with dimensions API
        borderRadius:20,
        overflow:'hidden',
        width:'90%',
        backgroundColor:'#f5f5f5',
        shadowColor:'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height:2},
        elevation:5,
        margin :20,
    
    },
    productDetail: {
        paddingHorizontal:20,
        justifyContent:'space-between',
        alignItems: 'center',
        height:'10%'
    },
    productHeader : {
        height:'85%'
    },
    titleContainer: {
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:5,
        paddingHorizontal:12,
    },
    title:{
        fontSize:20,
        color:'white',
        textAlign:'center',
    },
    price:{
        fontSize:20,
        color:'white',
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    image:{
        width:'100%',
        height:'80%',
        justifyContent: 'flex-end'

    },
    button:{
        color :Platform.OS ==='android' && Platform.Version >=21? Colors.primaryColor :'white',
    }

})

export default ProductItem;
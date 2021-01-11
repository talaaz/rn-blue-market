import React from 'react';
import {ScrollView, View, Text,Image, StyleSheet } from 'react-native';
//GET DATA OUT OF STORE
import {useSelector } from 'react-redux';



const BasketScreen = props => {
  //get data out of store 
  const basketTotalSum = useSelector(state =>  state.basket.totalSum);

    return (
      <View style = {styles.screen} >
        <View style={styles.itemContainer}>
        <Text>Title:
          <Text>${basketTotalSum}</Text>   
        </Text>

          <Text>Basket screen</Text>
          <Text>Basket screen</Text>
        </View>
      </View>

      )
}



const styles = StyleSheet.create({
  screen: {
    margin:20
  },
  itemContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:20,
    padding:10
  },
});

export default BasketScreen;
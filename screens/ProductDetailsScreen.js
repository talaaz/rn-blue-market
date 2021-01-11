/*Here the detail of products are shown */
import React from 'react';
import { Button } from 'react-native';
import {ScrollView, Text,Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailsScreen = props => {
  //select the product which user has clicked on
  const availableProducts = useSelector(state =>  state.products.availableProducts);
  const productId = props.navigation.getParam('productId');
  const selectedProducts = availableProducts.find(prod => prod.id===productId);

    //UI 
    return (
      <ScrollView>
      <Image source={{uri:selectedProducts.imageUrl}}
                style={styles.image}
            />
      <Text>{selectedProducts.title}</Text>
      <Text>EWF</Text>
      <Button title="add to basket"/>
      </ScrollView>
      )
}

//Make the title as the clicked product's title
ProductDetailsScreen.navigationOptions= navData => {
  return{  
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

//Style 
const styles = StyleSheet.create({
  image: {
    width:'100%',
    height:200
}
});

export default ProductDetailsScreen
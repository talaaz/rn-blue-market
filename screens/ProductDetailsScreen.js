/*Here the detail of products are shown */
import React from 'react';
import { Button } from 'react-native';
import {ScrollView, Text,Image, StyleSheet } from 'react-native';
import { useSelector , useDispatch} from 'react-redux'
import * as basketActions from "../store/actions/basket"
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton  from "../components/HeaderButton";


const ProductDetailsScreen = props => {
  //get data out of store 
  const availableProducts = useSelector(state =>  state.products.availableProducts);
   //select the product which user has clicked on
  const productId = props.navigation.getParam('productId');
  const selectedProducts = availableProducts.find(prod => prod.id===productId);

  const dispatch = useDispatch();


    //UI 
    return (
      <ScrollView>
      <Image source={{uri:selectedProducts.imageUrl}}
                style={styles.image}
            />
      <Text>{selectedProducts.title}</Text>
      <Text>EWF</Text>
      <Button title="add to basket" 
               onPress = {() => {
                //dispatch(basketActions.addToBasket( selectedProducts ))
                
            }}
      />
      </ScrollView>
      )
}

//Make the title as the clicked product's title
ProductDetailsScreen.navigationOptions= navData => {
  return{  
    headerTitle: navData.navigation.getParam('productTitle'),

 headerRight:( 
   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu"
        iconName="ios-cart"
        onPress= {()=>{
           navData.navigation.navigate('Basket')
        }}
    />
  </HeaderButtons>
),
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
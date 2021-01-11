import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';
//var RotatingView = require('react-native-rotating-view');
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton  from "../components/HeaderButton";

const ProductsScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
      <View style={styles.list}>
        <FlatList 
            data ={products}
            keyExtractor ={item => item.id}
            renderItem={itemData => 
            <ProductItem 
            title= {itemData.item.title}
            price = {itemData.item.price}
            image = {itemData.item.imageUrl}

            onViewDetail = {() => {
              props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
            }}
            onAddToCart = {() => {
              props.navigation.navigate({routeName:'Basket'});
            }}
            />}
        />
      </View>
      )
}

ProductsScreen.navigationOptions= (navData) => {
    return{  
         headerTitle: 'Blue Market',
         headerLeft:( 
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu"
              iconName="ios-menu"
              onPress= {()=>{
                  navData.navigation.toggleDrawer();
              }}
          />
        </HeaderButtons>
    )}
 
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductsScreen;
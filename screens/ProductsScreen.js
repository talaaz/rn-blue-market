import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';


const ProductsScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList 
            data ={products}
            keyExtractor ={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
      )
}

ProductsScreen.navigationOptions= () => {
    return{  
         headerTitle: 'Blue Market',
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductsScreen;
import React from 'react';
import {View, Text,FlatList,Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'
//GET DATA OUT OF STORE
import {useSelector } from 'react-redux';
//GET HELPER COMPONENTS 
import BasketItem from '../components/BasketItem'

const BasketScreen = props => {
  //get data out of store 
  const totalAmount = useSelector( (state) => state.cart.totalAmount  );
  const cartIems= useSelector( state => {
    const transformedCartItems = [];
    for (const key in state.cart.items){
      transformedCartItems.push({
        productId:key,
        productTitle:state.cart.items[key].productTitle,
        productPrice:state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems;
    
  })  

  return (
      <View style = {styles.screen} >
        <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Total:
          <Text style={styles.itemAmount}>${totalAmount.toFixed(2)}</Text>   
        </Text>
        
        <Button title="Order now" 
        disabled={cartIems.length===0} />
         
        </View>
        <FlatList 
          data={cartIems}
          keyExtractor={item => item.productId}
          renderItem={ itemData =>(
            <BasketItem
             quantity={itemData.item.quantity}
             title={itemData.item.productTitle}
             amount={itemData.item.sum}
             onRemove={()=>{}}
             />
          )}
        />

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
    padding:10,
    shadowColor:'black',
    shadowOpacity:0.20,
    shadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor:'white'
  },
  itemText:{
    fontSize:18

  },
  itemAmount:{
    color: Colors.primaryColor

  }
});

export default BasketScreen;
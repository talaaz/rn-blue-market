/*Here the detail of products are shown */
import React from "react";
import { Button } from "react-native";
import { ScrollView, Text, Image, StyleSheet,View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as cartActions from '../store/actions/cart'
import Colors from '../constants/Colors'
import MapView from 'react-native-maps'


const ProductDetailsScreen = (props) => {
  //get data out of store
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  //select the product which user has clicked on
  const productId = props.navigation.getParam("productId");
  const selectedProducts = availableProducts.find( (prod) => prod.id === productId);

  const dispatch = useDispatch();

  const mapRegion= {
    latitude: 37.78, 
    longitude: -122.43, 
    latitudeDelta :0.922 , 
    longitudeDelta : 0.0421, 
  }
  //UI
  return (
    <ScrollView>
      <Image source={{ uri: selectedProducts.imageUrl }} style={styles.image} />
      
      <View  style={styles.descriptionContainer}>
      <Text >Description: </Text>
      <Text>{selectedProducts.description}</Text>

      </View>
      <View  style={styles.buttonContainer}>
      <Text style={styles.price}>{selectedProducts.price}</Text>
      <Button
        title="add to basket"
        color={Colors.primaryColor}
        onPress={() => {
          console.log(selectedProducts)
          dispatch(cartActions.addToCart(selectedProducts))
        }}
      />
      </View>
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          region={{
            latitude: 37.78, 
            longitude: -122.43, 
            latitudeDelta :0.922 , 
            longitudeDelta : 0.0421, 
          }}
          showsUserLocation={true}

        />
        </View>
    </ScrollView>
  );
};

//Make the title as the clicked product's title
ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),

    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("Basket");
          }}
        />
      </HeaderButtons>
    ),
  };
};

//Style
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },

  details:{
    alignItems:'center',
    justifyContent:'space-around',

  },
  buttonContainer:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:40
},
descriptionContainer:{
  paddingTop:5,
  width:'100%',
  justifyContent:'space-between',
  paddingHorizontal:30,
  paddingBottom:5,

},
price:{
  fontSize:18


},
mapContainer:{
  height:300, //dynamic with dimensions API
  borderRadius:10,
  overflow:'hidden',
  width:'90%',
  margin :20,
},
map:{
  height:300,
  width:'100%'
}
});

export default ProductDetailsScreen;

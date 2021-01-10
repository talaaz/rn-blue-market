import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const ProductsScreen = props => {
    return (
        <View style={styles.container}>
          <Text>Products screen</Text>
          <StatusBar style="auto" />
        </View>
      )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductsScreen
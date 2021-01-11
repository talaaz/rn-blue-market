import React from 'react';
import {ScrollView, View, Text,Image, StyleSheet } from 'react-native';

const BasketScreen = props => {
    return (
        <View style={styles.container}>
          <Text>Basket screen</Text>
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

export default BasketScreen;
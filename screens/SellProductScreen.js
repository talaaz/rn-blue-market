import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const SellProductScreen = props => {
    return (
        <View style={styles.container}>
          <Text>SellProductScreen</Text>
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

export default SellProductScreen;
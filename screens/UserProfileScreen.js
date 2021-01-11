import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const UserProfileScreen = props => {
    return (
        <View style={styles.container}>
          <Text>UserProfileScreen</Text>
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

export default UserProfileScreen;
import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';

import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'

import productsReducer from './store/reducers/products'
import basketReducer from "./store/reducers/basket";
import ShoppingNavigator from './navigation/ShoppingNavigator'

//enableScreens();


const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  if(!fontLoaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShoppingNavigator />
     </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

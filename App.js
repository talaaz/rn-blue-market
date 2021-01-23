import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import ReduxThunk from "redux-thunk";
import productsReducer from "./store/reducers/products";
import ShoppingNavigator from "./navigation/ShoppingNavigator";
import cartReducer from "./store/reducers/cart";
//enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <ShoppingNavigator />
      </PaperProvider>
    </Provider>
  );
}

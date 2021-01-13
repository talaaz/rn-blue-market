import Product from '../../models/product';
import firebase from "../../firebase/index"
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
    console.log('j')

    return async dispatch => {
      // any async code you want!
      console.log('jjkj')
//      console.log( await firebase.firestore().collection('users').get())

        const fetchData = await fetch(
            'https://blue-market-1a247-default-rtdb.firebaseio.com/products.json'
        );
        const doc = await fetchData.json();
        console.log(doc)
        const objectsArray = [];
        for (const key in doc) {
          console.log('wdji')

          objectsArray.push(
              new Product(
                key,
                doc[key].id,
                doc[key].title,
                doc[key].imageUrl,
                doc[key].description,
                doc[key].price

              )

              );
        }
        console.log('wdji')
        console.log(objectsArray);
  
        dispatch({ type: FETCH_PRODUCTS, products: objectsArray });
    };
  };
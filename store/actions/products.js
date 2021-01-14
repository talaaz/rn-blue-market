import Product from "../../models/product";
import { firebase } from "../../firebase";

require("firebase/firestore");
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  console.log("j");

  return async (dispatch) => {
    // any async code you want!
    console.log("jjkj");
    let products = [];
    //first get the collection with the wanted documents.
    await firebase
      .firestore()
      .collection("product")
      .get()
      .then((snapshot) => {
        //console.log(snapshot);
        //Map all the documents in sorted querysnapshot.
        snapshot.docs.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
      });
    /*
    const fetchData = await fetch(
      "https://blue-market-1a247-default-rtdb.firebaseio.com/products.json"
    );
    const doc = await fetchData.json();
    //console.log(doc);
    const objectsArray = [];
    for (const key in doc) {
      console.log("wdji");

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
    */
    console.log("wdji");
    console.log(products);
    dispatch({ type: FETCH_PRODUCTS, products: products });
  };
};

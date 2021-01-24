//Async action to fetch products from firebase
import { firebase } from "../../firebase";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProducts = () => {
  return async (dispatch) => {
    // any async code you want!
    let Loadedproducts = [];
    //first get the collection with the wanted documents.
    await firebase
      .firestore()
      .collection("product")
      .get()
      .then((snapshot) => {
        //Map all the documents in sorted querysnapshot.
        snapshot.docs.forEach((doc) => {
          Loadedproducts.push({ id: doc.id, ...doc.data() });
        });
      });

    dispatch({ type: FETCH_PRODUCTS, products: Loadedproducts });
  };
};

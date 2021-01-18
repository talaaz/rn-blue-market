import Product from "../../models/product";

import { FETCH_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        availableProducts: action.products,
      };
    default:
      return { state };
  }
};

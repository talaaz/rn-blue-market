import Product from '../../models/product';

import { FETCH_PRODUCTS } from '../actions/products';




const initialState = {
  availableProducts: [],
//  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
          console.log('in??????????')
          return {
            availableProducts: action.products,
          };
          default: return {state}

    }
}
import { ADD_TO_CART, DELETE_FROM_CART, RESET_CART } from "../actions/cart";
import CartItem from "../../models/cart";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      // already have the item in the cart, we increase the quantity and plus with the sum
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        //The cart is empty we simply add a new one
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case DELETE_FROM_CART:
      const deletedProduct = action.productId;

      let updateCartItems;
      if (state.items[deletedProduct].quantity > 1) {
        const updateCartItem = new CartItem(
          state.items[deletedProduct].quantity - 1,
          state.items[deletedProduct].productPrice,
          state.items[deletedProduct].productTitle,
          state.items[deletedProduct].sum -
            state.items[deletedProduct].productPrice
        );
        updateCartItems = { ...state.items, [deletedProduct]: updateCartItem };
      } else {
        updateCartItems = { ...state.items };
        delete updateCartItems[deletedProduct];
      }
      return {
        ...state,
        items: updateCartItems,
        totalAmount:
          state.totalAmount - state.items[deletedProduct].productPrice,
      };
    case RESET_CART:
      return {
        ...state,
        items: {},
        totalAmount: 0,
      };
  }

  return state;
};

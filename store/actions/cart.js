//actions to add and remove products
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const RESET_CART = "RESET_CART";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};
export const deleteFromCart = (productId) => {
  return { type: DELETE_FROM_CART, productId: productId };
};

export const resetCart = (items, totalAmount) => {
  return { type: RESET_CART, data: { items: items, totalAmount: totalAmount } };
};

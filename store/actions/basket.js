import products from "../reducers/products";

export const ADD_TO_BASKET = 'ADD_TO_BASKET';

export const addToBasket = product => {
    return {type: ADD_TO_BASKET, product:product}
}


import { ADD_TO_BASKET} from "../actions/basket";

const initialState = {
    items: {},
    amount: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_BASKET:
            const addedProduct = action.product;
            const prodTitle = addedProduct.title;
            const prodPrice = addedProduct.price;
    }

    return state;
}
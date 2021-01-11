import BasketItem from "../../models/basket-items";
import { ADD_TO_BASKET} from "../actions/basket";

const initialState = {
    items: {},
    totalSum: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_BASKET:
            const addedProduct = action.product;
            const prodTitle = addedProduct.title;
            const prodPrice = addedProduct.price;

            let updateNewBasket ;

            if(items[addedProduct.id]){
                updateNewBasket= new BasketItem(
                    state.items[addedProduct.id].amount +1,
                    prodTitle,
                    prodPrice,
                    state.items[addedProduct.id].sum + prodPrice
        
                );
                return {
                    ...state, 
                    items: { ...state.items, [addedProduct.id]:updateBasket},
                    totalSum : state.totalSum + prodPrice

                }
            } else {
                const newBasketItem = new BasketItem(1,prodTitle,prodPrice, prodPrice)
                return {
                    items: {...state.items, [addedProduct.id]:newBasketItem},
                    totalSum : state.totalSum + prodPrice
                }
            }    
    }



    return state;
}
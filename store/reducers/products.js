import PRODCUTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODCUTS,
    userProducts: PRODCUTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    return state;
}
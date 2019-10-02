import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    prices: null,
    totalPrice: null,
    error: false,
    building: false
}


// const state.prices = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            // doing all this to immute the deep objects too.
            return {
               ...state,    // This is done to make copy of the original state

               // All below this is overwriting the previos state
               ingredients: {
                   ...state.ingredients,
                   [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
               },
               totalPrice: state.totalPrice + state.prices[action.ingredientName],
               building: true 
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - state.prices[action.ingredientName],
                building: true
            };

        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                // Reordering ingredients
                ingredients: {
                    salad: action.data.ingredients.salad,
                    bacon: action.data.ingredients.bacon,
                    cheese: action.data.ingredients.cheese,
                    meat: action.data.ingredients.meat
                },
                totalPrice: action.data.totalPrice,
                error: false,
                building: false,
                prices: {
                    ...action.data.prices
                }
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}

export default reducer;
import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        data: ingredients 
    };
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios.get("http://127.0.0.1:4000/api/getIngredients")
            .then(response => dispatch(setIngredients(response.data)))
            .catch(err => dispatch(fetchIngredientsFailed()));
    };
};
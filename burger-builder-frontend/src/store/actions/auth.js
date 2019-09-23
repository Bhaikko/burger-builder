import * as actionTypes from './actionTypes';
import axios from 'axios';

// action_Start actions are used to set a loading state for the app, such as to show a spinner.
// these are all synchronous actions and are executed through asynchronous dispatch method using redux-think
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error 
    };
};

// function calls are dispatched not their reference
export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true 
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7VVKakL2LIjVFkUMOUmMAD3c7i9I2Ut0";
        if(!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7VVKakL2LIjVFkUMOUmMAD3c7i9I2Ut0";
        }

        axios.post(url, authData)
            .then(response => dispatch(authSuccess(response.data.idToken, response.data.localId)))
            .catch(error => dispatch(authFail(error)))
    }
}
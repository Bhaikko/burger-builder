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
// we dont return any action inside async dispatch methods rather call dispatch to execute sync action creators
export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            // returnSecureToken: true 
        }

        // let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7VVKakL2LIjVFkUMOUmMAD3c7i9I2Ut0";
        let url = "http://127.0.0.1:4000/api/auth/signup";
        if(!isSignUp) {
            // url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7VVKakL2LIjVFkUMOUmMAD3c7i9I2Ut0";
            url = "http://127.0.0.1:4000/api/auth/login"
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);

                // localstorage is browser API for storing data
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.userId);

                const expirationDate = new Date(new Date().getTime() + response.data.user.expirationTime); // To store expire time and date 
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(response.data.token, response.data.user.userId));
                dispatch(authLogout(expirationDate));
            })
            // .catch(error => dispatch(authFail(error.response.data.error)))
            .catch(err => dispatch(authFail(err)));
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// this is logout function for when the token expires on server, clear the tokenId and UserId on frontend too
export const authLogout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    // thunk can also be used to dispatch multiple reducers from single action
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if(!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));    // can convert string to date format
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(authSuccess())
            }
            
        }
    }
}
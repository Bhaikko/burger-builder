import * as actionTypes from './actionTypes';
import axios from 'axios';

// action_Start actions are used to set a loading state for the app, such as to show a spinner.
// these are all synchronous actions and are executed through asynchronous dispatch method using redux-think
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId, userEmail) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userEmail: userEmail
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.response.data.message 
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
            url = "http://127.0.0.1:4000/api/auth/login";
            axios.post(url, authData)
                .then(response => {
                    // localstorage is browser API for storing data
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.user.userId);
                    localStorage.setItem('email', response.data.user.userEmail);
    
                    const expirationDate = new Date(response.data.user.expirationTime); // To store expire time and date 
    
                    localStorage.setItem('expirationDate', expirationDate);
    
                    dispatch(authSuccess(response.data.token, response.data.user.userId, response.data.user.userEmail));
                    dispatch(authLogout(expirationDate));
                })
                // .catch(error => dispatch(authFail(error.response.data.error)))
                .catch(err => dispatch(authFail(err)));
        } else {
            axios.post(url, authData)
                .then(response => window.location = "http://127.0.0.1:3000/auth")
        }
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

    const time = (new Date(expirationTime)).getTime() - (new Date()).getTime();

    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, time);
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
                const userEmail = localStorage.getItem("email");
                dispatch(authSuccess(token, userId, userEmail));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(logout())
            }
            
        }
    }
}
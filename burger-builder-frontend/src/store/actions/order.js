import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

const purchaseBurgerFail = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err 
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart);
        // axios.post("/orders.json?auth=" + token, orderData)  //only for firebase .json is added
        axios.post("http://127.0.0.1:4000/api/orders/addOrder", orderData, {
            headers: { Authorization: `JWT ${token}`}
        })
            .then(response => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))
            .catch(error => dispatch(purchaseBurgerFail(error)));
    };
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders 
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error 
    };
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const jwtToken = localStorage.getItem("token");
        // axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)  // this is only specific to firebase
        axios.get("http://127.0.0.1:4000/api/orders/getOrders", {
            headers: { Authorization: `JWT ${jwtToken}`}
        })
            .then(response => {
                const fetechedOrders = [];

                // eslint-disable-next-line
                for(let key in response.data) {
                    fetechedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                // console.log(fetechedOrders);
                dispatch(fetchOrdersSuccess(fetechedOrders));
            })
            .catch(err => {
                console.log(err);
                fetchOrdersFail(err)
            });
    }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';


import Order from './Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {

    // Fetching orders is handled in redux asynchronously
    componentDidMount () {
        this.props.onFetchOrders();

        // axios.get("/orders.json")
        //     .then(response => {
        //         // console.log(response.data);
        //         const fetechedOrders = [];
        //         //Use for in loop for objects
        //         // eslint-disable-next-line
        //         for(let key in response.data) {
        //             fetechedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({
        //             loading: false,
        //             orders: fetechedOrders
        //         })
        //     })
        //     .catch(err => this.setState({loading: false}));
    }

    render () {
        let orders = <Spinner />
        if(!this.props.loading) {
            // console.log(this.props.orders);

            orders = this.props.orders.map(order => <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />)
        }
        return (
            <div>
                {orders}
            </div>
            
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onFetchOrders: () => dispatch(actions.fetchOrders())
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         orders: state.order.orders,
//         loading: state.order.loading
//     }
// }


// Arrow inline function used to return object 
const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loading: state.order.loading 
});

const mapDispatchToProps = (dispatch) => ({
    onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
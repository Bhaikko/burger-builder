import React, { Component } from 'react';


import Order from './Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true 
    }

    componentDidMount () {
        axios.get("/orders.json")
            .then(response => {
                // console.log(response.data);
                const fetechedOrders = [];
                //Use for in loop for objects
                // eslint-disable-next-line
                for(let key in response.data) {
                    fetechedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetechedOrders
                })
            })
            .catch(err => this.setState({loading: false}));
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)}
            </div>
            
        );
    }
}

export default withErrorHandler(Orders, axios);
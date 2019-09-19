import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 0
    }

    //Need to change to contructor when using non-redux state management, however in case of redux, we will simply fetch by connect(subscription)
    // componentWillMount () {

    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
        
    //     // eslint-disable-next-line
    //     for(let param of query.entries()) {
    //         // ["salad", "1"]
    //         if(param[0] === "price")
    //             price = param[1];
    //         else 
    //             ingredients[param[0]] = +param[1];
    //     }

    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        //WHEN USING replace(), DONT USE EXACT IN ROUTE
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />  
                    {/* using render allows to pass props */}
            </div>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

// No need for dispatchmethods since this component doesnt make changes to global state


export default connect(mapStateToProps)(Checkout);
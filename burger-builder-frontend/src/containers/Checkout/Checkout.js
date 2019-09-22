import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from './../../store/actions/index';

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

    // componentDidMount () {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        //WHEN USING replace(), DONT USE EXACT IN ROUTE
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRediect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    { purchasedRediect }
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
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// However, using onInitpurchase() causes the props to be persistent, Hence it is used in burgerBuilder
const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

// No need for dispatchmethods since this component doesnt make changes to global state


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';

//This could be a functional Component
class OrderSummary extends Component {

    // componentDidUpdate() {
    //     console.log("[Order Summary] updates"); //To check When this component(OrderSummary) updates
    // }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => <li key={igKey}><span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>);

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>

                <p>Continue To Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
            </Aux>
        );
    }
    
}

export default OrderSummary;
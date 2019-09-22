import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import axios from "./../../axios-orders";
import * as actions from './../../store/actions/index';

class BurgerBuilder extends Component {
    constructor (props) {
        super(props);

        this.state = {
            purchasing: false,
        }
    }

    // Ingredients are now mananaged in redux global state
    componentDidMount () {
        // axios.get("https://burger-builder-96418.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(err => {});
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, ele) => sum + ele, 0);

        // this.setState({ purchasable: sum > 0 });
        return sum > 0;
    }

    //addIngredientHandler and removeIngredientHandler has been managed by redux reducers now

    // addIngredientHandler = (type) => {
    //     //Updating State in immutable way
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients 
    //     };

    //     updatedIngredients[type] = updatedCount;
        
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     //Updating State in immutable way
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0)
    //         return;

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients 
    //     };

    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // THIS CODE WAS USED WHEN REDUX WAS NOT IMPLEMENTED, HOWEVER CUZ OF REDUX, NOW WE SIMPLY NEED TO ROUTE TO /checkout and ingredients will be feteched there instead of sending through query params
    purchaseContinueHandler = () => {
        
        // const queryParams = [];

        // // eslint-disable-next-line
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])); //encodeURIComponent() converts data into url parsable data which might contain whitespaces
        // }
        // queryParams.push("price=" + this.state.totalPrice);
        // const queryString = queryParams.join("&");  //indiviual queries are seperated with & not " " you idiot

        // this.props.history.push({
        //     pathname: "/checkout",
        //     search: "?" + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        // eslint-disable-next-line
        for(let key in disabledInfo)    
            disabledInfo[key] = disabledInfo[key] <= 0;
        //  { salad: true, meat: false, ...}

        let orderSummary = null;

        // if(this.state.loading)
        //     orderSummary = <Spinner />

        let burger = <Spinner />

        //When ignredients are feteched from Server
        if(this.props.ings)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)} // updatePurchaseState is required to be executed because on every render we want the result of this function to enable the order now button
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        
        if(this.state.loading)
            orderSummary = <Spinner />

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error  
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching actions without using action creators
        // onIngredientAdded: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        // onIngredientRemoved: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}),
        
        // dispatch actions using action creators
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
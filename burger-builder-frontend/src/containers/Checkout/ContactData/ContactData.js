import React, { Component } from 'react';
import { connect } from 'react-redux';


import Button from './../../../components/UI/Button/Button';
import axios from "./../../../axios-orders";
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../../store/actions/index';

import classes from './ContactData.css';

class ContactData extends Component {
    
    state = {
        //Setting Up Order Form state to dynaically show up and use the custom Input Component
        // DYNAMIC WAY TO CREATE FORM
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zipcode",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true 
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: "fastest",
                valid: true
            }
        },
        formValid: false 
    }


    // Validation Rules
    checkValidity = (value, rules) => {
        
        if(!rules)
            return true;

        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;  //trim() is used to remove whitespaces
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }


        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        // alert("Ordered");

        const formData = {};

        // eslint-disable-next-line
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,         //This PRICE SHOULD BE RECALCULATED ON SERVER
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);

        // This is outsourced to redux action creator
        // axios.post("/orders.json", order)  //only for firebase .json is added
        //     .then(response => {
        //         this.setState({ loading: false});
        //         this.props.history.push("/");
        //     })
        //     .catch(error => this.setState({ loading: false }));
    }

    // To change value of input on page, value should be updated using setState()
    inputChangeHandler = (event, inputIdentifier) => {
        //CLONING ONLY OCCURS ON UPPER DESIGNATED LEVEL WHEN USING SPREAD OPERATOR
        //Example, ...this.state.orderForm will only clone its pointer only not the nested elements

        // This only copies the upper pointer and not only the nested value pairs
        // const formData = {...this.state.orderForm};

        //All this is done to update state immutably
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        //This would create the inner nested clone
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        // eslint-disable-next-line
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }


        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid 
        });
    }


    render () {

        const formElementsArray = [];
        // eslint-disable-next-line
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            // React will throw error if the input element does not have an onChange method
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading)
            form = <Spinner />
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
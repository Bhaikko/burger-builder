import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';
import axios from "./../../../axios-orders";
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

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
                    placeholder: "Your Street",
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
                    placeholder: "Your Zipcode",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country",
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
                    placeholder: "Your Mail",
                },
                value: "",
                validation: {
                    required: true
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
        loading: false,
        formValid: false 
    }


    // Validation Rules
    checkValidity = (value, rules) => {
        
        if(!rules)
            return true;

        let isValid = false;

        if(rules.required) {
            isValid = value.trim() !== "";  //trim() is used to remove whitespaces
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength;
        }
        if(rules.mxnLength) {
            isValid = value.length <= rules.minLength;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        // alert("Ordered");

        const formData = {};

        // eslint-disable-next-line
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,         //This PRICE SHOULD BE RECALCULATED ON SERVER
            orderData: formData
        };

        axios.post("/orders.json", order)  //only for firebase .json is added
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push("/");
            })
            .catch(error => this.setState({ loading: false }));
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

        if(this.state.loading)
            form = <Spinner />
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
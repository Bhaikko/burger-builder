import React, { Component } from 'react';

import Button from './../../../components/UI/Button/Button';

import classes from './ContactData.css';

class ContactData extends Component {
    
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        }
    }

    orderHandler = () => {
        
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                    <input className={classes.Input} type="text" name="postalcode" placeholder="Your Postal Code" />
                    <Button btnType="Success" clicked={} >ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
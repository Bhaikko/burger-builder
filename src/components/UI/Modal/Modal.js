import React, { Component } from 'react';
import Aux from './../../../hoc/Aux';
import Backdrop from './../Backdrop/Backdrop';
import classes from './Modal.css';




//Built This Way such that <Modal></Modal> can be used to show any elements as part of Modal
class modal extends Component {

    //Optimisation to update modal only if show is updated in BurgerBuilder and due to this, its children also will not update, in this case, Order Summary will also not update
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    // componentDidUpdate() {
    //     console.log("[Modal] updates"); //To check When this component(OrderSummary) updates
    // }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    {this.props.children}
                </div>
            </Aux>
            
        );
    }
}

export default modal;
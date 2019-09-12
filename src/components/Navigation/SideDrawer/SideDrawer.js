import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationsItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/Aux';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)
        attachedClasses = [classes.SideDrawer, classes.Open];
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%" margin="32px" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    );
}

export default sideDrawer;
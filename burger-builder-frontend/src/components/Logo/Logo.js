import React from 'react';

import burgerLogo from './../../assets/images/burger-logo.png';  //Done this way cuz in production, the 'src' folder doesn't exist so web-pack must know the location of assets

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height, marginBottom: props.margin || "0px" }} >
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default logo;
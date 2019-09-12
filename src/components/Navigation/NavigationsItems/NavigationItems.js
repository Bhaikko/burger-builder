import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem> {/*If prop required is boolean, then simply active can be passed as true */}
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;
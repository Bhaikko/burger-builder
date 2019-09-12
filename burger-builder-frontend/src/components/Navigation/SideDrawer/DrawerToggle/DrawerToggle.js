import React from 'react';

import classes from './DrawerToggle.css'; //Try to create Simple Images using css for small size

const drawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
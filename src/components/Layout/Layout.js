import React, { Component } from 'react';

import Aux from './../../hoc/Aux';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {

    constructor (props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer };
        }); //prevState is used due to async nature of state
    }

    render () {

        return (
            //Aux Is used as HOC to wrap adjacent elements
            <Aux>
                {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
                <Toolbar drawerToggleClicked={this.sideDrawerToogleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );   
    }    
}

export default Layout;
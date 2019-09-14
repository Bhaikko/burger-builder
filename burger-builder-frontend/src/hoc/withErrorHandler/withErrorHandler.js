import React, { Component } from 'react';

import Modal from './../../components/UI/Modal/Modal';
import Aux from './../Aux/Aux'

//Higher Order Function which return a class component
const withErrorHandler = (WrappedComponent, axios) => { //Axios to use the global error handler
    return class extends Component { //Inside Function which this will return   and this is anoymouse class without name
       
        constructor (props) {
            super(props);

            //read about interceptors in componentDidMount()
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({  error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(response => response, error => this.setState({  error: error }));

        }
        
        state = {
            error: null
        }
        

        //IMPORTANT
        // //The componentWillMount() is now deprecated hence the logic inside these functions must be run in constructor() of class component
        // componentDidMount () {
        //     //Defined an global interceptor on intial insertion of this component such that it checks for errors
        //     axios.interceptors.response.use(req => {
        //         this.setState({  error: null });
        //         return req;
        //     });

        //     axios.interceptors.response.use(response => response, error => this.setState({  error: error }));
        // }

        // componentWillMount () {
        //     //Defined an interceptor on intial insertion of this component such that it checks for errors
        //     this.reqInterceptor = axios.interceptors.request.use(req => {
        //         this.setState({  error: null });
        //         return req;
        //     });

        //     this.resInterceptor = axios.interceptors.response.use(response => response, error => this.setState({  error: error }));
        // }

        //SHIFTED TO constructor ()

        componentWillUnmount () {
            //Executed when component is no longer required 

            //Removing Interceptors when components are destroyed
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({ error: null });
        }
        
        render () {
            return (    //JSX the inner function will return
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
            
    }
}

export default withErrorHandler;
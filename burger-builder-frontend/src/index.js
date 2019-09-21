import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(burgerBuilderReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// BrowserRouter only enables us to use Routing and not actually implements it
const app = (
    // Provider from redux and BrowserRouter from router may have some conficts since both setup props for the wrapping component.
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>    
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();

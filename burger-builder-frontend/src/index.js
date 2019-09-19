import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';

const store = createStore(reducer);

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

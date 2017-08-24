import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from 'redux-logger';

import indexReducer from './components/reducers/index-reducer';
import App from './components/ui/app.jsx';

const middleware = applyMiddleware(logger);
const store = createStore(indexReducer, middleware);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
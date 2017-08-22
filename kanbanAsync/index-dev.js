import { createStore, applyMiddleware } from 'redux';

import indexReducer from './components/reducers/index-reducer';
import * as TaskActions from './components/actions/task-actions';
import * as CardActions from './components/actions/card-actions';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk'

const middleware = applyMiddleware(ReduxThunk, logger);
const store = createStore(indexReducer, middleware);

console.log(store.getState());
store.dispatch(CardActions.fetchCards());
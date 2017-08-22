import { createStore, applyMiddleware } from 'redux';

import indexReducer from './components/reducers/index-reducer';
import * as TaskActions from './components/actions/task-actions';
import * as CardActions from './components/actions/card-actions';

import logger from 'redux-logger';

const middleware = applyMiddleware(logger);
const store = createStore(indexReducer, middleware);

console.log(store.getState());
/*
store.dispatch(CardActions.add({
    "title": "redux learning",
    "description": "learn redux in one week",
    "status": "done"
}));
store.dispatch(CardActions.remove('card1'));
*/
// store.dispatch(TaskActions.add('card1', 'footask'));
// store.dispatch(TaskActions.toggle('card2', 'card2task1'));
// store.dispatch(TaskActions.remove('card2', 'card2task3'));
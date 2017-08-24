import { combineReducers } from 'redux';

import { reduce as cardReduce } from './card-reducer';
import { reduce as draftReduce } from './draft-reducer';

const indexReducer = combineReducers({
    cards: cardReduce,
    draft: draftReduce
});

export default indexReducer;
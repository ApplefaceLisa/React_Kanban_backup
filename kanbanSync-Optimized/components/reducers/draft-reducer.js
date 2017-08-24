import Immutable from 'immutable';

import {OPEN_DRAFT, UPDATE_DRAFT, CLOSE_DRAFT} from '../actions/draft-actions';

function createInitialState() {
    const DraftRecord = Immutable.Record({
        id: '',
        title: '',
        description: '',
        priority: '',
        assignee: '',
        status: 'todo',
        show: false
    });
    
    return new DraftRecord();
}

export function reduce(state = createInitialState(), action) {
    switch(action.type) {
        case OPEN_DRAFT:
            const cardObj = action.payload;
            
            if (cardObj) {
                return createInitialState().set('id', cardObj.id)
                                           .set('title', cardObj.title)
                                           .set('description', cardObj.description)
                                           .set('priority', cardObj.priority)
                                           .set('assignee', cardObj.assignee)
                                           .set('status', cardObj.status)
                                           .set('show', true);
            } else {
                return createInitialState().set('show', true);
            }
            
        case UPDATE_DRAFT:
            return state.set(action.payload.field, action.payload.value);
            
        case CLOSE_DRAFT:
            return createInitialState();
            
        default:
            return state;
    }
}
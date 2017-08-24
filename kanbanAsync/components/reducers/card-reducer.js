import * as Immutable from 'immutable';
import uuidv4 from 'uuid/v4';

import {ADD_TASK, TOGGLE_TASK, REMOVE_TASK} from '../actions/task-actions';
import {ADD_CARD, ADD_CARD_SUCCESS, ADD_CARD_FAILURE,
        UPDATE_CARD, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE, 
        REMOVE_CARD, REMOVE_CARD_SUCCESS, REMOVE_CARD_FAILURE,
        FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, FETCH_CARDS_FAILURE} 
        from '../actions/card-actions';

const TaskRecord = Immutable.Record({
    id: '',
    name: '',
    done: false
});
const CardRecord = Immutable.Record({
    id: '',
    title: '',
    description: '',
    status: '',
    tasks: undefined
});

const StateRecord = Immutable.Record({
    loading: false,
    cards: Immutable.List(),
    previousCards: undefined,
    error: undefined,
})

function createInitialState() {
    return new StateRecord();
}

function processResponse(response) {
    const cards = response.map(
        (card) => {
            const tasks = card.tasks.map(
                (task) => {
                    return new TaskRecord(
                        Object.assign({}, task, {
                            id: task._id
                        })
                    );
                }
            )

            return new CardRecord(
                Object.assign({}, card, {
                    id: card._id,
                    tasks: Immutable.List(tasks)
                })
            );
        }
    );
    
    return Immutable.List(cards);    
}

export function reduce(state = createInitialState(), action) {
    let cardId, taskId, cardIndex, taskIndex, card, task, cardObj;
    
    switch(action.type) {
        case FETCH_CARDS_REQUEST:
            return state.set('loading', true);
            
        case FETCH_CARDS_SUCCESS:
            const cards = processResponse(action.payload);
            return state.set('loading', false)
                        .set('cards', cards)
                        .set('error', undefined);
                        
        case FETCH_CARDS_FAILURE:
            return state.set('loading', false)
                        .set('error', 'Card cannot be loaded');
                        
        case REMOVE_CARD:
            cardIndex = state.get('cards').findIndex(
                (c) => c.get('id') === action.payload
            );
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').delete(cardIndex));
                        
        case REMOVE_CARD_SUCCESS:
            return state.set('previousCards', undefined);
            
        case REMOVE_CARD_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', 'Card cannot be removed');
                        
        case ADD_CARD:
            cardObj = action.payload;
            card = new CardRecord({
                id: uuidv4(),
                title: cardObj.title,
                description: cardObj.description,
                status: cardObj.status,
                tasks: Immutable.List()
            });
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').push(card));
                        
        case ADD_CARD_SUCCESS:
            return state.set('cards', state.get('previousCards').push(
                        new CardRecord(
                            Object.assign({}, action.payload, {
                                id: action.payload._id,
                                tasks: Immutable.List()
                            })
                        )
                    ))
                    .set('previousCards', undefined);
                    
        case ADD_CARD_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', 'Card cannot be added');
        
        case UPDATE_CARD:
            cardObj = action.payload;
            cardIndex = state.get('cards').findIndex(
                (c) => c.get('id') === cardObj.id
            );
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').setIn([cardIndex, 'title'], cardObj.title)
                                                        .setIn([cardIndex, 'description'], cardObj.description)
                                                        .setIn([cardIndex, 'status'], cardObj.status));
            
        case UPDATE_CARD_SUCCESS:
            return state.set('previousCards', undefined);
            
        case UPDATE_CARD_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', 'Card cannot be updated');
                        
        default:
            return state;
    }
}
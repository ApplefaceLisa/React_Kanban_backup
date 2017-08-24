import * as Immutable from 'immutable';
import uuidv4 from 'uuid/v4';

import {ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_FAILURE,
        TOGGLE_TASK, TOGGLE_TASK_SUCCESS, TOGGLE_TASK_FAILURE,
        REMOVE_TASK, REMOVE_TASK_SUCCESS, REMOVE_TASK_FAILURE} 
        from '../actions/task-actions';
        
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
    priority: '',
    assignee: '',
    status: '',
    tasks: undefined
});

const StateRecord = Immutable.Record({
    loading: false,
    cards: Immutable.List(),
    previousCards: undefined,
    error: undefined,
});

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
    let cardId, taskId, cardIndex, taskIndex, card, task, cardObj, taskName;
    
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
                priority: cardObj.priority,
                assignee: cardObj.assignee,
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
                                                        .setIn([cardIndex, 'priority'], cardObj.priority)
                                                        .setIn([cardIndex, 'assignee'], cardObj.assignee)
                                                        .setIn([cardIndex, 'status'], cardObj.status));
            
        case UPDATE_CARD_SUCCESS:
            return state.set('previousCards', undefined);
            
        case UPDATE_CARD_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', 'Card cannot be updated');
                        
        case ADD_TASK:
            cardId = action.payload.cardId;
            taskName = action.payload.taskName;
            
            task = new TaskRecord({
                id: uuidv4(),
                name: taskName,
                done: false
            });
            
            cardIndex = state.get('cards').findIndex(
                (c) => c.get('id') === cardId
            )
            card = state.get('cards').get(cardIndex);
            
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').setIn([cardIndex, 'tasks'], card.get('tasks').push(task)));
                        
        case ADD_TASK_SUCCESS:
            card = action.payload;
            cardId = card._id;
            task = card.tasks[card.tasks.length-1];
            
            task = new TaskRecord(
                            Object.assign({}, task, {
                                id: task._id
                            })
                        );
            cardIndex = state.get('previousCards').findIndex(
                (c) => c.get('id') === cardId
            )
            card = state.get('previousCards').get(cardIndex);
            
            return state.set('cards', state.get('previousCards').setIn([cardIndex, 'tasks'], card.get('tasks').push(task)))
                        .set('previousCards', undefined);
                
        case ADD_TASK_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', action.payload);

        case TOGGLE_TASK:
            cardId = action.payload.cardId;
            taskId = action.payload.taskId;
            
            cardIndex = state.get('cards').findIndex(
                (c) => c.get('id') === cardId
            );
            card = state.get('cards').get(cardIndex);
            taskIndex = card.get('tasks').findIndex(
                (t) => t.get('id') === taskId
            );
            
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').setIn([cardIndex, 'tasks', taskIndex, 'done'],
                                                                !state.get('cards').getIn([cardIndex, 'tasks', taskIndex, 'done'])));
        case TOGGLE_TASK_SUCCESS:
            return state.set('previousCards', undefined);
            
        case TOGGLE_TASK_FAILURE:
            return state.set('cards', state.get('previousCards'))
                        .set('previousCards', undefined)
                        .set('error', action.payload);
            
        case REMOVE_TASK:
            cardId = action.payload.cardId;
            taskId = action.payload.taskId;  
            
            cardIndex = state.get('cards').findIndex(
                (c) => c.get('id') === cardId
            );
            card = state.get('cards').get(cardIndex);
            taskIndex = card.get('tasks').findIndex(
                (t) => t.get('id') === taskId
            );
            
            return state.set('previousCards', state.get('cards'))
                        .set('cards', state.get('cards').deleteIn([cardIndex, 'tasks', taskIndex]));                        
        
        case REMOVE_CARD_SUCCESS:
            return state.set('previousCards', undefined);
            
        case REMOVE_CARD_FAILURE:
            return state.set('cards', 'previousCards')
                        .set('previousCards', undefined)
                        .set('error', action.payload);
                        
        default:
            return state;
    }
}
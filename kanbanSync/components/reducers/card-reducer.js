import * as Immutable from 'immutable';
import uuidv4 from 'uuid/v4';

import {ADD_TASK, TOGGLE_TASK, REMOVE_TASK} from '../actions/task-actions';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD} from '../actions/card-actions';

const kanbanState = {
    cards: [
        {
            id: 'card1',
            title: 'Read react book',
            description: 'I should read this book before class',
            status: 'in-progress',
            tasks: []
        },
        {
            id: 'card2',
            title: 'Write some code',
            description: 'Practise my coding skill',
            status: 'todo',
            tasks: [
                {
                    id: 'card2task1',
                    name: 'Hello world example',
                    done: true
                },
                {
                    id: 'card2task2',
                    name: 'Kanban example',
                    done: false
                },
                {
                    id: 'card2task3',
                    name: 'Assignment code',
                    done: true
                }                
            ]
        }        
    ]
};

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

function createInitialState() {
    const cards = kanbanState.cards.map(
        (card) => {
            const tasks = card.tasks.map(
                (task) => {
                    return new TaskRecord(task);
                }
            )

            return new CardRecord(
                Object.assign({}, card, {
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
        case ADD_CARD:
            cardObj = action.payload;
            
            card = new CardRecord({
                id: uuidv4(),
                title: cardObj.title,
                description: cardObj.description,
                status: cardObj.status,
                tasks: Immutable.List()
            });
            
            return state.push(card);
            
        case UPDATE_CARD:
            cardObj = action.payload;
            cardIndex = state.findIndex(
                (c) => c.get('id') === cardObj.id
            );
            
            // let cardRecord = state.get(cardIndex);
            // cardRecord = cardRecord.set('title', cardObj.title)
            //                       .set('description', cardObj.description)
            //                       .set('status', cardObj.status);
            
            // return state.set(cardIndex, cardRecord);
            
            return state.setIn([cardIndex, 'title'], cardObj.title)
                        .setIn([cardIndex, 'description'], cardObj.description)
                        .setIn([cardIndex, 'status'], cardObj.status);
        
        case REMOVE_CARD:
            cardIndex = state.findIndex(
                (c) => c.get('id') === action.payload
            );
            
            return state.delete(cardIndex);
            
        case ADD_TASK:
            cardId = action.payload.cardId;
            const taskName = action.payload.taskName;
            
            task = new TaskRecord({
                id: uuidv4(),
                name: taskName,
                done: false
            });
            
            cardIndex = state.findIndex(
                (c) => c.get('id') === cardId
            )
            card = state.get(cardIndex);
            
            return state.setIn([cardIndex, 'tasks'], card.get('tasks').push(task));
        
        case TOGGLE_TASK:
            cardId = action.payload.cardId;
            taskId = action.payload.taskId;
            
            cardIndex = state.findIndex(
                (c) => c.get('id') === cardId
            );
            card = state.get(cardIndex);
            taskIndex = card.get('tasks').findIndex(
                (t) => t.get('id') === taskId
            );
            
            return state.setIn(
                [cardIndex, 'tasks', taskIndex, 'done'],
                !state.getIn([cardIndex, 'tasks', taskIndex, 'done'])
            );
        
        case REMOVE_TASK:
            cardId = action.payload.cardId;
            taskId = action.payload.taskId;  
            
            cardIndex = state.findIndex(
                (c) => c.get('id') === cardId
            );
            card = state.get(cardIndex);
            taskIndex = card.get('tasks').findIndex(
                (t) => t.get('id') === taskId
            );
            
            return state.deleteIn([cardIndex, 'tasks', taskIndex]);
        
        default:
            return state;
    }
}
export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export function add(cardId, taskName) {
    return {
        type: ADD_TASK,
        payload: {
            cardId: cardId,
            taskName: taskName
        }
    }
}

export function toggle(cardId, taskId) {
    return {
        type: TOGGLE_TASK,
        payload: {
            cardId: cardId,
            taskId: taskId
        }
    }
}

export function remove(cardId, taskId) {
    return {
        type: REMOVE_TASK,
        payload: {
            cardId: cardId,
            taskId: taskId
        }
    }
}
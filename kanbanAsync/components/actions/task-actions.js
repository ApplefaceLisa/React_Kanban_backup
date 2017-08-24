import axios from 'axios';

const API_URL = 'https://kanban-server-lisali.c9users.io:8080/api';
const API_JSON_HEADERS = {
    'Content-Type': 'application/json'
};

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

function add(cardId, taskName) {
    return {
        type: ADD_TASK,
        payload: {
            cardId: cardId,
            taskName: taskName
        }
    }
}

function addTaskSuccess(card) {
    return {
        type: ADD_TASK_SUCCESS,
        payload: card
    }
}

function addTaskFailure(err) {
    return {
        type: ADD_TASK_FAILURE,
        payload: err
    }
}

export function addTask(cardId, taskName) {
    return (dispatch) => {
        dispatch(add(cardId, taskName));
        
        axios.post(
            `${API_URL}/cards/${cardId}/tasks`,
            {taskname : taskName},
            API_JSON_HEADERS
        )
        .then((response) => dispatch(addTaskSuccess(response.data)))
        .catch((err) => dispatch(addTaskFailure(err)));
    }
}


export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_TASK_SUCCESS = 'TOGGLE_TASK_SUCCESS';
export const TOGGLE_TASK_FAILURE = 'TOGGLE_TASK_FAILURE';

function toggle(cardId, taskId) {
    return {
        type: TOGGLE_TASK,
        payload: {
            cardId: cardId,
            taskId: taskId
        }
    }
}

function toggleTaskSuccess(card) {
    return {
        type: TOGGLE_TASK_SUCCESS,
        payload: card
    }
}

function toggleTaskFailure(err) {
    return {
        type: TOGGLE_TASK_FAILURE,
        payload: err
    }
}

export function toggleTask(cardId, taskId, status) {
    console.log("status ", status);
    return (dispatch) => {
        dispatch(toggle(cardId, taskId));
        
        axios.put(
            `${API_URL}/cards/${cardId}/tasks/${taskId}`,
            {taskstatus : status},
            API_JSON_HEADERS
        )
        .then((response) => dispatch(toggleTaskSuccess(response.data)))
        .catch((err) => dispatch(toggleTaskFailure(err)));
    }
}

export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
export const REMOVE_TASK_FAILURE = 'REMOVE_TASK_FAILURE';

function remove(cardId, taskId) {
    return {
        type: REMOVE_TASK,
        payload: {
            cardId: cardId,
            taskId: taskId
        }
    }
}

function removeTaskSuccess(msg) {
    return {
        type: REMOVE_TASK_SUCCESS,
        payload: msg
    }
}

function removeTaskFailure(err) {
    return {
        type: REMOVE_TASK_FAILURE,
        payload: err
    }
}

export function removeTask(cardId, taskId) {
    return (dispatch) => {
        dispatch(remove(cardId, taskId));
        
        axios.delete(`${API_URL}/cards/${cardId}/tasks/${taskId}`)
        .then((response) => dispatch(removeTaskSuccess(response.data)))
        .catch((err) => dispatch(removeTaskFailure(err)));
    }
}
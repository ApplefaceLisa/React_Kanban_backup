import axios from 'axios';

const API_URL = 'https://kanban-server-lisali.c9users.io:8080/api';
const API_JSON_HEADERS = {
    'Content-Type': 'application/json'
};

export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

function fetchCardsRequest() {
    return {
        type: FETCH_CARDS_REQUEST
    };
}

function fetchCardsSuccess(cards) {
    return {
        type: FETCH_CARDS_SUCCESS,
        payload: cards
    };
}

function fetchCardsFailure(err) {
    return {
        type: FETCH_CARDS_FAILURE,
        payload: err
    };
}

export function fetchCards() {
    return (dispatch) => {
        dispatch(fetchCardsRequest());
        
        axios.get(`${API_URL}/cards`)
        .then((response) =>
            dispatch(fetchCardsSuccess(response.data))
        )
        .catch((err) =>
            dispatch(fetchCardsFailure(err))
        );
    };
}

export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

function add(cardObj) {
    return {
        type: ADD_CARD,
        payload: cardObj
    }
}

function addCardSuccess(card) {
    return {
        type: ADD_CARD_SUCCESS,
        payload: card
    };
}

function addCardFailure(err) {
    return {
        type: ADD_CARD_FAILURE,
        payload: err
    };
}

export function addCard(cardObj) {
    return (dispatch) => {
        dispatch(add(cardObj));
        
        axios.post(
            `${API_URL}/cards`,
            cardObj,
            API_JSON_HEADERS
        )
        .then((response) => 
            dispatch(addCardSuccess(response.data))
        )
        .catch((err) =>
            dispatch(addCardFailure(err))
        );
    }
}

export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS';
export const REMOVE_CARD_FAILURE = 'REMOVE_CARD_FAILURE';

export function remove(cardId) {
    return {
        type: REMOVE_CARD,
        payload: cardId
    }
}

export function removeCardSuccess() {
    return {
        type: REMOVE_CARD_SUCCESS
    };
}


export function removeCardFailure(err) {
    return {
        type: REMOVE_CARD_FAILURE,
        payload: err
    };
}

export function removeCard(cardId) {
    return (dispatch) => {
        dispatch(remove(cardId));
        
        axios.delete(`${API_URL}/cards/${cardId}`)
        .then((response) => dispatch(removeCardSuccess()))
        .catch((err) => dispatch(removeCardFailure(err)));
    }
}

export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_FAILURE = 'UPDATE_CARD_FAILURE';

function update(card) {
    return {
        type: UPDATE_CARD,
        payload: card
    }
}

function updateCardSuccess() {
    return {
        type: UPDATE_CARD_SUCCESS
    }
}

function updateCardFailure(err) {
    return {
        type: UPDATE_CARD_FAILURE,
        payload: err
    }
}

export function updateCard(cardObj) {
    return (dispatch) => {
        dispatch(update(cardObj));
        
        axios.put(`${API_URL}/cards/${cardObj.id}`)
        .then((response) => dispatch(updateCardSuccess()))
        .catch((err) => dispatch(updateCardFailure(err)));
    }
}
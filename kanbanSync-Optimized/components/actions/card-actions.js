export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export function add(cardObj) {
    return {
        type: ADD_CARD,
        payload: cardObj
    }
}

export function update(cardObj) {
    return {
        type: UPDATE_CARD,
        payload: cardObj
    }
}

export function remove(cardId) {
    return {
        type: REMOVE_CARD,
        payload: cardId
    }
}
export const OPEN_DRAFT = 'OPEN_DRAFT';
export const UPDATE_DRAFT = 'UPDATE_DRAFT';
export const CLOSE_DRAFT = 'CLOSE_DRAFT';

export function open(cardObj) {
    return {
        type: OPEN_DRAFT,
        payload: cardObj
    }
}

export function update(field, value) {
    return {
        type: UPDATE_DRAFT,
        payload: {
            field: field,
            value: value
        }
    }
    
}

export function close() {
    return {
        type: CLOSE_DRAFT
    };
}
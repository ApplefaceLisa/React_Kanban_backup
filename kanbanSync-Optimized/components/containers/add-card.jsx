import React from 'react'
import { connect } from 'react-redux'
import { open as addCard} from '../actions/draft-actions'

let AddCard = ({ dispatch }) => {
    return (
        <div 
            className = "float-button"
            onClick = {
                (evt) => dispatch(addCard(null))
            }
        >+</div>
    )
}

AddCard = connect()(AddCard);
export default AddCard;
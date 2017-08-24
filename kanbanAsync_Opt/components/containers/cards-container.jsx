import { connect } from 'react-redux';

import * as CardActions  from '../actions/card-actions';
import * as TaskActions  from '../actions/task-actions';
import * as DraftActions from '../actions/draft-actions';

import CardList from '../ui/card-list.jsx'

const filterCards = (cards, keyword) => {
    return cards.filter(card => card.status === keyword);
}
const mapStateToProps = (state, ownProps) => ({
    cards: filterCards(state.cards.cards, ownProps.filter)
});

const mapDispatchToProps = (dispatch) => {
    return {
        editCard : (cardObj) => {
            dispatch(DraftActions.open(cardObj));
        },
        removeCard : (cardId) => {
            dispatch(CardActions.removeCard(cardId));
        },
        addTask : (cardId, taskName) => {
            dispatch(TaskActions.addTask(cardId, taskName));
        },
        toggleTask : (cardId, taskId, status) => {
            dispatch(TaskActions.toggleTask(cardId, taskId, status));
        },
        removeTask : (cardId, taskId) => {
            dispatch(TaskActions.removeTask(cardId, taskId));
        }
    }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(CardList);
export default CardsContainer;
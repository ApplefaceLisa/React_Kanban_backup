import { connect } from 'react-redux';

import * as TaskActions from '../actions/task-actions';
import * as CardActions from '../actions/card-actions';
import * as DraftActions from '../actions/draft-actions';

import App from './app.jsx';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: () => {
            dispatch(CardActions.fetchCards())
        },
        addCard: (cardObj) => {
            dispatch(CardActions.addCard(cardObj))
        },
        updateCard: (cardObj) => {
            dispatch(CardActions.update(cardObj))
        },
        removeCard: (cardId) => {
            dispatch(CardActions.removeCard(cardId))  
        },
        addTask: (cardId, taskName) => {
            dispatch(TaskActions.add(cardId, taskName));
        },
        toggleTask: (cardId, taskId) => {
            dispatch(TaskActions.toggle(cardId, taskId));
        },
        removeTask: (cardId, taskId) => {
            dispatch(TaskActions.remove(cardId, taskId));
        },
        openDraft: (cardObj) => {
            dispatch(DraftActions.open(cardObj));
        },
        closeDraft: () => {
            dispatch(DraftActions.close());
        },
        updateDraft: (field, value) => {
            dispatch(DraftActions.update(field, value));
        }
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
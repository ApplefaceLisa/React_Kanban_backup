import { connect } from 'react-redux';

import * as CardActions from '../actions/card-actions';
import * as DraftActions from '../actions/draft-actions';

import ModalDialog from '../ui/modal-dialog';

const mapStateToProps = (state) => ({
    draft : state.draft
});

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (cardObj) => {
            dispatch(CardActions.add(cardObj))
        },
        updateCard: (cardObj) => {
            dispatch(CardActions.update(cardObj))
        },
        updateDraft: (field, value) => {
            dispatch(DraftActions.update(field, value));
        },
        closeDraft: () => {
            dispatch(DraftActions.close());
        }
    }
}

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalDialog);
export default ModalContainer;
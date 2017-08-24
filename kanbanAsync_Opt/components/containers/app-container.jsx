import { connect } from 'react-redux';
import App from '../ui/app.jsx';
import { fetchCards } from '../actions/card-actions';

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: () => {
            dispatch(fetchCards())
        }
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
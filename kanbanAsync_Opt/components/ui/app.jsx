import React from 'react';

import KanbanBoard from './kanban-board.jsx';
import ModalContainer from '../containers/modal-container.jsx';

export default class App extends React.Component {
    componentDidMount() {
        this.props.fetchCards();
    }
    
    showLoading() {
        if (this.props.cards.get('loading')) {
            return <div className = "loading">Fetching cards... sit tight....</div>;
        } else {
            return null;
        }
    }
    
    showError() {
        if (this.props.cards.get('error')) {
            return <div className = "error">{this.props.cards.get('error')}</div>;
        } else {
            return null;
        }
    }
    
    render() {
        return(
            <div className='container'>
                <div className="page-header">Kanban Board</div>
                {
                    this.showLoading()
                }
                {
                    this.showError()
                }
                <KanbanBoard />
                <ModalContainer />
            </div>
        )
    }
}
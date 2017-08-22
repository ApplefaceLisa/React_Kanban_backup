import React from 'react';

import KanbanBoard from './kanban-board.jsx';
import ModalDialog from './modal-dialog.jsx';

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
    
    showKanbanBoard() {
        return(
            <KanbanBoard
                cards = {this.props.cards.get('cards')}
                removeCard = {this.props.removeCard}
                addTask = {this.props.addTask}
                toggleTask = {this.props.toggleTask}
                removeTask = {this.props.removeTask}
                openDraft = {this.props.openDraft}
            />        
        );
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
            <div>
                <h1>Kanban Board</h1>
                {
                    this.showLoading()
                }
                {
                    this.showError()
                }
                {
                    this.showKanbanBoard()
                }
                {
                    this.props.draft.get('show')
                    ?
                    <ModalDialog
                        draft = {this.props.draft}
                        addCard = {this.props.addCard}
                        updateCard = {this.props.updateCard}
                        updateDraft = {this.props.updateDraft}
                        closeDraft = {this.props.closeDraft}
                    />
                    :
                    null
                }
            </div>
        )
    }
}
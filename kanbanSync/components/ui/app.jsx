import React from 'react';

import KanbanBoard from './kanban-board.jsx';
import ModalDialog from './modal-dialog.jsx';

export default class App extends React.Component {
    render() {
        return(
            <div>
                <h1>Kanban Board</h1>
                <KanbanBoard
                    cards = {this.props.cards}
                    addTask = {this.props.addTask}
                    toggleTask = {this.props.toggleTask}
                    removeTask = {this.props.removeTask}
                    openDraft = {this.props.openDraft}
                />
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
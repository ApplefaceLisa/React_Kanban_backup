import React from 'react';

import List from './list.jsx';

export default class KanbanBoard extends React.Component {
    render() {
        return(
            <div>
                <div 
                    className = "float-button"
                    onClick = {
                        (evt) => this.props.openDraft()
                    }
                >+</div>
                <List
                    title = "To Do"
                    cards = {
                        this.props.cards.filter(
                            (card) => card.status === 'todo'
                        )
                    }
                    addTask = {this.props.addTask}
                    toggleTask = {this.props.toggleTask}
                    removeTask = {this.props.removeTask}
                    editCard   = {this.props.openDraft}
                    removeCard = {this.props.removeCard}
                />
                <List
                    title = "In Progress"
                    cards = {
                        this.props.cards.filter(
                            (card) => card.status === 'in-progress'
                        )
                    }
                    addTask = {this.props.addTask}
                    toggleTask = {this.props.toggleTask}
                    removeTask = {this.props.removeTask}
                    editCard   = {this.props.openDraft}
                    removeCard = {this.props.removeCard}
                />
                <List
                    title = "Done"
                    cards = {
                        this.props.cards.filter(
                            (card) => card.status === 'done'
                        )
                    }
                    addTask = {this.props.addTask}
                    toggleTask = {this.props.toggleTask}
                    removeTask = {this.props.removeTask}
                    editCard   = {this.props.openDraft}
                    removeCard = {this.props.removeCard}
                />
            </div>
        )
    }
}
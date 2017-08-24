import React from 'react';

import TaskList from './task-list.jsx';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }
    
    handleEditCard() {
        this.props.editCard(this.props.card);
    }
    
    handleRemoveCard() {
        this.props.removeCard(this.props.card.get('id'));
    }
    
    handleAddTask(taskName) {
        this.props.addTask(this.props.card.get('id'), taskName);
    }
    
    handleRemoveTask(taskId) {
        this.props.removeTask(this.props.card.get('id'), taskId);
    }
    
    handleToggleTask(taskId, prevStatus) {
        this.props.toggleTask(this.props.card.get('id'), taskId, !prevStatus);
    }

    handleClick() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }
    
    render() {
        let className = 'hidden';
        if (this.state.showDetails) {
            className = '';
        }
        return (
            <div className="card">
                <div 
                    className = { this.state.showDetails ? "card_title_is_open" : "card_title" }
                    onClick = { this.handleClick.bind(this) }
                >{this.props.card.get('title')}
                </div>
                <div className="card_edit">
                    <span 
                      className="glyphicon glyphicon-edit" aria-hidden="true"
                      onClick = { this.handleEditCard.bind(this) } >
                    </span>
                    <span 
                      className="glyphicon glyphicon-trash" aria-hidden="true"
                      onClick = { this.handleRemoveCard.bind(this) } >
                    </span>
                </div>
                <div className="card_summary">
                    <div>Priority: {this.props.card.get('priority')}</div>
                    <div>Assigned by: {this.props.card.get('assignee')}</div>
                    <div>Description: {this.props.card.get('description')}</div>
                </div>
                <div 
                    className= {className}
                >
                    
                    <TaskList
                        tasks = {this.props.card.get('tasks')}

                        addTask = {this.handleAddTask.bind(this)}
                        toggleTask = {this.handleToggleTask.bind(this)}
                        removeTask = {this.handleRemoveTask.bind(this)}                    
                    />
                </div>
            </div>
        )
    }
}
import React from 'react';

import CheckList from './check-list.jsx';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }
    
    handleAddTask(cardId, taskName) {
        this.props.addTask(cardId, taskName);
    }
    
    handleRemoveTask(cardId, taskId) {
        this.props.removeTask(cardId, taskId);
    }
    
    handleToggleTask(cardId, taskId) {
        this.props.toggleTask(cardId, taskId);
    }

    handleClick() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }
    
    render() {
        let cardId = this.props.card.get('id');
        let title = this.props.card.get('title');
        let description = this.props.card.get('description');
        let tasks = this.props.card.get('tasks');
        
        let className = 'hidden';
        if (this.state.showDetails) {
            className = '';
        }
        return (
            <div className="card">
                <div className = "card_edit">
                    <span 
                        className = "fa fa-pencil edit-icon"
                        onClick = {
                            (evt) => this.props.editCard(this.props.card)
                        }
                    />
                    {" "}
                    <span 
                        className = "fa fa-times remove-icon"
                        onClick = {
                            (evt) => this.props.removeCard(cardId)
                        }
                    />
                </div>
                <div 
                    className = { this.state.showDetails ? "card_title_is_open" : "card_title" }
                    onClick = { this.handleClick.bind(this) }
                >{title}</div>
                <div 
                    className= {className}
                >
                    <div>{description}</div>
                    <CheckList
                        tasks = {tasks}

                        addTask = {this.handleAddTask.bind(this)}
                        toggleTask = {this.handleToggleTask.bind(this)}
                        removeTask = {this.handleRemoveTask.bind(this)}                    
                    />
                </div>
            </div>
        )
    }
}
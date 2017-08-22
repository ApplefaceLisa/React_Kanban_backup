import React from 'react';

import CheckList from './check-list.jsx';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }
    
    handleAddTask(taskName) {
        this.props.addTask(this.props.id, taskName);
    }
    
    handleRemoveTask(taskId) {
        this.props.removeTask(this.props.id, taskId);
    }
    
    handleToggleTask(taskId) {
        this.props.toggleTask(this.props.id, taskId);
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
                >{this.props.title}</div>
                <div 
                    className= {className}
                >
                    <div>{this.props.description}</div>
                    <CheckList
                        tasks = {this.props.tasks}

                        addTask = {this.handleAddTask.bind(this)}
                        toggleTask = {this.handleToggleTask.bind(this)}
                        removeTask = {this.handleRemoveTask.bind(this)}                    
                    />
                </div>
            </div>
        )
    }
}
import React from 'react';
import Task from './task.jsx'

export default class TaskList extends React.Component {
    checkInputKeyPress(evt) {
        if (evt.key == 'Enter') {
            const taskName = evt.target.value;
            if (taskName.trim() !== '') {
                this.props.addTask(taskName);
            }
            evt.target.value = '';
        }
    }
    
    render() {
        return(
            <div>
                <ul>
                    {this.props.tasks.map(
                        (task) => 
                        <Task 
                            key = {task.get('id')}
                            task = {task} 
                            toggleTask = {this.props.toggleTask}
                            removeTask = {this.props.removeTask}
                        />)
                    }
                </ul>
                
                <input
                    type = "text"
                    className = "checklist_add_task"
                    placeholder = "add a task"
                    onKeyPress = {
                        this.checkInputKeyPress.bind(this)
                    }
                />
            </div>
        )
    }
}
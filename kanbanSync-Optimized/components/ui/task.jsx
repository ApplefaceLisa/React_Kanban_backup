import React from 'react';

export default class Task extends React.Component {
    render () {
        const task = this.props.task;
        return (
            <li className = "checklist_task">
                <input
                    type = "checkbox"
                    checked = {task.get('done')}
                    onChange = {
                        (evt) => this.props.toggleTask(task.get('id'))
                    }
                />
                <span className = {task.get('done') ? 'done' : ''}
                >
                    {task.get('name')}
                </span>
                <span
                    className = "fa fa-times"
                    onClick = {
                        (evt) => this.props.removeTask(task.get('id'))
                    }
                />
            </li>
        )
    }
}
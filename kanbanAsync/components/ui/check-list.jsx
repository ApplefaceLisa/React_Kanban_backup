import React from 'react';

export default class CheckList extends React.Component {
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
        const that = this;
        const tasks = this.props.tasks.map(
            (task) => 
                <li
                    key = {task.get('id')}
                    className = "checklist_task"
                >
                    <input
                        type = "checkbox"
                        checked = {task.get('done')}
                        onChange = {
                            (evt) => that.props.toggleTask(task.get('id'), task.get('done'))
                        }
                    />
                    <span className = {task.get('done') ? 'done' : ''}
                    >
                        {task.get('name')}
                    </span>
                    <span
                        className = "fa fa-times"
                        onClick = {
                            (evt) => that.props.removeTask(task.get('id'))
                        }
                    />
                </li>
        );
        return(
            <div>
                <ul>
                    {tasks}
                </ul>
                
                <input
                    type = "text"
                    className = "checklist_add_task"
                    placeholder = "Type then hit Enter to add a task"
                    onKeyPress = {
                        this.checkInputKeyPress.bind(this)
                    }
                />
            </div>
        )
    }
}
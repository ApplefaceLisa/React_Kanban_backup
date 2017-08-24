import React from 'react';

export default class ModalDialog extends React.Component {
    handleClick() {
        const title = this.props.draft.get('title');
        if (title.trim() !== "") {
            const id = this.props.draft.get('id');
            const description = this.props.draft.get('description');
            const priority = this.props.draft.get('priority');
            const assignee = this.props.draft.get('assignee');
            const status = this.props.draft.get('status');
            
            if (id === '') {
                this.props.addCard({
                    title: title,
                    description: description,
                    priority: priority,
                    assignee: assignee,
                    status: status
                });
            } else {
                this.props.updateCard({
                    id: id,
                    title: title,
                    description: description,
                    priority: priority,
                    assignee: assignee,
                    status: status
                });            
            }
        }
        this.props.closeDraft();
    }
    
    render() {
        const draft = this.props.draft;
        return (
            <div>
            {
                draft.get('show')
                ?
                <div>
                    <div className = "modal-card">
                        <input 
                            className = "input-title"
                            type="text"
                            placeholder="Title"
                            value = {draft.get('title')}
                            onChange = {
                                (evt) => this.props.updateDraft('title', evt.target.value)
                            }
                        />
                        <input 
                            type="text"
                            placeholder="Assignee"
                            value = {draft.get('assignee')}
                            onChange = {
                                (evt) => this.props.updateDraft('assignee', evt.target.value)
                            }
                        />
                        <textarea
                            placeholder="description"
                            value = {draft.get('description')}
                            onChange = {
                                (evt) => this.props.updateDraft('description', evt.target.value)
                            }
                        />
                        <div className = "modal-select">
                            <label>Priority</label>
                            <select 
                              value = { draft.get('priority') }
                              onChange = { (e) => this.props.updateDraft('priority', e.target.value)}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <span></span>
                            <label>Status</label>
                            <select 
                              value = { draft.get('status') }
                              onChange = { (e) => this.props.updateDraft('status', e.target.value)}
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className = "actions">
                            <button
                                onClick = {this.handleClick.bind(this)}
                            >Save</button>
                        </div>
                    </div>
                    <div 
                        className = "overlay"
                        onClick = {
                            (evt) => this.props.closeDraft()
                        }
                    />
                </div>
                :
                null
            }
            </div>
        );
    }
}
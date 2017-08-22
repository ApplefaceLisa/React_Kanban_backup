import React from 'react';

export default class ModalDialog extends React.Component {
    handleClick() {
        const title = this.props.draft.get('title');
        if (title.trim() !== '') {
            const id = this.props.draft.get('id');
            const description = this.props.draft.get('description');
            const status = this.props.draft.get('status');
            
            if (id === '') {
                this.props.addCard({
                    title: title,
                    description: description,
                    status: status
                });
            } else {
                this.props.updateCard({
                    id: id,
                    title: title,
                    description: description,
                    status: status
                });            
            }
        }
        
        this.props.closeDraft();
    }
    
    render() {
        return (
            <div>
                <div className = "modal-card">
                    <input 
                        type="text"
                        placeholder="Title"
                        value = {this.props.draft.get('title')}
                        onChange = {
                            (evt) => this.props.updateDraft('title', evt.target.value)
                        }
                    />
                    <textarea
                        placeholder="description"
                        value = {this.props.draft.get('description')}
                        onChange = {
                            (evt) => this.props.updateDraft('description', evt.target.value)
                        }
                    />
                    <div>
                        <label>Status</label>
                        <select 
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
        );
    }
}
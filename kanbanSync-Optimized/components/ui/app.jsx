import React from 'react';

import KanbanBoard from './kanban-board.jsx';
import ModalContainer from '../containers/modal-container.jsx';

export default class App extends React.Component {
    render() {
        return(
            <div className='container'>
                <div className="page-header">Kanban Board</div>
                <KanbanBoard />
                <ModalContainer />
            </div>
        )
    }
}
import React from 'react';

import Panel from './panel';
import AddCard from '../containers/add-card';

export default class KanbanBoard extends React.Component {
    render() {
        return(
            <div className="container board">
                <AddCard />
                <div className='row'>
                    <Panel
                        title = "To Do"
                        filter = 'todo'                   
                    />
                    <Panel
                        title = "In Progress"
                        filter = 'in-progress'                 
                    />
                    <Panel
                        title = "Done"
                        filter =  'done'                   
                    />
                </div>
            </div>
        )
    }
}
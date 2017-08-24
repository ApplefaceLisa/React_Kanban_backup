import React from 'react';

import Card from './card.jsx';

export default class List extends React.Component {
    render() {
        const cards = this.props.cards.map(
            (card) => 
                <Card
                    key = {card.get('id')}
                    card = {card}
                    
                    addTask = {this.props.addTask}
                    toggleTask = {this.props.toggleTask}
                    removeTask = {this.props.removeTask}
                    editCard   = {this.props.editCard}
                    removeCard = {this.props.removeCard}
                />
        );
        return(
            <div className='list'> 
                <h3>{this.props.title}</h3>
                {
                   cards 
                }
            </div>
        )
    }
}

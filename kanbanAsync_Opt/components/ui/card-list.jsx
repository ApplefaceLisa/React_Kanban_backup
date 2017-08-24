import React from 'react';

import Card from './card.jsx';

export default class CardList extends React.Component {
    render() {
        return(
            <div>
                {
                    this.props.cards.map(
                    (card) => 
                        <Card
                            key = {card.get('id')}
                            card = {card}
                            
                            editCard = {this.props.editCard}
                            removeCard = {this.props.removeCard}
                            addTask = {this.props.addTask}
                            toggleTask = {this.props.toggleTask}
                            removeTask = {this.props.removeTask}                    
                        />
                    )
                }
            </div>
        )
    }
}

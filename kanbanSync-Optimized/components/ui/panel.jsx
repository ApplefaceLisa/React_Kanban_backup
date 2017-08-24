import React from 'react';
import CardsContainer from '../containers/cards-container';

export default class Panel extends React.Component {
    render () {
        const panelClassName = "panel panel-default " + this.props.filter;
      
        return (
            <div className = {panelClassName}>
              <div className = "panel-heading">
                <h3 className = "panel-title">{this.props.title}</h3>
              </div>
              <div className = "panel-body">
                <CardsContainer filter={this.props.filter} />
              </div>
            </div>
        )
    }
}
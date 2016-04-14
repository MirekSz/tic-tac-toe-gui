import React, {Component} from 'react';
import Card from './../card/Card';

export default class Fight extends Component {
    constructor() {
        super();
    }

    render() {
        var cards = [];
        for (var i = 0; i < this.props.players.length; i++) {
            var obj = this.props.players[i];
            cards.push(<Card player={obj}/>);
        }

        return (
            <div className=" col-xs-4">
                {cards}
            </div>
        );
    }
}


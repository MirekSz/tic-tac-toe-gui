import React, {Component} from 'react';
import Card from './../card/Card';
import _ from 'lodash';

export default class Fight extends Component {
    constructor() {
        super();
    }

    render() {
        var cards = [];
        var players = _.sortBy(this.props.players, (player)=> {
            return player.wins - player.loses;
        }).reverse();


        for (var i = 0; i < players.length; i++) {
            var obj = players[i];
            cards.push(<Card player={obj}/>);
        }

        return (
            <div className="col-xs-4">
                {cards}
            </div>
        );
    }
}


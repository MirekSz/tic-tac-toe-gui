import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Card from './../card/Card';
import _ from 'lodash';
export default class Rank extends Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        var cards = [];
        var players = _.sortBy(this.props.players, (player)=> {
            return player.wins - player.loses;
        }).reverse();


        for (var i = 0; i < players.length; i++) {
            var obj = players[i];
            cards.push(<Card player={obj} stars={3-i}/>);
        }

        return (
            <div className="col-xs-4">
                {cards}
            </div>
        );
    }
}


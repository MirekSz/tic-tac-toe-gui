import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';
export default class App extends Component {
    constructor() {
        super();
        this.state = {name: 'mirek'}
    }

    render() {
        var players = createPlayers();
        return (
            <div>
                <div className=" col-xs-12 text-info"><h1>Round 7</h1></div>
                <hr width="100%"/>
                <Fight playerA={players[0]} playerB={players[5]}/>
                <Rank players={players}/>
            </div>
        );
    }
}

function createPlayers() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        var player = {name: 'Player ' + i, host: 'localhost:808' + i};
        player.stats = {wins: i, loses: i * i, draws: i + 5};
        result.push(player)
    }
    return result;
}


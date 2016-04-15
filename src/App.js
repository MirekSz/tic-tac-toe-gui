import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            players: [],
            board: {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9}
        }
    }

    componentDidMount() {
        connect(this);
    }

    render() {
        return (
            <div>
                <div className=" col-xs-12 text-info"><h1>Round 7</h1></div>
                <hr width="100%"/>
                <Fight playerA={this.state.playerA} playerB={this.state.playerB} board={this.state.board}/>
                <Rank players={this.state.players}/>
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

function connect(App) {
    var socket = new SockJS('http://localhost:8080/move');
    var stompClient = Stomp.over(socket);
    stompClient.connect('', '', function (frame) {
        stompClient.subscribe('/topic/fight', function (move) {
            var parse = JSON.parse(move.body);
            var state = App.state;
            state.playerA = parse.playerA;
            state.playerB = parse.playerB;
            state.board = {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9};
            App.setState(state);
        });
        stompClient.subscribe('/topic/players', function (move) {
            var parse = JSON.parse(move.body);
            var state = App.state;
            state.players = parse;
            App.setState(state);
        });
        stompClient.subscribe('/topic/move', function (move) {
            var parse = JSON.parse(move.body);
            var name = parse.owner.name;
            var valid = parse.valid;
            var x = parse.x;
            var y = parse.y;
            if (valid) {
                var param = `x${x}y${y}`;
                var board = App.state.board;
                board[param] = name;
                var state = App.state;
                state.board = board;
                App.setState(state);
                console.log('fight: ');
                console.log(move);
            }
        });
    }, stompFailureCallback);
}
var stompFailureCallback = function (error) {
    console.log('STOMP: ' + error);
    setTimeout(connect, 10000);
    console.log('STOMP: Reconecting in 10 seconds');
};







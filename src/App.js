import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            players: [],
            board: {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9}
        };
    }

    componentDidMount() {
        connect(this);
    }

    resetBoard() {
        this.setState({board: {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9}});
    }

    render() {
        return (
            <div>
                <div className=" col-xs-12 text-info"><h1>Round {this.state.round}</h1></div>
                <hr width="100%"/>
                <Fight playerA={this.state.playerA} playerB={this.state.playerB} board={this.state.board}/>
                <Rank players={this.state.players}/>
            </div>
        );
    }
}
/**
 *
 * @param {App} app
 */
function connect(app) {
    var socket = new SockJS('http://localhost:8080/round');
    var stompClient = Stomp.over(socket);
    stompClient.connect('', '', function (frame) {
        debugger;
        stompClient.subscribe('/topic/round', function (move) {
            app.resetBoard();
            app.setState({round:move.body});
        });

        stompClient.subscribe('/topic/fight', function (move) {
            var parse = JSON.parse(move.body);
            var playerA = parse.playerA;
            var playerB = parse.playerB;
            app.resetBoard();
            app.setState({playerA, playerB});
        });
        stompClient.subscribe('/topic/players', function (move) {
            var parse = JSON.parse(move.body);
            app.setState({players: parse});
        });
        stompClient.subscribe('/topic/move', function (move) {
            var parse = JSON.parse(move.body);
            var name = parse.owner.name;
            var valid = parse.valid;
            var x = parse.x;
            var y = parse.y;
            if (valid) {
                var param = `x${x}y${y}`;
                var board = app.state.board;
                board[param] = name;
                app.setState({board});
                console.log('fight: ');
                console.log(move);
            }
        });
    }, function (error) {
        console.log('STOMP: ' + error);
        setTimeout(()=>{
            connect(app);
        }, 10000);
        console.log('STOMP: Reconecting in 10 seconds');
    });
}
var stompFailureCallback = function (error) {
    console.log('STOMP: ' + error);
    setTimeout(connect, 10000);
    console.log('STOMP: Reconecting in 10 seconds');
};







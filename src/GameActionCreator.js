import Dispacher from './flux/Dispacher';
import request from 'superagent';

export var ACTION_TYPE = {
    START_GAME: 'START_GAME',
    MOVE: 'MOVE',
    FIGHT: 'FIGHT',
    ROUND: 'ROUND',
    PLAYERS: 'PLAYERS',
    RESET_BOARD: 'RESET_BOARD'
};

class GameActionCreator {

    startGame() {
        request
            .get('http://localhost:8080/getPlayers')
            .end((err, res) => {
                var players = res.body;
                this.currentPlayersList(players);
            });
        request
            .get('http://localhost:8080/getCurrentRound')
            .end((err, res)=> {
                this.startNewRound(res.text);
            });
        request
            .get('http://localhost:8080/getCurrentFight')
            .end((err, res)=> {
                var parse = res.body;
                var playerA = parse.playerA;
                var playerB = parse.playerB;

                this.startNewFight({playerA, playerB});
            });
        setTimeout(function () {
            addWebSocketListeners();
        }, 1000)
    }

    startNewRound(round) {
        Dispacher.dispach({type: ACTION_TYPE.ROUND, data: round});
    }

    startNewFight(playerA, playerB) {
        this.resetBoard();
        Dispacher.dispach({type: ACTION_TYPE.FIGHT, data: {playerA, playerB}});
    }

    executeMove(field, player) {
        Dispacher.dispach({type: ACTION_TYPE.MOVE, data: {field, player}});
    }

    currentPlayersList(players) {
        Dispacher.dispach({type: ACTION_TYPE.PLAYERS, data: players});
    }

    resetBoard() {
        Dispacher.dispach({type: ACTION_TYPE.RESET_BOARD});
    }
}
var gameActionCreator = new GameActionCreator();
export default gameActionCreator;

function addWebSocketListeners() {
    var socket = new SockJS('http://localhost:8080/round');
    var stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect('', '', function (frame) {
        stompClient.subscribe('/topic/round', function (response) {
            gameActionCreator.startNewRound(response.body);
        });

        stompClient.subscribe('/topic/fight', function (response) {
            var parse = JSON.parse(response.body);
            var playerA = parse.playerA;
            var playerB = parse.playerB;
            gameActionCreator.startNewFight(playerA, playerB);
        });
        stompClient.subscribe('/topic/players', function (response) {
            var players = JSON.parse(response.body);

            gameActionCreator.currentPlayersList(players);
        });
        stompClient.subscribe('/topic/move', function (response) {
            var parse = JSON.parse(response.body);
            var name = parse.owner.name;
            var valid = parse.valid;
            var x = parse.x;
            var y = parse.y;
            if (valid) {
                var param = `x${x}y${y}`;
                gameActionCreator.executeMove(param, name);
            }
        });
    }, function (error) {
        console.log('STOMP: ' + error);
        setTimeout(()=> {
            connect(gameActionCreator);
        }, 10000);
        console.log('STOMP: Reconecting in 10 seconds');
    });
}



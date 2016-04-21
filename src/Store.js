import request from 'superagent';
import React, {Component} from 'react';
import Immutable from 'immutable';

export class Store {
    constructor() {
        this.state = {};
    }

    getState(id) {
        return this.state[id];
    }

    getAllState() {
        return this.state;
    }

    getJSON() {
        return JSON.stringify(this.state);
    }

    setState(options) {
        for (let key in options) {
            this.state[key] = options[key];
        }

        if (this.listener) {
            this.listener();
        }
    }

    addChangeListener(listener) {
        this.listener = listener;
    }

    removeChangeListener() {
        this.listener = undefined;
    }
}

const initialBoard = {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9};
export class GameStore extends Store {

    constructor() {
        super();
        this.getCurrenGameState();
        this.addWebSocketListeners(this);
        this.resetBoard();
    }


    getCurrenGameState() {
        request
            .get('http://localhost:8080/getPlayers')
            .end((err, res) => {
                var parse = res.body;
                this.setState({players: parse});
            });
        request
            .get('http://localhost:8080/getCurrentRound')
            .end((err, res)=> {
                this.setState({round: res.text});
            });
        request
            .get('http://localhost:8080/getCurrentFight')
            .end((err, res)=> {
                var parse = res.body;
                var playerA = parse.playerA;
                var playerB = parse.playerB;

                this.setState({playerA, playerB});
                this.resetBoard();
            });
    }

    resetBoard() {
        this.setState({board: Immutable.fromJS(initialBoard)})
    }

    addWebSocketListeners(store) {
        var socket = new SockJS('http://localhost:8080/round');
        var stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect('', '', function (frame) {
            stompClient.subscribe('/topic/round', function (move) {
                store.resetBoard();
                store.setState({round: move.body});
            });

            stompClient.subscribe('/topic/fight', function (move) {
                var parse = JSON.parse(move.body);
                var playerA = parse.playerA;
                var playerB = parse.playerB;
                store.resetBoard();
                store.setState({playerA, playerB});
            });
            stompClient.subscribe('/topic/players', function (move) {
                var parse = JSON.parse(move.body);

                store.setState({players: parse});
            });
            stompClient.subscribe('/topic/move', function (move) {
                var parse = JSON.parse(move.body);
                var name = parse.owner.name;
                var valid = parse.valid;
                var x = parse.x;
                var y = parse.y;
                if (valid) {
                    var param = `x${x}y${y}`;
                    var board = store.getState('board');
                    board = board.set(param, name);
                    store.setState({board});
                }
            });
        }, function (error) {
            console.log('STOMP: ' + error);
            setTimeout(()=> {
                connect(store);
            }, 10000);
            console.log('STOMP: Reconecting in 10 seconds');
        });
    }
}
export function connectSlectiveToStores(Component, store, getStateFromStores) {
    const StoreConnection = React.createClass({
        getInitialState() {
            var stateFromStores = getStateFromStores(this.props);
            return stateFromStores;
        },
        componentDidMount() {
            store.addChangeListener(this.handleStoresChanged)
        },
        componentWillUnmount() {
            store.removeChangeListener(this.handleStoresChanged)
        },
        handleStoresChanged() {
            if (this.isMounted()) {
                var stateFromStores = getStateFromStores(this.props);
                this.setState(stateFromStores);
            }
        },
        render() {
            return <Component {...this.props} {...this.state} />;
        }
    });
    return StoreConnection;
}

export function connectToStores(Component, store) {
    const StoreConnection = React.createClass({
        getInitialState() {
            return store.getAllState();
        },
        componentDidMount() {
            store.addChangeListener(this.handleStoresChanged)
        },
        componentWillUnmount() {
            store.removeChangeListener(this.handleStoresChanged)
        },
        handleStoresChanged() {
            if (this.isMounted()) {
                this.setState(store.getAllState());
            }
        },
        render() {
            return <Component {...this.props} {...this.state} />;
        }
    });
    return StoreConnection;
}

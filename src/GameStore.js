import request from 'superagent';
import React, {Component} from 'react';
import Immutable from 'immutable';
import BaseStore from './flux/BaseStore';
import gameActionCreator, {ACTION_TYPE}  from './GameActionCreator';


const initialBoard = {x1y1: 1, x2y1: 2, x3y1: 3, x1y2: 4, x2y2: 5, x3y2: 6, x1y3: 7, x2y3: 8, x3y3: 9};
export class GameStore extends BaseStore {

    constructor() {
        super();
    }

    initImpl() {
        this.resetBoard();
        this.setState({fight: {}})
    }

    resetBoard() {
        this.setState({board: Immutable.fromJS(initialBoard)})
    }

    dispacherListener(action) {
        if (action.type === ACTION_TYPE.ROUND) {
            this.setState({round: action.data})
        }
        if (action.type === ACTION_TYPE.PLAYERS) {
            this.setState({players: action.data})
        }
        if (action.type === ACTION_TYPE.FIGHT) {
            this.setState({fight: action.data})
        }
        if (action.type === ACTION_TYPE.MOVE) {
            var {field, player}=action.data;
            var {board} = this.getAllState();
            board = board.set(field, player);
            this.setState({board})
        }

        if (action.type === ACTION_TYPE.RESET_BOARD) {
            this.resetBoard();
        }
    }
}

export default new GameStore();

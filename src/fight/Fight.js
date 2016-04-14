import React, {Component} from 'react';
import Card from './../card/Card';
import Board from './Board';

export default class Fight extends Component {
    constructor() {
        super();
        this.state = {board: {}};
    }

    componentDidMount() {
        var self = this;
        var lastPplayer='Player 1'
        setInterval(function () {
            if(lastPplayer =='Player 1'){
                lastPplayer='Player 2'
            }
            var x = Math.floor((Math.random() * 3) + 1);
            var y = Math.floor((Math.random() * 3) + 1);
            var param = `x${x}y${y}`;
            var board = self.state.board;
            board[param] = lastPplayer;
            self.setState({board: board})
        }, 1000)
    }

    render() {
        return (
            <div className="row col-xs-8">
                <div >
                    <div className="col-xs-5">
                        <Card fight="true" player={this.props.playerA}/>
                    </div>
                    <div className="col-xs-2 text-danger text-center"><h1>Vs</h1></div>
                    <div className="col-xs-5">
                        <Card fight="true" player={this.props.playerB}/>
                    </div>
                </div>
                <div className="col-xs-12">
                    <Board board={this.state.board}/>
                </div>
            </div>
        );
    }
}


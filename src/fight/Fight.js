import React, {Component} from 'react';
import Card from './../card/Card';
import Board from './Board';

export default class Fight extends Component {
    constructor() {
        super();
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
                    <Board board={this.props.board}/>
                </div>
            </div>
        );
    }
}








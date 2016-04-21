import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className=" col-xs-12 text-info"><h1>Round {this.props.round}</h1></div>
                <hr width="100%"/>
                <Fight playerA={this.props.playerA} playerB={this.props.playerB} board={this.props.board}/>
                <Rank players={this.props.players}/>
            </div>
        );
    }
}



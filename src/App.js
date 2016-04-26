import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';
import {connectToStores} from './flux/Decorators';
import gameStore from './GameStore';

export default class App extends Component {
    constructor() {
        super();
        this.RankContainer = connectToStores(Rank, gameStore, (props) => {
            return gameStore.getAllState();
        });
    }

    render() {
        return (
            <div>
                <div className=" col-xs-12 text-info"><h1>Round {this.props.round}</h1></div>
                <hr width="100%"/>
                <Fight playerA={this.props.fight.playerA} playerB={this.props.fight.playerB} board={this.props.board}/>
                <this.RankContainer />
                <Rank players={this.props.players}/>
            </div>
        );
    }
}



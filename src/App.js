import React, {Component} from 'react';
import Fight from './fight/Fight';
import Rank from './rank/Rank';
import RankContainer from './rank/RankContainer';
import {connectToStores} from './flux/Decorators';
import gameStore from './GameStore';

const HelloMessage = (props) => <div>Hello {props.name}</div>;
export default class App extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
        this.RankContainer = connectToStores(Rank, gameStore, (props) => {
            return gameStore.getAllState();
        });
    }

    render() {
        return (
            <div>
                <HelloMessage name="mirek" />
                <div className=" col-xs-12 text-info"><h1>Round {this.props.round}</h1></div>
                <hr width="100%"/>
                <Fight playerA={this.props.fight.playerA} playerB={this.props.fight.playerB} board={this.props.board}/>
                <this.RankContainer />
                <Rank players={this.props.players}/>
                <RankContainer store={gameStore} component={Rank}/>
            </div>
        );
    }
}



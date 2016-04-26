import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import gameStore from './GameStore';
import GameActionCreator from './GameActionCreator';
import {connectToStores} from './flux/Decorators';

export default class SimplePrinter extends Component {
    render() {
        return (
            <div>
                {JSON.stringify(this.props)}
            </div>
        );
    }
}


var ContainerComponent = connectToStores(App, gameStore, (props) => {
    return gameStore.getAllState();
});
ReactDOM.render(<ContainerComponent name2="maja"/>, document.getElementById('root'));
GameActionCreator.startGame();


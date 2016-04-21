import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {connectToStores, GameStore} from './Store';

export default class Demo extends Component {
    render() {
        return (
            <div>
                1.{this.props.name2} <br/>
                1.{JSON.stringify(this.props.board)} <br/>
                2.{this.props.name}
            </div>
        );
    }
}


var store = new GameStore();
var ProfilePage = connectToStores(App, store, (props) => {
    return store.getState();
});
store.setState({name: "mirek"});
ReactDOM.render(<ProfilePage name2="maja"/>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';


export default class App extends Component {
    render() {
        return (
            <div>yu
                {this.props.name2}
                {this.props.name}
            </div>
        );
    }
}
class Store {
    constructor() {
        this.state = {};
    }

    get(id) {
        return this.state[id];
    }

    setState(key, val) {
        this.state[key] = val;
        debugger;
        if (this.listener) {
            this.listener.handleStoresChanged();
        }
    }

    addChangeListener(listener) {
        this.listener = listener;
    }

    removeChangeListener() {
        this.listener = undefined;
    }
}

function connectToStores(Component, store, getStateFromStores) {
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
                debugger;
                this.setState(stateFromStores);
            }
        },
        render() {
            return <Component {...this.props} {...this.state} />;
        }
    });
    return StoreConnection;
};
var store = new Store();
var ProfilePage = connectToStores(App, store, (props) => {
    return {name: store.get('name')}
});
store.setState("name", "mirek");
ReactDOM.render(<ProfilePage name2="maja"/>, document.getElementById('root'));

/**
 * Created by Mirek on 2015-10-09.
 */
import React, {Component} from 'react';

export function observe(subject) {
    return function (target) {
        target.prototype.addListenersToStore = function () {
            var listener = ()=> {
                this.setState(this.getData());
            };
            this.listener = listener;
            this.props.store.addListener(listener);

            if (!this.props.store.initialized) {
                this.props.store.init();
            }
        };

        target.prototype.removeListenersToStore = function () {
            this.props.store.removeListener(this.listener);
        }
    }
}

export function observable(target) {
    target.listeners = [];

    target.prototype.addListener = function (listener) {
        target.listeners.push(listener);
    };

    target.prototype.removeListener = function (listener) {
        var index = target.listeners.indexOf(listener);
        target.listeners.splice(index, 1);
    };

    target.prototype.emmit = function (event) {
        for (var i = 0; i < target.listeners.length; i++) {
            var listener = target.listeners[i];
            listener(event);
        }
    };
}


export function connectToStores(Component, store) {
    store.init();
    return React.createClass({
        getInitialState() {
            return store.getAllState();
        },
        componentDidMount() {
            console.log('Did Mount: ');
            console.log(Component);
            store.addListener(this.handleStoresChanged)
        },
        componentWillUnmount() {
            store.removeListener(this.handleStoresChanged)
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
}
//var ProfilePage = connectToStores(Demo, someStore, (props) => {
//    return {name:store.getState(props.ud)};
//});
export function connectSlectiveToStores(Component, store, getStateFromStores) {
    const StoreConnection = React.createClass({
        getInitialState() {
            var stateFromStores = getStateFromStores(this.props);
            return stateFromStores;
        },
        componentDidMount() {
            store.addListener(this.handleStoresChanged)
        },
        componentWillUnmount() {
            store.removeListener(this.handleStoresChanged)
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

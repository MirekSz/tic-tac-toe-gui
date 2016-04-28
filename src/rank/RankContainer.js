/**
 * Created by Mirek on 2016-04-28.
 */
import React, {Component} from 'react';

export default class RankContainer extends Component {
    constructor(props) {

        super(props);
        this.store = props.store;
        this.Decoratable = props.component;
    }

    getInitialState() {
        return this.store.getAllState();
    }

    componentDidMount() {
        if (this.store)
            this.store.addListener(this.handleStoresChanged.bind(this))
    }

    componentWillUnmount() {
        if (this.store)
            this.store.removeListener(this.handleStoresChanged.bind(this))
    }

    handleStoresChanged() {
        if (this.store)
            this.setState(this.store.getAllState());
    }

    render() {
        if (!this.Decoratable) {
            return <div>empty</div>
        }
        return <this.Decoratable {...this.props} {...this.state} />;
    }
}

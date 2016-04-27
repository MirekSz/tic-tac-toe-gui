import React, {Component} from 'react';

function colorize(name) {
    var chars = [];
    var split = name.split("");
    for (var i = 0; i < split.length; i++) {
        var styles = {color: "red"};
        var obj = split[i];
        if (i % 2 == 0) {
            styles.color = "green";
            chars.push(<span style={styles}>{obj}</span>);
        } else {
            chars.push(<span style={styles}>{obj}</span>);
        }
    }
    return chars;
}
export default class Counter extends Component {
    constructor() {
        super();
        this.state = {name: 'John'}
    }

    nameValueLink = (value) => {
        return {
            value: this.state.name,
            requestChange: this.handleNameChange.bind(this)
        };
    }

    handleNameChange(newEmail) {
        this.setState({name: newEmail});
    }

    changeLetters() {
        console.log('changeLetters: ');
        return new Promise((resolve)=> {
            setTimeout(()=> {
                this.setState({name: this.state.name.substr(0, this.state.name.length - 1)});
                console.log(this.state.name);
                resolve();
            }, 100)
        });
    }

    render() {
        var chars = colorize(this.state.name);
        return (<div>
                <input valueLink={this.nameValueLink()}/>
                <h2 onClick={::this.changeLetters} ref="result">{chars}</h2>
                {big(this.state.name)}
            </div>
        );
    }
}

var big = (chars)=> {
    return <h1>{chars}</h1>
}

import React, {Component} from 'react';
import css from './Card.less';

export default class Card extends Component {
    constructor() {
        super();
    }

    render() {
        var player = this.props.player;
        if (!player) {
            player = {}
        }
        var panelClass = 'panel-info';
        if (this.props.fight) {
            panelClass = 'panel-warning';
        }
        return (
            <div className={"panel "+ panelClass}>
                <div className="panel-heading">
                    <div className="row">
                        <h3 className="panel-title col-xs-8">{player.name}</h3>
                    <span className="btn btn-xs btn-success btn-fab-mini col-xs-2"><i
                        className="material-icons">grade</i>
                        <div className="ripple-container"></div>
                    </span>
                    </div>
                </div>
                <div className="panel-body">
                    <h4 className={css.cardSummary}>
                        Wins : {player.wins}, Loses: {player.loses}, Draws: {player.draws}
                    </h4>
                </div>
                <div className="panel-footer text-right">
                    <i className="material-icons">timeline</i>&nbsp;
                    Wins : {player.wins},
                    Loses: {player.loses},
                    Draws: {player.draws}
                </div>
            </div>
        );
    }
}


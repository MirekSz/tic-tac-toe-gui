import React, {Component} from 'react';
import css from './Card.less';

export default class Card extends Component {
    constructor() {
        super();
    }

    render() {
        var player = this.props.player;
        if (!player) {
            player = {stats: {}}
        }
        var panelClass = 'panel-info';
        if (this.props.fight) {
            panelClass = 'panel-warning';
        }
        return (
            <div className={"panel "+ panelClass}>
                <div className="panel-heading">
                    <h3 className="panel-title">{player.name}</h3>
                </div>
                <div className="panel-body">
                    <h4 className={css.cardSummary}>
                        Wins : {player.stats.wins}, Loses: {player.stats.loses},
                        Draws: {player.stats.draws}
                    </h4>
                </div>
            </div>
        );
    }
}


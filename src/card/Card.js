import React, {Component} from 'react';
import css from './Card.less';
import PureRenderMixin from 'react-addons-pure-render-mixin';

function Footer(props) {
    if (props.disable) {
        return <div></div>;
    }
    return (
        <div className="panel-footer text-right">
            <div>
                <i className="material-icons">flash_on</i>&nbsp;
                Wins : {props.dwins},
                Loses: {props.dloses},
                Draws: {props.ddraws}
            </div>
        </div>);
}


export default class Card extends Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {dwins: 0, ddraws: 0, dloses: 0};
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.fight && this.props.player) {
            var {wins, draws, loses} =  this.props.player;
            var nwins = nextProps.player.wins;
            var ndraws = nextProps.player.draws;
            var nloses = nextProps.player.loses;

            this.setState({dwins: nwins - wins, ddraws: ndraws - draws, dloses: nloses - loses});
        }
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
        var stars = [];
        for (var i = 0; i < this.props.stars; i++) {
            stars.push(<span className="material-icons pull-right">grade</span>)

        }
        return (
            <div className={"panel "+ panelClass}>
                <div className="panel-heading container-fluid">
                    <div className="row">
                        <div className=" col-xs-8"><h3 className="panel-title">{player.name}</h3></div>
                        <div className=" col-xs-4">
                            {stars}
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <h4 className={css.cardSummary}>
                        Wins : {player.wins}, Loses: {player.loses}, Draws: {player.draws}
                    </h4>
                </div>
                <Footer {...this.state} disable={this.props.fight}/>
            </div>
        )
    }
}


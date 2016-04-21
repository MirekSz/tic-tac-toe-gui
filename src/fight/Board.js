import React, {Component} from 'react';
import css from './Board.less';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Board extends Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    getWiningSet(board) {
        var result = {};
        var {x1y1, x2y1, x3y1, x1y2, x2y2, x3y2, x1y3, x2y3, x3y3} =board;


        if (x1y1 == x2y1 && x2y1 == x3y1) {
            return {x1y1: css.win, x2y1: css.win, x3y1: css.win};
        }
        if (x1y2 == x2y2 && x2y2 == x3y2) {
            return {x1y2: css.win, x2y2: css.win, x3y2: css.win};
        }
        if (x1y3 == x2y3 && x2y3 == x3y3) {
            return {x1y3: css.win, x2y3: css.win, x3y3: css.win};
        }
        if (x1y1 == x1y2 && x1y2 == x1y3) {
            return {x1y1: css.win, x1y2: css.win, x1y3: css.win};
        }
        if (x2y1 == x2y2 && x2y2 == x2y3) {
            return {x2y1: css.win, x2y2: css.win, x2y3: css.win};
        }
        if (x3y1 == x3y2 && x3y2 == x3y3) {
            return {x3y1: css.win, x3y2: css.win, x3y3: css.win};
        }
        if (x1y1 == x2y2 && x2y2 == x3y3) {
            return {x1y1: css.win, x2y2: css.win, x3y3: css.win};
        }
        if (x3y1 == x2y2 && x2y2 == x1y3) {
            return {x3y1: css.win, x2y2: css.win, x1y3: css.win};
        }
        return result;
    }

    render() {
        var board = this.props.board.toJS();
        var winingSet = this.getWiningSet(board);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Board</h3>
                </div>
                <div className="panel-body">
                    <h2>
                        <table className={"table table-bordered text-center "+css.board}>
                            <tr>
                                <td className={winingSet.x1y1}>{board.x1y1}</td>
                                <td className={winingSet.x2y1}>{board.x2y1}</td>
                                <td className={winingSet.x3y1}>{board.x3y1}</td>
                            </tr>
                            <tr>
                                <td className={winingSet.x1y2}>{board.x1y2}</td>
                                <td className={winingSet.x2y2}>{board.x2y2}</td>
                                <td className={winingSet.x3y2}>{board.x3y2}</td>
                            </tr>
                            <tr>
                                <td className={winingSet.x1y3}>{board.x1y3}</td>
                                <td className={winingSet.x2y3}>{board.x2y3}</td>
                                <td className={winingSet.x3y3}>{board.x3y3}</td>
                            </tr>
                        </table>
                    </h2>
                </div>
            </div>
        );
    }
}

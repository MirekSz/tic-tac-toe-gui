import React, {Component} from 'react';
import css from './Board.less';

export default class Board extends Component {
    constructor() {
        super();
    }


    getWiningSet() {
        var result = {}
        var board = this.props.board;
        var {x1y1, x2y1, x3y1, x1y2, x2y2, x3y2, x1y3, x2y3, x3y3} =board;
        if (x1y1 == x2y1 && x2y1 == x3y1) {
            return {x1y1: css.win, x2y1: css.win, x3y1: css.win};
        }
        return result;
    }

    render() {
        var winingSet = this.getWiningSet();
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Board</h3>
                </div>
                <div className="panel-body">
                    <h2>
                        <table className={"table table-bordered text-center "+css.board}>
                            <tr>
                                <td className={winingSet.x1y1}>{this.props.board.x1y1}</td>
                                <td className={winingSet.x2y1}>{this.props.board.x2y1}</td>
                                <td className={winingSet.x3y1}>{this.props.board.x3y1}</td>
                            </tr>
                            <tr>
                                <td className={winingSet.x1y2}>{this.props.board.x1y2}</td>
                                <td className={winingSet.x2y2}>{this.props.board.x2y2}</td>
                                <td className={winingSet.x3y2}>{this.props.board.x3y2}</td>
                            </tr>
                            <tr>
                                <td className={winingSet.x1y3}>{this.props.board.x1y3}</td>
                                <td className={winingSet.x2y3}>{this.props.board.x2y3}</td>
                                <td className={winingSet.x3y3}>{this.props.board.x3y3}</td>
                            </tr>
                        </table>
                    </h2>
                </div>
            </div>
        );
    }
}



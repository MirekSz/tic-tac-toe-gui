import React, {Component} from 'react';
import css from './Board.less';

export default class Board extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Board</h3>
                </div>
                <div className="panel-body">
                    <h2>
                        <table className={"table table-bordered text-center "+css.board}>
                            <tr>
                                <td>{this.props.board.x1y1}</td>
                                <td>{this.props.board.x2y1}</td>
                                <td>{this.props.board.x3y1}</td>
                            </tr>
                            <tr>
                                <td>{this.props.board.x1y2}</td>
                                <td>{this.props.board.x2y2}</td>
                                <td>{this.props.board.x3y2}</td>
                            </tr>
                            <tr>
                                <td>{this.props.board.x1y3}</td>
                                <td>{this.props.board.x2y3}</td>
                                <td>{this.props.board.x3y3}</td>
                            </tr>
                        </table>
                    </h2>
                </div>
            </div>
        );
    }
}


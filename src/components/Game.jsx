import React from "react";

import img from "~/public/test.png";

import img2 from "~/public/code.png";
//Square 方格
class Square extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <button className="square"
                onClick={() => this.props.onClick()}
            >{this.props.value}</button>
        );
    }
}

//Board 面板
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        };
    }
    handleClick(i) {
        const squares = this.state.squares;
        squares[i] = 'X';//只是输出X
        this.setState({
            squares
        })
    }
    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} //注意这一点 ()=>{}里面this是固定了的 类似于 bound 的语法糖
            ></Square>
        )
    }
    render() {
        return (
            <div>
                <div className="status"><img src={img} />{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

//Game 游戏
class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board></Board>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* todo */}</ol>
                </div>
            </div>
        )
    }
}

export default Game
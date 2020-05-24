import React, {Component} from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import Chess from "chess.js";
import openSocket from 'socket.io-client';
import {NODE_SERVER} from "../constants/endpoints";

const game = new Chess();
// const socket = openSocket(NODE_SERVER);
let socket = null;

class HumanVsHuman extends Component {
    // constructor(props){
    //     super(props);
    // }

    static propTypes = {children: PropTypes.func};

    state = {
        fen: "start",
        selectedSquares: [],
        myPosition: {},
    };

    componentDidMount() {
        socket = openSocket(NODE_SERVER);
        socket.on('users:getMove', data => this.updateBoard(data));
        socket.on('restore_match', data => this.updateBoard(data));
        socket.on('opponent_status', data => this.props.opponentStatus(data));
        socket.emit('init_match', {matchId: this.props.matchId, player: this.props.color})
    }

    componentWillUnmount(): void {
        socket.emit('show_offline', {matchId: this.props.matchId, player: this.props.color})
        socket.disconnect()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.fen !== this.props.fen) {
            this.setState({
                              fen: this.props.fen
                          })
        }
        if(prevProps.color !== this.props.color){
            socket.emit('init_match', {matchId: this.props.matchId, player: this.props.color})
        }
    }

    updateBoard = (data) => {
        game.move({from: data.source, to: data.target, promotion: "q"});
        this.setState({fen: ""}, ()=>{
                        this.setState({
                                          fen: data.fen,
                                          myPosition: data.myPosition,
                                          selecedSquares: data.selectedSquares
                                      })
                      })
        this.props.toggleTurn(game.turn());
        this.check_game_state(data.sender);
    };

    end_game = (winner) => {
        this.props.toggleDrag(false)
        if (winner === 'w'){
            alert("GAME OVER: White Player Wins")
        }else if(winner === 'b'){
            alert("GAME OVER: Black Player Wins")
        }else {
            alert("Game DRAW")
        }
    }

    check_game_state = (player) => {
        let winner = ""
        let over = ""
        if(game.game_over()){
            over = true
            winner = player
            this.end_game(winner)
        }
        if(game.in_draw()){
            over = true
            winner = "d"
            this.end_game(winner)
        }
        return {
            over: over,
            winner: winner,
        }
    }


    removeHighlightSquare = () => {
        this.setState({selectedSquares: []});
    };

    onDrop = (source, target) => {
        if(game.turn() === this.props.color) {
            this.removeHighlightSquare();
            // see if the move is legal
            var move = game.move({from: source, to: target, promotion: "q"});
            // illegal move
            if (move === null) {
                return;
            }
            // toggle turn
            this.props.toggleTurn(game.turn());

            this.setState({fen: game.fen()});
            let receipent = this.props.color === 'w' ? 'b' : 'w';

            let message = {
                fen: this.state.fen,
                source: source,
                target: target,
                sender: this.props.color,
                recipient: receipent,
                matchId: this.props.matchId,
                game_stats: this.check_game_state(this.props.color)
            }
            socket.emit("message:sendMove", message);
        }
    };

    onMouseOverSquare = square => {
        var moves = game.moves({
                                   square: square,
                                   verbose: true
                               });

    };

    onMouseOutSquare = () => {
        this.removeHighlightSquare();
    };

    render() {
        return this.props.children({
                                       position: this.state.fen,
                                       selectedSquares: this.state.selectedSquares,
                                       onMouseOverSquare: this.onMouseOverSquare,
                                       onMouseOutSquare: this.onMouseOutSquare,
                                       onDrop: this.onDrop
                                   });
    }
}

export default HumanVsHuman;

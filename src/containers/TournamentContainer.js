import React from 'react';
import {Route} from "react-router-dom";
import HeaderTournamentDashboard from "../components/tournamentDashboard/header";
import TournamentInfo from "../components/tournamentDashboard/TournamentInfo/tournamentInfo";
import PairingContainer from "./PairingContainer";
import FianchettoChessboard from "../components/chessboard/chessboard";
import MyMatches from "../components/tournamentDashboard/MyMatches/MyMatches";


class TournamentContainer extends React.Component
{

    componentDidMount(): void {
        this.props.hideUserHeader()
    }
    componentWillUnmount(): void {
        this.props.hideUserHeader()
    }

    render()
    {
        return(

            <div>
                <Route
                    path = "/user/:uId/tournament/:tId/"
                    render = {
                        (props) =>
                            <div>
                                <HeaderTournamentDashboard
                                    userId = {props.match.params.uId}
                                    tournamentId = {props.match.params.tId}/>
                            </div>
                    }
                />
                <Route
                    path = "/user/:uId/tournament/:tId/home"
                    render = {
                        (props) =>
                            <div>
                                <TournamentInfo
                                    userId = {props.match.params.uId}
                                    tournamentId = {props.match.params.tId}/>
                            </div>
                    }
                />
                <Route
                    path = "/user/:uId/tournament/:tId/mymatches"
                    render = {
                        (props) =>
                            <div>
                                <MyMatches
                                    userId = {props.match.params.uId}
                                    tournamentId = {props.match.params.tId}
                                />
                            </div>
                    }
                />
                <Route
                    path = "/user/123/tournament/123/resultentry"
                    render = {
                        () =>
                            <div>
                                <h1>Enter Results</h1>
                            </div>
                    }
                />
                <Route
                    path = "/user/:userid/tournament/:tid/pairings"
                    render = {
                        (props) =>
                            <div>

                                <PairingContainer
                                    userid = {props.match.params.userid}
                                    tid = {props.match.params.tid}
                                />

                            </div>
                    }
                />

                <Route
                    path = "/user/:uId/tournament/:tId/match/:matchId/play"
                    render = {
                        (props) =>
                            <div>
                                <FianchettoChessboard
                                    userId = {props.match.params.uId}
                                    matchId = {props.match.params.matchId}
                                />
                            </div>
                    }
                />

            </div>

        )
    }
}


export default TournamentContainer


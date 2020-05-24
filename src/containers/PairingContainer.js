import React from 'react';
import {Route, Redirect} from "react-router-dom";
import PairingTableView from "../components/tournamentDashboard/PairingTable/pairingTableView";
import PairingHeader from "../components/tournamentDashboard/PairingTable/headerP";

import {connect} from "react-redux";
import {
    createMatchesForRound,
    createRoundService, findAllMatchesForTournamentService, findAllParticipantForTournamentService,
    findAllRoundsForTournamnetService,
    findAllRoundsService,
    updateRoundService
} from "../services/roundService";
import {
    createPairingAction,
    createRoundAction,
    findAllRoundsAction,
    findAllRoundsForTournamnetAction,
    updateRoundAction
} from "../actions/pairingActions";

const stateToPropertyMapper = (state) => {

    return {
        rounds: state.roundReducer.rounds
    }
}


const generateJsonTuple = (tuple) => {

    let val = {
        "home" : {"id" : parseInt(tuple.home)},
        "away" : {"id" : parseInt(tuple.away)}
    }
    return val
}

const generatePairings = (participants ,rounds, roundCount) => {
    const swisspair = require('../swisspairing/swiss')({
        maxPerRound: 1
    });

    const dataMatchups = swisspair.getMatchups(roundCount, participants, rounds);

    const round = []
    for (let i in dataMatchups) {
        let tuple = generateJsonTuple(dataMatchups[i])
        console.log(tuple)
        round.push(tuple)
    }

    return round;
}

const generateRoundName = (roundcount) => {
    const name = "Round " + roundcount;
    return {
        "name" : name
    }

}


const dispatchToPropertyMapper = (dispatch) => {
    return {
        findAllRoundsDispatcher : (tid) => {
            findAllRoundsForTournamnetService(tid)
                .then(rounds =>
                    {
                        dispatch(findAllRoundsAction(rounds))
                    }
                )
        },

        createRoundDispatcher: (tournamentid, roundCount) => {
                findAllMatchesForTournamentService(tournamentid)
                    .then(matches => {
                        findAllParticipantForTournamentService(tournamentid)
                            .then((participants) => {
                                    generatePairings(participants, matches, roundCount)
                                    createRoundService(tournamentid,generateRoundName(roundCount))
                                        .then((round) =>{
                                                dispatch(createRoundAction(round));
                                                createMatchesForRound(round.id, generatePairings(participants, matches, roundCount))
                                                    .then((pairing) =>
                                                        dispatch(createPairingAction(pairing))
                                                    )
                                            }
                                        )

                                }
                            )
                    })
        },

        updateRoundDispatcher: (roundid, round) => {
            updateRoundService(roundid, round)
                .then(status => dispatch(updateRoundAction(roundid, round)))
        },


        findAllRoundsForTournamentDispatcher : (tournamnetid) => {
            findAllRoundsForTournamnetService(tournamnetid)
                .then(rounds =>
                    {
                        dispatch(findAllRoundsForTournamnetAction(rounds))
                    }
                )
        },

    }
}

class PairingContainer extends React.Component
{

    componentDidMount() {
        this.props.findAllRoundsForTournamentDispatcher(this.props.tid);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render()
    {
        if (this.props.userId == -1) {
            return (
                <Redirect to={'/'}/>
            )
        }
        return(
            <div>
                <PairingHeader
                    // rounds = {this.props.rounds}
                    userid = {this.props.userid}
                    tid = {this.props.tid}
                    createRoundDispatcher = {this.props.createRoundDispatcher}
                    findAllRoundsDispatcher = {this.props.findAllRoundsDispatcher}

                />

                <Route
                    exact path = "/user/:userid/tournament/:tid/pairings"
                    render = {
                        () =>
                            <div className="m-4">
                                <div className={"mx-5"}>
                                    <h1>Click on the plus sign above to add rounds.</h1>
                                    <h1>Click on the rounds above to view pairings.</h1>
                                </div>
                            </div>
                    }
                />
                <Route
                    path = "/user/:userid/tournament/:tid/pairings/round/:roundid"
                    render = {
                        (props) =>
                            <div>
                                <PairingTableView
                                    // rounds = {this.props.rounds}
                                    roundid = {props.match.params.roundid}
                                    userid = {this.props.userid}
                                    tid = {this.props.tid}
                                    updateRoundDispatcher = {this.props.updateRoundDispatcher}
                                />
                            </div>
                    }
                />
            </div>

        )
    }
}


// export default PairingContainer

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(PairingContainer)

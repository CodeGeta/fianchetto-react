import React from "react";
import {findTournamentInfo} from "../../../actions/tournamentActions";
import tournamentService from "../../../services/tournamentService"
import {connect} from "react-redux";
import {Redirect} from "react-router";

class TournamentInfo extends React.Component{

    state = {
        image : "https://www.tatasteelchess.com/images/home/wijkaanzeemainevent34.jpg"
    }

    componentDidMount() {
        this.props.findTournamentInfo(this.props.tournamentId)
    }


    render(){
        if (this.props.userId == -1) {
            return (
                <Redirect to={'/'}/>
            )
        }
        return(
            <div className="container p-2">
                <div className="card">
                    <img src={this.state.image} className="card-img-top" alt="..." height="auto"
                         width="50"/>
                    <div className="card-body">

                        <h2 className="card-title"><b><u>{this.props.tournamentInfo.name}</u></b></h2>

                        <p className="card-text">Location: {this.props.tournamentInfo.location}</p>

                        <p className="card-text">Active: &nbsp;
                            {this.props.tournamentInfo.inProgress && "Yes"}
                            {!this.props.tournamentInfo.inProgress && "No"}
                        </p>
                        <p>
                            {
                                this.props.tournamentInfo.startDate &&
                                <span>
                                Started on: {this.props.tournamentInfo.startDate.substring(0,10)}
                                </span>
                            }
                            <br/>
                            {
                                this.props.tournamentInfo.endDate &&
                                <span>
                                Ended on: {this.props.tournamentInfo.endDate.substring(0,10)}
                                </span>
                            }
                            <br/>
                        </p>
                        <p>
                            Prize: {this.props.tournamentInfo.prize}
                        </p>
                        <p>
                            Winner: {this.props.tournamentInfo.winner}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


const stateToPropertyMapper = (state) => {
    return {
        tournamentInfo: state.tournamentReducer.tournamentInfo
    }
};


const dispatchToPropertyMapper = (dispatch) => {
    return {
        findTournamentInfo: (tId) => {
            tournamentService.findTournamentInfo(tId)
                .then(tournamentInfo =>
                          dispatch(findTournamentInfo(tournamentInfo)))

        }
    }
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper) (TournamentInfo)

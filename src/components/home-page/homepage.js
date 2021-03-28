import React from "react";
import {findAllTournaments} from "../../services/tournamentService";
import {Link} from "react-router-dom";
import "./homePage.css";
import "./../login/login.css"

export class HomePageComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tournaments: [],
        }
    }

    componentDidMount() {
        findAllTournaments()
            .then(tournaments => {
                this.setState({tournaments: tournaments})
            })
    }

    render(){
        return(
            <div className={"top-image-2"}>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">

                    <Link className="navbar-brand wbdv-course-title"
                          to={`/`}>
                        Fianchetto
                    </Link>

                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>


                    <div className="collapse navbar-collapse"
                         id="navbarNav">

                        <div className="text-white ml-auto row">
                            <div className={"col-lg"}>
                                <Link to={`/login`} className = "nav-link">
                                    <span className="text-white">Log In</span>
                                </Link>
                            </div>
                            <div className={"col-lg"}>
                                <Link to={`/register`} className = "nav-link">
                                    <span className="text-white">Register</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </nav>

                <div className={'jumbotron'}>
                    <h1 className={'text-center text-top'}
                        style={{fontSize: "48px"}}>
                        FIANCHETTO
                    </h1>
                </div>

                <div className={''}>
                    <h2 className={"text-center"}
                        style={{color: "#5D6D7E"}}>
                        ACTIVE TOURNAMENTS
                    </h2>
                    <div className="border-top my-3"/>

                    <div className={"container col-9"}>
                        <div className={"row"}>
                            {
                                this.state.tournaments.map(
                                    (tournament,index) =>
                                    <div className="col-sm-6 col-md-4 col-lg-4 p-4" >
                                        <div className="card bg-transparent text-white border border-white">
                                            <img className = "card-img-top m2 bg-transparent text-white"
                                                 src="https://media.istockphoto.com/vectors/vector-chess-pieces-team-isolated-on-white-silhouettes-of-chess-vector-id946495138?k=6&m=946495138&s=612x612&w=0&h=QBjPmREFCqfEM0Tw-bizel-liYuk8Umf5eRNbz-bOhg=" className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title text-white">{tournament.name}</h5>
                                                <p className="card-text text-white">{tournament.description}</p>
                                                <Link to={'/login'}>
                                                    <button className={"col btn btn-light"}>
                                                        Participate Now
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <nav className="navbar bottom navbar-light bg-light ">
                        <div className={"col"}/>
                        <div className={"col text-center text-black"}>
                            <Link className="navbar-item " to="/privacy-policy">Privacy Policy</Link>
                        </div>
                        <div className={"col"}/>
                    </nav>

            </div>
            </div>
        )
    }
}

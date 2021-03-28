import React from 'react';
// import { Router } from 'react-router';
// BrowserRouter as Router
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import userReducer from "../../reducers/userReducer"
import tournamentReducer from "../../reducers/tournamentReducer"
import roundReducer from "../../reducers/roundReducer";
import {TournamentCardsComponent} from "./homepage";
import Login from "../login/login";
import Register from "../register/register";
import UserContainer from "../../containers/UserContainer";
import PrivacyPolicy from "../privacy-policy/privacy-policy";

const rootReducer = combineReducers({
    userReducer: userReducer,
    tournamentReducer: tournamentReducer,
    roundReducer : roundReducer
});

const store = createStore(rootReducer);


class OldRouterComponent extends React.Component
{
    render()
    {
        return(
            <div className={"container-fluid m-0 p-0"}>
                <Router history={this.props.history}>
                    <Provider store={store}>

                    <Route
                        exact path = "/"
                        render = {
                            () => <TournamentCardsComponent/>
                        }
                    />

                    <Route
                        exact path = "/login"
                        render = {
                            () =>
                                <Login {...this.props} />
                        }
                    />

                    <Route
                        exact path = "/register"
                        render = {
                            (props) =>
                                <div>
                                    <Register
                                        {...props}/>
                                </div>
                        }
                    />


                    <Route
                        path = "/user/:userid/"
                        render = {
                            (props) =>
                                <div>
                                    <UserContainer
                                        {...props}/>
                                </div>
                        }
                    />
                    <Route
                        path = "/privacy-policy"
                        render = {
                            (props) =>
                                <div>
                                    <PrivacyPolicy
                                        {...props}/>
                                </div>
                        }
                    />

                </Provider>
                </Router>

            </div>
        )

    }
}


export default OldRouterComponent


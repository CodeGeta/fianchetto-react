import React from 'react';
// import { Router } from 'react-router';
// BrowserRouter as Router
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import userReducer from "../reducers/userReducer"
import tournamentReducer from "../reducers/tournamentReducer"
import roundReducer from "../reducers/roundReducer";
import {HomePageComponent} from "../components/home-page/homePage";
import Login from "../components/login/login";
import Register from "../components/register/register";
import UserContainer from "./UserContainer";
import PrivacyPolicy from "../components/privacy-policy/privacy-policy";

const rootReducer = combineReducers({
    userReducer: userReducer,
    tournamentReducer: tournamentReducer,
    roundReducer : roundReducer
});

const store = createStore(rootReducer);


class RoutingContainer extends React.Component
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
                                () =>
                                    <HomePageComponent/>

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


export default RoutingContainer


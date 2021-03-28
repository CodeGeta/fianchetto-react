import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {HomePageComponent} from "../home-page/homepage";
import Login from "../login/login";
import Register from "../register/register";
import UserHome from "../playerDashboard/home";


export default function RoutingComponent()
{

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <HomePageComponent/>
                </Route>
                <Route exact path="/tournaments">
                    <Login/>
                </Route>
                <Route exact path="/users">
                    <UserHome />
                </Route>
                <Route exact path = "/login" >
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>

            </Switch>
        </BrowserRouter>
    )


}





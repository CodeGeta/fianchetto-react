import React, {Component} from 'react';
import "./login.css"
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

class Login extends Component {

    state = {
        newUserEmail: "",
        newUserPassword: ""
    };

    handlEmailChange = e => {
        this.setState({newUserEmail: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({newUserPassword: e.target.value});
    };

    submitLogin = () => {
        const userLogin = {
            email: this.state.newUserEmail,
            password: this.state.newUserPassword
        };

        userService.login(userLogin).then(
            response => {
                if(response.id !== -1){
                    this.props.history.push(`/user/${response.id}/home`);
                } else {
                    MySwal.fire({
                                  icon: 'error',
                                  title: 'Wrong Passwrod',
                                  text: 'Your password and email do not match',
                                  footer: 'Try again or Click on the Sign up link'
                              })
                }

            }
        )

    };

    render() {
        return (


            <div className={"container"}>
                {/*<div className="jumbotron">*/}
                {/*    <h1 className="display-4">Sign In</h1>*/}
                {/*</div>*/}

                <h1 className="display-4 text-center">Sign In</h1>
                <div className="row">
                <div className="col-md-3  p-4"/>
                <div className="col-md-6 border p-4">
                    <form>
                        <div className="form-group">
                            <div className={"row"}>
                                <label htmlFor="username" className="col-form-label">
                                    Username
                                </label>
                            </div>
                            <div className="row">
                                <input className="form-control "
                                       id="username"
                                       placeholder="email"
                                       onChange={this.handlEmailChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className={"row"}>
                                <label htmlFor="password" className="col-form-label">
                                    Password </label>
                            </div>
                            <div className={"row"}>

                                <input type="password"
                                       className="form-control bg-transparent text-white"
                                       id="password"
                                       placeholder="password"
                                       onChange={this.handlePasswordChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className={"row"}>
                                <Link to={"/login"} className ="col-12 p-0 m-0">
                                    <button onClick={this.submitLogin}
                                            className="btn btn-dark btn-block ">
                                        Sign in
                                    </button>
                                </Link>

                                {/*<button className="btn btn-primary btn-block">Sign in</button>*/}
                            </div>
                            <div className="row">
                                <div className="col-6 m-0 p-0">
                                    <a href="#" className="">Forgot Password?</a>
                                </div>
                                <div className="col-6">
                                    <Link to={"/register"}
                                          className="float-right">
                                            Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className = "row">
                            <div className={"col"}/>
                            <div className={"col text-center"}>
                                <Link to={"/privacy-policy"}>
                                    Privacy Policy
                                </Link>
                            </div>
                            <div className={"col"}/>
                        </div>

                    </form>
                    

                </div>
                <div className="col-md-3  p-4"/>
                </div>
            </div>
        )
    }

}

export default Login

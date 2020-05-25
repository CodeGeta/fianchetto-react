import React, {Component} from 'react';
import userService from "../../services/userService";
import "./../login/login.css"
import {Link} from "react-router-dom";


class Register extends Component {

    constructor(props){
        super(props)
    }

    state = {
        newUsername: "",
        newUserPassword: "",
        newUserEmail: "",
    };

    handleUsernameChange = e => {
        this.setState({newUsername: e.target.value});
    };

    handlEmailChange = e => {
        this.setState({newUserEmail: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({newUserPassword: e.target.value});
    };

    submitNewUser = async  (e) => {
        e.preventDefault()
        const userToCreate = {
            name: this.state.newUsername,
            email: this.state.newUserEmail,
            password: this.state.newUserPassword
        };

        const res = await userService.createUser(userToCreate);
        if(res.id>0){
            this.props.history.push({pathname: `/user/${res.id}/home`,})
        }else{
            alert("Invalid Details")
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className={"col display-4 text-center"}>Sign Up</h1>
                </div>
                <div className="row">
                    <div className="col-sm-2"/>
                    <div className="col-sm-8 border p-4">
                        <form>
                            <div className="form-group">
                                <div className={"row"}>
                                    <div className="col">
                                        <label htmlFor="Name"
                                               className="col-form-label">
                                            Name
                                        </label>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col">
                                        <input className="form-control "
                                               id="name"
                                               onChange={this.handleUsernameChange}
                                                placeholder="Name"/>
                                    </div>
                                </div>


                            </div>

                            <div className="form-group">
                                <div className={"row"}>
                                    <div className="col">
                                        <label htmlFor="username"
                                               className="col-form-label">
                                            Email
                                        </label>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col">
                                        <input className="form-control "
                                               id="email"
                                               onChange={this.handlEmailChange}
                                               placeholder="Email"/>
                                    </div>
                                </div>

                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className={"col"}>
                                        <label htmlFor="username"
                                               className="col-form-label">
                                            Confirm Email
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={"col"}>
                                        <input className="form-control"
                                               id="username"
                                               placeholder="Confirm Email"/>
                                    </div>
                                </div>


                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="password"
                                               className="col-form-label ">
                                            Password </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="password"
                                               className="form-control "
                                               id="password"
                                               onChange={this.handlePasswordChange}
                                               placeholder="password"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className={"row"}>
                                    <div className="col">
                                        <button className="btn btn-dark btn-block "
                                                onClick={(e) => this.submitNewUser(e)}>Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className={"row"}>
                                    <div className="col text-center">
                                        <Link to={"/login"}>
                                            <a className="">
                                                Login </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className = "row">
                            <div className={"col text-center"}>
                                <Link to={"/privacy-policy"}>
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }

}

export default Register

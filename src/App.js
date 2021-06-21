import './App.css';
import Register from './Registratie/Register';
import Login from './Login/Login';
import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCSRFToken, loginUser } from "./actions";
import { Provider } from "react-redux";
import { store } from "./store";
import { Switch, ProtectedRoute, Route, BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie"
import VragenlijstVerzenden from "./Vragenlijst/VragenlijstVerzenden";
import Dashboard from "./Dashboard/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import Opgeslagen from './Opgeslagen/Opgeslagen';



class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Provider store={store}>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/Register">
                            <Register />
                        </Route>
                        <Route path="/Login">
                            <Login />
                        </Route>
                        <PrivateRoute authed={this.props.logged_in} path="/dashboard" component={Dashboard} />
                        <PrivateRoute authed={this.props.logged_in} path="/verzenden" component={VragenlijstVerzenden} />
                        <PrivateRoute authed={this.props.logged_in} path="/opgeslagen" component={Opgeslagen} />
                    </Provider>
                </Switch>
            </Router>
        );
    }

    componentDidMount() {
        const csrfURL = "http://localhost:8000/sanctum/csrf-cookie";
        axios.get(csrfURL, {
            withCredentials: true
        }).then(response => {
            let token = Cookies.get('XSRF-TOKEN');
            this.props.getCSRFToken(token);
        })
    }
}

const mapStateToProps = state => {
    return { csrfToken: state.csrfToken, logged_in: state.logged_in };
}

export default connect(
    mapStateToProps,
    { getCSRFToken: getCSRFToken })(App);

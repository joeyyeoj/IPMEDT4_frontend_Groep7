import './App.css';
import  Register from './Registratie/Register';
import Login from './Login/Login';
import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getCSRFToken} from "./actions";
import {Provider} from "react-redux";
import {store} from "./store";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Cookies from "js-cookie"
import VragenlijstVerzenden from "./Vragenlijst/VragenlijstVerzenden";

class App extends React.Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Provider store={store}>
                        <Route path="/Register">
                            <Register />
                        </Route>
                        <Route path="/Login">
                            <Login />
                        </Route>
                        <Route path="/verzenden">
                            <VragenlijstVerzenden />
                        </Route>
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
    return { csrfToken: state.csrfToken };
}

export default connect(
    mapStateToProps,
    {getCSRFToken: getCSRFToken})(App);

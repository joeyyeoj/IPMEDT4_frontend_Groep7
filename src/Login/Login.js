import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import './Login.css'
import {changeUser, getCSRFToken, loginUser} from "../actions";
import { Redirect } from "react-router-dom";


class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            incorrectLogin: false,
            redirectToDashboard: false,
            emailError: {
                valid: false,
                message: "",
                touched: false
            },
            passwordError: {
                valid: false,
                message: "",
                touched: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)



    }

    render(){
        if(this.state.redirectToDashboard){
            return <Redirect to="/dashboard"/>
        }
        return(
            <form className="loginForm" onSubmit={this.onSubmit }>
                <fieldset className="loginForm__fieldset">
                    <label htmlFor="email">Email {!this.state.emailError.valid ? this.state.emailError.message : ''}</label>
                    <input className={!this.state.emailError.valid && this.state.emailError.touched ? 'loginForm__input loginForm__input--incorrect' : 'loginForm__input'} type="text" name="email" onChange={this.handleInputChange}/>
                    <label htmlFor="email">Wachtwoord</label>
                    <input className={!this.state.passwordError.valid && this.state.passwordError.touched ? 'loginForm__input loginForm__input--incorrect' : 'loginForm__input'} type="password" name="password" onChange={this.handleInputChange}/>
                    <p>{ this.state.incorrectLogin ? 'Onjuiste combinatie van email-adres en wachtwoord!' : '' }</p>
                </fieldset>
                <input className="loginForm__submit" type="submit" value="Login"/>
            </form>
        )
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

        this.validateInputs(target)
    }


    onSubmit = event => {
        event.preventDefault();

        this.makeLoginApiCall()

    }

    validateEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    validateInputs(target){
        const name = target.name;
        const value = target.value;

        switch(name){
            case "email":
                if(value && value !== "" && this.validateEmail(value)){
                    this.setState({
                        emailError: {
                            valid: true,
                            touched: true
                        }
                    })
                }
                else{
                    this.setState({
                        emailError: {
                            valid: false,
                            message: "is ongeldig",
                            touched: true
                        }
                    })
                }
            case "password":
                if(value && value !== ""){{
                    this.setState({
                        passwordError: {
                            valid: true,
                            touched: true
                        }
                    })
                }}
                else{
                    this.setState({
                        passwordError: {
                            valid: false,
                            touched: true
                        }
                    })
                }
        }
    }


    makeLoginApiCall(){
        const login_url = "http://127.0.0.1:8000/api/login"
        const userAccount = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(login_url, userAccount, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        }).then(response => {
            this.props.loginUser(true);
            let userCreated = {
                token: response.data.token,
                userData: {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    organisatie: response.data.user.organisatie
                }
            }
            this.setState({
                incorrectLogin: false
            })
            this.props.changeUser(userCreated);
            this.setState({
                redirectToDashboard: true
            })

        }).catch(error => {
            console.log(error);
            this.setState({
                emailError: {
                  valid: false,
                    touched: true
                },
                passwordError: {
                  valid: false,
                    touched: true
                },
                incorrectLogin: true
            })
        })
    }


}


const mapStateToProps = state => {
    return {csrf_token: state.CSRFToken, logged_in: state.logged_in, User: state.user}
}

export default connect(
    mapStateToProps,
    {getCSRFToken: getCSRFToken, changeUser: changeUser, loginUser: loginUser})(Login);

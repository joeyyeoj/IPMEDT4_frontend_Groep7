import React from 'react';
import './Register.css';
import axios from "axios";
import Cookies from "js-cookie";
import {changeUser, getCSRFToken, loginUser} from "../actions";
import {connect} from "react-redux";



class Register extends React.Component{

    constructor(props) {
        super(props);
        this.state =
            {emailIncorrect: false,
            emailEmpty: false,
            nameIncorrect: false,
            passwordIncorrect: false,
            passConIncorrect: false,
            pwDontMatch: false}
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount() {
        console.log(this.state);

    }


    render(){
        return(
            <form className="registerForm" onSubmit={this.onSubmit} id="registerForm" method="POST">
                <fieldset className="registerForm__fieldset">
                    <label className="registerForm__label" htmlFor="name">Naam { this.state.nameIncorrect ? 'mag niet leeg zijn' : '' }</label>
                    <input className={this.state.nameIncorrect ? 'registerForm__input registerForm__input--incorrect' : 'registerForm__input'} type="text" id="name" name="name" onChange={this.handleInputChange}/>
                    <label className="registerForm__label" htmlFor="email">Email { this.state.emailEmpty ? 'mag niet leeg zijn' : '' || this.state.emailIncorrect ? 'is incorrect' : '' }</label>
                    <input className={this.state.emailIncorrect ? 'registerForm__input registerForm__input--incorrect' : 'registerForm__input'} type="text" id="email" name="email" onChange={this.handleInputChange}/>
                    <label className="registerForm__label" htmlFor="organisatie">Organisatie</label>
                    <input className="registerForm__input" type="text" name="organisatie" onChange={this.handleInputChange}/>
                </fieldset>
                <fieldset className="registerForm__fieldset">
                    <label className="registerForm__label" htmlFor="password">Wachtwoord { this.state.passwordIncorrect ? 'mag niet leeg zijn' : '' || this.state.pwDontMatch ? 'niet gelijk met wachtwoord bevestigen' : ''}</label>
                    <input className={this.state.passwordIncorrect ? 'registerForm__input registerForm__input--incorrect' : 'registerForm__input'} type="password" name="password" onChange={this.handleInputChange}/>
                    <label className="registerForm__label" htmlFor="password__confirm">Wachtwoord bevestigen { this.state.passConIncorrect ? 'mag niet leeg zijn' : '' }</label>
                    <input className={this.state.passConIncorrect ? 'registerForm__input registerForm__input--incorrect' : 'registerForm__input'} type="password" id="password_confirm" name="password_confirm" onChange={this.handleInputChange}/>
                </fieldset>
                <fieldset className="registerForm__fieldset">
                    <input type="submit" className="registerForm__submit" value="Registreren"/>
                </fieldset>
            </form>
            )

    }


    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
                [name]: value
            }
        )
    }



    makeApiCall = () => {
        const REGISTER_URL = "http://127.0.0.1:8000/api/users/create"

        const userAccount = {
            name: this.state.name,
            email: this.state.email,
            organisatie: this.state.organisatie,
            password: this.state.password,
            password_confirmation: this.state.password_confirm,
        };


        axios.post(REGISTER_URL, userAccount, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        }).then(response => {
            let userCreated = {
                token: response.data.token,
                userData: {
                    id: 5,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    organisatie: response.data.user.organisatie
                }
            }
            this.props.changeUser(userCreated);
            this.props.loginUser(true);
            console.log(this.props.User);
        }).catch(error=>console.log(error));

    }

    onSubmit = event => {
        event.preventDefault();

        this.setState(
            {emailIncorrect: false,
                    emailEmpty: false,
                    nameIncorrect: false,
                    passwordIncorrect: false,
                    passConIncorrect: false,
                    pwDontMatch: false})
        if(this.validateAllInputs()){
            this.makeApiCall();
        }
    }

    validateEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    validateAllInputs(){
        if(this.state.name == null || this.state.name === ''){
            console.log("Naam veld mag niet leeg zijn!")
            this.setState({nameIncorrect: true})
        }
        if(this.state.email == null || this.state.email === ''){
            console.log("Email veld mag niet leeg zijn!")
            this.setState({emailEmpty: true})
        }
        if(!this.validateEmail(this.state.email)){
            console.log("Dit is geen email-adres")
            this.setState({emailIncorrect: true})
        }
        if(this.state.password == null){
            console.log("Wachtwoord mag niet leeg zijn")
            this.setState({passwordIncorrect: true})
        }
        if(this.state.password_confirm == null){
            console.log("Wachtwoord bevestiging mag niet leeg zijn")
            this.setState({passConIncorrect: true})
        }
        if(this.state.password !== this.state.password_confirm && this.state.password != null && this.state.password_confirm != null){
            console.log("Wachtwoord niet gelijk met bevestiging")
            this.setState({pwDontMatch: true})
        }

        else if(this.state.name != null && this.state.email != null && this.validateEmail(this.state.email) && this.state.password != null && this.state.password_confirm != null && this.state.password === this.state.password_confirm){
            return true;
        }
    }

}


const mapStateToProps = state => {
    return {csrf_token: state.CSRFToken, User: state.User}
}

export default connect(
    mapStateToProps,
    {getCSRFToken: getCSRFToken, changeUser: changeUser, loginUser: loginUser})(Register);

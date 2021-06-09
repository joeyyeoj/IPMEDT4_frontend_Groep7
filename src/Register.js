import React from 'react';
import './Register.css';
import axios from "axios";

class Register extends React.Component{

    constructor(props) {
        super(props);


        this.handleInputChange = this.handleInputChange.bind(this);
    }


    render(){
        return(
            <form className="registerForm" onSubmit={this.onSubmit}>
                <fieldset className="registerForm__fieldset">
                    <label htmlFor="name">Naam</label>
                    <input className="registerForm__input" type="text" id="name" name="name" onChange={this.handleInputChange}/>
                    <label htmlFor="email">Email</label>
                    <input className="registerForm__input" type="text" id="email" name="email" onChange={this.handleInputChange}/>
                    <label htmlFor="organisatie">Organisatie</label>
                    <input className="registerForm__input" type="text" name="organisatie" onChange={this.handleInputChange}/>
                </fieldset>
                <fieldset className="registerForm__fieldset">
                    <label htmlFor="password">Wachtwoord</label>
                    <input className="registerForm__input" type="password" name="password" onChange={this.handleInputChange}/>
                    <label htmlFor="password__confirm">Wachtwoord bevestigen</label>
                    <input className="registerForm__input" type="password" id="password_confirm" name="password_confirm" onChange={this.handleInputChange}/>
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
        const BASE_URL = "http://127.0.0.1:8000/user/create"
        let stringifiedUser = JSON.stringify(this.user);
        axios.post(BASE_URL, stringifiedUser, {
            'Content-Type': 'application/json'
        })
    }

    onSubmit = event => {
        event.preventDefault();
        this.makeApiCall()
    }
}




export default( Register );

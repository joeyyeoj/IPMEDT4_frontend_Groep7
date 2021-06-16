import React from 'react';

import './EmailCard.css';

import SearchBar from './SearchBar.js';

import axios from "axios";

class EmailCard extends React.Component {

    state = { email: "", id: "" };

    componentDidMount() {
        this.getEmails(1);
        
    }

    getEmails(num) {
        let array = [];

        const BASE_URL = "http://localhost:8000/api/mailgroep/"+ num +"/emailadressen/";
        axios.get(BASE_URL).then(res => {
            this.setState({
                name: this.res.name                
            });        
            console.log(res.data.name);
        });  
    }

    onSubmit = (emailInput) => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', emailInput);
        bodyFormData.append('mailgroep-id', 1);
        const BASE_URL = "http://localhost:8000/api/mailgroep/1/";

        axios({
            method: "post",
            url: BASE_URL,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        // kan later weg
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });    
    }

    render() {
        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <SearchBar onSubmit={this.onSubmit} />
                    <p className="email-card__content__text">Voorbeeld@mail.com</p>
                    <p className="email-card__content__text">Voorbeeld@mail.com</p>
                    <p className="email-card__content__text">Voorbeeld@mail.com</p>
                </section>               
            </section>
        );
    }    
}

export default EmailCard;
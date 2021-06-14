import React from 'react';

import './EmailCard.css';

import SearchBar from './SearchBar.js';

import axios from "axios";

class EmailCard extends React.Component {

    state = { name: "" };

    onSubmit = (searchTerm) => {
        const BASE_URL = "http://127.0.0.1:8000/api/mailgroep/1/emailadressen";
        // http://127.0.0.1:8000/api/mailgroep/1/emailadressen

        axios.get(BASE_URL + searchTerm).then(res => {
            this.setState({
                name: res.data.email                
            });
        });     
    }

    render() {
        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <SearchBar onSubmit={this.onSubmit} />
                    <p>{this.state.email}</p>
                </section>               
            </section>
        );
    }    
}

export default EmailCard;
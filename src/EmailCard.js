import React from 'react';
import './EmailCard.css';

import SearchBar from './SearchBar.js';

class EmailCard extends React.Component {
    
// searchbar
// knop voor toevoegen meer emails
// lijst met emails
// mogelijkheid om emails te verwijderen

    render() {
        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <SearchBar />
                </section>               
            </section>
        );
    }    
}

export default EmailCard;
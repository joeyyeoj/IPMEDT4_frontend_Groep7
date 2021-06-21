import React from 'react';

import './EmailCard.css';
import EmailForm from './EmailForm.js';
import FileUploadForm from './FileUploadForm.js';

import axios from "axios";

class EmailCard extends React.Component {

    state = { emails: [], id: "" };
    

    componentDidMount() {
        this.getEmails(1);    
    }

    getEmails(emailgroepId) {
        let emailArray = [];
        const EMAILGROEP_URL = "http://localhost:8000/api/mailgroep/"+ emailgroepId +"/emailadressen/";
        axios.get(EMAILGROEP_URL).then(res => {
            for(let i=0; i<res.data.length; i++) {
                emailArray.push(res.data[i]['email']);
            }         
            this.setState({ emails: emailArray });      
        });  
    }

    renderEmails() {
        return this.state.emails.map(emails => {
            return ( <p key={emails.id} className="email-card__content__emails">{ emails }</p> )
        })
    }

    onSubmit = (emailInput) => {

        const nieuweMail = {
            'email': emailInput,
            'mailgroep-id': 1
        }

        const NIEUWEMAIL_URL = "http://localhost:8000/api/mailgroep/1/emailadressen";
        let posttest = axios.post(NIEUWEMAIL_URL, nieuweMail)
            
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });  
          console.log(posttest);
          console.log(nieuweMail);
    }

    render() {

        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <EmailForm onSubmit={this.onSubmit} />
                    <FileUploadForm />                  
                    { this.renderEmails() }

                </section>               
            </section>
        );
    }    
}

export default EmailCard;
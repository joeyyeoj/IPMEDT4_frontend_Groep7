import React from 'react';

import './EmailCard.css';
import EmailForm from './EmailForm.js';
import FileUploadComponent from './test.js';

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

    // onSubmit = (emailInput) => {
    //     let bodyFormData = new FormData();
    //     bodyFormData.append('email', emailInput);
    //     bodyFormData.append('mailgroep-id', 1);
    //     const NIEUWEMAIL_URL = "http://localhost:8000/api/mailgroep/create";

    //     axios({
    //         method: "post",
    //         url: NIEUWEMAIL_URL,
    //         data: bodyFormData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //     })
    //     // kan later weg
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (response) {
    //         console.log(response);
    //       });    
    // }

    render() {

        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <EmailForm onSubmit={this.onSubmit} />
                    <FileUploadComponent />                  
                    { this.renderEmails() }

                </section>               
            </section>
        );
    }    
}

export default EmailCard;
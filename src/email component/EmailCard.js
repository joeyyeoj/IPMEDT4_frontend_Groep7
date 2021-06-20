import React from 'react';

import './EmailCard.css';
import SearchBar from './SearchBar.js';
import FileUploadComponent from './test.js';

import axios from "axios";

class EmailCard extends React.Component {

    state = { emails: [], id: "" };

    componentDidMount() {
        this.getEmails(1);
        
    }

    getEmails(emailgroepId) {
        let emailArray = [];
        const BASE_URL = "http://localhost:8000/api/mailgroep/"+ emailgroepId +"/emailadressen/";
        axios.get(BASE_URL).then(res => {
            for(let i=0; i<res.data.length; i++) {
                emailArray.push(res.data[i]['email']);
                console.log(res.data[i].email);
            }         
            this.setState({
                email: emailArray 
            });        
            
        });  
    }

    // onSubmit = (emailInput) => {
    //     let bodyFormData = new FormData();
    //     bodyFormData.append('email', emailInput);
    //     bodyFormData.append('mailgroep-id', 1);
    //     const BASE_URL = "http://localhost:8000/api/mailgroep/1/";

    //     axios({
    //         method: "post",
    //         url: BASE_URL,
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
        {console.log(this.state.emails)}

        return (
            <section className="email-card">
                <section className="email-card__content">
                    <h1 className="email-card__content__header">Hey, Gebruiker</h1>
                    <SearchBar onSubmit={this.onSubmit} />
                    <FileUploadComponent />
                    {console.log(this.state.emails)}
                    <ul>
                        { this.state.emails.map((item, id) => <li key={id}>{this.state.email}</li>) }
                    </ul>
                                            
                </section>               
            </section>
        );
    }    
}

export default EmailCard;
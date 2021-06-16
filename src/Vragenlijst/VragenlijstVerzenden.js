import React from "react";
import Select from "react-select";
import axios from "axios";
import {connect} from "react-redux";
import "./VragenlijstVerzenden.css";
import {changeUser, getCSRFToken, loginUser} from "../actions";
import {Redirect} from "react-router-dom";

export class VragenlijstVerzenden extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            vragenlijst: null,
            mailgroep: null,
            mailGroepen: [],
            vragenlijsten: [],
            redirectToLogin: false,
            mailGroupValid: false,
            vragenlijstValid: false
        }
    }

    componentDidMount() {
        if(!this.props.logged_in){
            this.setState({
                redirectToLogin: true
            })
            return
        }

        const BASE_URL = "http://localhost:8000/api"
        axios.get(BASE_URL + "/user/" + this.props.User.userData.id + "/mailgroepen", {
            withCredentials: true,
            headers: {
                'Authorization' : 'Bearer ' + this.props.User.token,
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        }).then(response => {
            const temp_mailgroepen = [];
            response.data.forEach(mailgroep => temp_mailgroepen.push({value: mailgroep.id, label: mailgroep.name}))
            this.setState({
                mailGroepen: temp_mailgroepen
            })
        })

        axios.get(BASE_URL + "/user/" + this.props.User.userData.id + "/vragenlijsten", {
            withCredentials: true,
            headers: {
                'Authorization' : 'Bearer ' + this.props.User.token,
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        }).then(response => {
            const temp_vragenlijsten = [];
            response.data.forEach(vragenlijst => temp_vragenlijsten.push({value: vragenlijst.id, label: vragenlijst.name}))
            this.setState({
                vragenlijsten: temp_vragenlijsten
            })
        })
    }


    render(){
        if(this.state.redirectToLogin){
            return <Redirect to="/login" />
        }
        return(
            <form onSubmit={this.onSubmit} className="sendEmailsForm">
                <fieldset className="sendEmailsForm__fieldset">
                    <label className="sendEmailsForm__label" htmlFor="onderzoek">Selecteer een onderzoek:</label>
                    <Select className="sendEmailsForm__input" name="onderzoek" onChange={this.handleOnderzoekChange} options={this.state.vragenlijsten}></Select>
                </fieldset>
                <fieldset className="sendEmailsForm__fieldset">
                    <label className="sendEmailsForm__label" htmlFor="mailgroep">Versturen naar: </label>
                    <Select className="sendEmailsForm__input" name="mailgroep" onChange={this.handleMailGroupChange} options={this.state.mailGroepen}></Select>
                </fieldset>
                <input className="sendEmailsForm__submit" type="submit" disabled={this.state.mailGroupValid && this.state.vragenlijstValid ? '' : true}/>
            </form>
        )
    }

    handleMailGroupChange = e =>{
        this.setState({
            mailgroep: e.value,
            mailGroupValid: true
        })
    }

    handleOnderzoekChange = e => {
        this.setState({
            vragenlijst: e.value,
            vragenlijstValid: true
        })
    }

    onSubmit = e => {
        e.preventDefault();
        this.makeApiCall()
    }

    makeApiCall = () => {
        const sendEmailUrl = "http://localhost:8000/api/send-email"
        const pakketje = {
            mailgroep: this.state.mailgroep,
            vragenlijst: this.state.vragenlijst,
        }
        axios.post(sendEmailUrl, pakketje, {
            withCredentials: true,
            headers: {
                'Authorization' : 'Bearer ' + this.props.User.token,
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        })
    }

}

const mapStateToProps = state => {
    return {csrf_token: state.CSRFToken, User: state.User, logged_in: state.logged_in}
}

export default connect(
    mapStateToProps,
    {getCSRFToken: getCSRFToken, changeUser: changeUser})(VragenlijstVerzenden);
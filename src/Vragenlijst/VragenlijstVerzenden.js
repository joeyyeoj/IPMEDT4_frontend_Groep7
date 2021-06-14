import React from "react";
import Select from "react-select";
import axios from "axios";
import {connect} from "react-redux";
import {changeUser, getCSRFToken, loginUser} from "../actions";
import {Redirect} from "react-router-dom";

export class VragenlijstVerzenden extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            vragenlijst: null,
            emails: [],
            mailGroepen: [],
            vragenlijsten: [],
            redirectToLogin: false
        }
    }

    componentDidMount() {

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
            <form>
                <fieldset>
                    <Select onChange={this.handleMailGroupChange} options={this.state.mailGroepen}></Select>
                    <p>Dit zijn de emailadressen waar de vragenlijst naar word verzonden:</p>
                    {this.state.emails.map(function(email, i){
                        return <p>{ email }</p>
                    })}
                </fieldset>
                <fieldset>
                    <Select onChange={this.handleOnderzoekChange} options={this.state.vragenlijsten}></Select>
                </fieldset>
                <input type="submit"/>
            </form>
        )
    }

    handleMailGroupChange = e =>{
        let temp_emails = []
        e.value.forEach(email => temp_emails.push(email))
        this.setState({
            emails: temp_emails
        })
        console.log(this.props.CSRFToken);
    }

    handleOnderzoekChange = e => {
        this.setState({
            vragenlijst: e.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

    }

    makeApiCall = () => {
        axios.post()
    }

}

const mapStateToProps = state => {
    return {csrf_token: state.CSRFToken, User: state.User}
}

export default connect(
    mapStateToProps,
    {getCSRFToken: getCSRFToken, changeUser: changeUser})(VragenlijstVerzenden);

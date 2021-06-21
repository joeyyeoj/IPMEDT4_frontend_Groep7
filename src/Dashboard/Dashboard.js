import React from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { getCSRFToken } from "../actions";
import './dashboard.css'
import { Link } from "react-router-dom";
import { Navigatie } from "../Navigatie/Navigatie";


export class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            vragenlijsten: [],
        }
    }

    componentDidMount() {
        const BASE_URL = "http://localhost:8000/api"
        const temp_vragenlijsten = [];

        axios.get(BASE_URL + "/vragenlijsten/" + this.props.User.userData.id + "/responsecount", {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + this.props.User.token,
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            }
        }).then(response => {
            response.data.vragenlijsten.forEach(vragenlijst => temp_vragenlijsten.push({
                id: vragenlijst.id,
                name: vragenlijst.name,
                responses: vragenlijst.responsecount
            }))
            this.setState({
                vragenlijsten: temp_vragenlijsten
            })
        })


    }


    render() {
        return (
            <div className="dashboardholder">
                <main className="dashboard">
                    <h2 className="dashboard__header">Hey, {this.props.User.userData.name}</h2><Link to="/nieuwevragenlijst" className="dashboard__toevoegen">+</Link>
                    <p>Jouw vragenlijsten:</p>
                    <ul className="dashboard__vragenlijsten">
                        {this.state.vragenlijsten.length > 0 ?
                            this.state.vragenlijsten.map((vragenlijst, index) => {
                                return <li key={vragenlijst.id} className="dashboard__vragenlijst">{vragenlijst.name} <span className="dashboard__responsecounter">{vragenlijst.responses} <p>Reacties</p> </span></li>
                            }) : <p className="dashboard__geenlijstenmessage">Je hebt nog geen vragenlijsten</p>
                        }
                    </ul>
                </main>
                <Navigatie overzichtActive={true} toevoegenActive={false} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { csrf_token: state.CSRFToken, User: state.User, logged_in: state.logged_in }
}

export default connect(mapStateToProps)(Dashboard);

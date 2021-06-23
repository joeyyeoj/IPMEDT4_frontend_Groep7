import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCSRFToken } from '../actions';
import '../Dashboard/dashboard.css';
import { Link } from 'react-router-dom';
import { Navigatie } from '../Navigatie/Navigatie';
import { Redirect } from 'react-router-dom';

export class Opgeslagen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vragenlijsten: [],
            redirect: false,
            tempId: null,
            naam: null,
        };
    }

    componentDidMount() {
        const BASE_URL = 'http://localhost:8000/api';
        const temp_vragenlijsten = [];

        axios
            .get(
                BASE_URL +
                '/vragenlijsten/' +
                this.props.User.userData.id +
                '/responsecount',
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Bearer ' + this.props.User.token,
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-XSRF-Token': this.props.csrf_token,
                    },
                }
            )
            .then((response) => {
                response.data.vragenlijsten.forEach((vragenlijst) =>
                    temp_vragenlijsten.push({
                        id: vragenlijst.id,
                        name: vragenlijst.name,
                        responses: vragenlijst.responsecount,
                    })
                );
                this.setState({
                    vragenlijsten: temp_vragenlijsten,
                });
            });
    }

    naamUpdaten(event) {
        this.setState({ naam: event.target.value });
    }

    showInvoer(id) {
        this.setState({ tempId: id });
        document.getElementById('js--opgeslagen__naam').style.display = 'block';
        document.getElementById('js--opgeslagen').style.marginBottom = '2rem';
    }

    hergebruik() {
        const BASE_URL = 'http://localhost:8000/api';
        axios.get(BASE_URL + '/vragenlijst/' + this.state.tempId + '/' + this.state.naam + '/hergebruiken/', {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + this.props.User.token,
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-Token': this.props.csrf_token,
            },
        });
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/verzenden" />;
        }
        return (
            <div className="opgeslagenHolder">
                <main className="opgeslagen" id="js--opgeslagen">
                    <ul className="opgeslagen__vragenlijsten">
                        {this.state.vragenlijsten.length > 0 ? (
                            this.state.vragenlijsten.map((vragenlijst, index) => {
                                return (
                                    <li
                                        key={vragenlijst.id}
                                        className="opgeslagen__vragenlijst"
                                        onClick={this.showInvoer.bind(this, vragenlijst.id)}
                                    >
                                        {vragenlijst.name}{' '}
                                        <span className="opgeslagen__span">
                                            <i class="far fa-copy"></i>{' '}
                                            <p className="opgeslagen__p">Kopieer</p>
                                        </span>
                                    </li>
                                );
                            })
                        ) : (
                            <p className="opgeslagen__geenlijstenmessage">
                                Je hebt nog geen vragenlijsten
                            </p>
                        )}
                    </ul>
                </main>
                <section className="opgeslagen__naam" id="js--opgeslagen__naam">
                    <h1 className="opgeslagen__naam__header">Naam vragenlijst</h1>
                    <input type="text" className="opgeslagen__naam__input" onChange={this.naamUpdaten.bind(this)} />
                    <button className="opgeslagen__naam__button" onClick={this.hergebruik.bind(this)}>Gebruik</button>
                </section>
                <Navigatie
                    overzichtActive={false}
                    toevoegenActive={true}
                    emailsActive={false}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        csrf_token: state.CSRFToken,
        User: state.User,
        logged_in: state.logged_in,
    };
};

export default connect(mapStateToProps)(Opgeslagen);

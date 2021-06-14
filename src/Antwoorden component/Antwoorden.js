import React from 'react';
import axios from 'axios';
import Vraag from './Vraag';
import './Antwoorden.css'

class Antwoorden extends React.Component {

    state = {
        vragen: []
    }

    componentDidMount() {
        this.haalVragenOp(1);
    }

    haalVragenOp(vragenlijstId) {
        let array = [];

        const BASE_URL = 'http://localhost:8000/api/vragenlijst/' + vragenlijstId + '/vragen/';
        axios.get(BASE_URL).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                array.push({ vraag: res.data[i].vraag, id: res.data[i].id, soort: res.data[i].vraagsoort });
            }
            this.setState({ vragen: array });
        });
    }

    render() {
        return (
            <main className="vragen">
                {this.state.vragen.map(function (vraag, id) {
                    return (<Vraag key={id} vraag={vraag.vraag} id={vraag.id} soort={vraag.soort} />)
                })}
            </main>
        );
    }
}

export default Antwoorden;
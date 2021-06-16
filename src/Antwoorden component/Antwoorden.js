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


    printPage() {
        window.print();
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
                <nav className="vragen__navigatie">
                    <ul className="vragen__navigatie__list">
                        <li className="vragen__navigatie__listItem"><i className="fas fa-arrow-left"></i>Terug</li>
                        <li className="vragen__navigatie__listItem" onClick={this.printPage}><i className="fas fa-print"></i>Print</li>
                    </ul>
                </nav>
                <h1 className="vragen__resultaten">Resultaten</h1>
                {this.state.vragen.map(function (vraag, id) {
                    return (<Vraag key={id} vraag={vraag.vraag} id={vraag.id} soort={vraag.soort} />)
                })}
            </main>
        );
    }
}

export default Antwoorden;
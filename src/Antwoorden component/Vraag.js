import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

class Vraag extends React.Component {

    state = {
        openAntwoorden: [],
        labels: [],
        data: [],
    }

    componentDidMount() {
        this.haalAntwoordenOp();
    }

    haalAntwoordenOp() {
        let array = [];
        let arrayLabels = [];
        let arrayData = [];

        const BASE_URL = 'http://localhost:8000/api/vraag/' + this.props.id + '/antwoorden';
        axios.get(BASE_URL).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (this.props.soort === 1) {
                    array.push(res.data[i].antwoord);
                }
                else {
                    let antwoord = res.data[i].antwoord;
                    if (arrayLabels.includes(antwoord)) {
                        let index = arrayLabels.indexOf(antwoord);
                        ++arrayData[index];
                    }
                    else {
                        arrayLabels.push(antwoord);
                        arrayData.push(1);
                    }
                }
            }
            this.setState({ openAntwoorden: array, labels: arrayLabels, data: arrayData });
        });

    }

    render() {
        let antwoorden;

        if (this.props.soort === 1) {
            antwoorden =
                <ul className="vraag__antwoorden">
                    {this.state.openAntwoorden.map(function (antwoord, id) {
                        return <li className="vraag__antwoord" key={id}>{antwoord}</li>
                    })}
                </ul>
        }

        if (this.props.soort === 2) {
            antwoorden =
                <Pie data={{
                    labels: this.state.labels,
                    datasets: [
                        {
                            data: this.state.data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
                }} height={400} width={600} />
        }

        if (this.props.soort === 3) {
            antwoorden =
                <Bar data={{
                    labels: this.state.labels,
                    datasets: [
                        {
                            data: this.state.data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ]
                }} height={400} width={600} />
        }

        return (
            <article className="vraag">
                <h3 className="vraag__header">{this.props.vraag}</h3>
                {antwoorden}
            </article>
        );
    }
}

export default Vraag;

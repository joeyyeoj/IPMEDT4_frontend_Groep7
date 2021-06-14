import React from 'react';
import axios from 'axios';
import { Bar, Pie, Chart } from 'react-chartjs-2';

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

        if (this.props.soort === 3) {
            antwoorden =
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                data: this.state.data,
                                backgroundColor: [
                                    '#ED213A',
                                    '#CCFF00',
                                    '#FE8C00',
                                    '#A8E063',
                                ],
                                borderWidth: 0,
                            }
                        ]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "#fff"
                                }
                            },
                        }
                    }}
                />
        }

        if (this.props.soort === 2) {
            antwoorden =
                <Bar data={{
                    labels: this.state.labels,
                    datasets: [
                        {
                            data: this.state.data,
                            backgroundColor: [
                                '#ED213A',
                                '#F98404',
                                '#FE8C00',
                                '#A8E063',
                            ],
                            borderWidth: 0,
                        }
                    ]
                }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    color: '#fff',
                                },
                            },
                            y:
                            {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: '#fff',
                                },
                            }
                        }
                    }}
                />
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

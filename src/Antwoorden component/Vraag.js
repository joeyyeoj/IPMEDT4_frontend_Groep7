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

    hideItems(id) {
        let vraag_antwoorden = document.getElementById(id).parentElement;
        if (vraag_antwoorden.style.overflow == 'hidden') {
            vraag_antwoorden.style.overflow = 'inherit';
            vraag_antwoorden.style.maxHeight = "fit-content";
        }
        else {
            vraag_antwoorden.style.overflow = 'hidden';
            vraag_antwoorden.style.maxHeight = "38rem";
        }
    }

    render() {
        let extraClass = "vraag";
        let antwoorden;
        let functie;

        if (this.props.soort === 1) {
            functie = () => this.hideItems(this.props.id);
            extraClass = "vraag vraag--open";
            antwoorden =
                <ul id={this.props.id} className="vraag__antwoorden">
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
                                    '#A8E063',
                                    '#F7F48B',
                                    '#9896F1',
                                    '#F98404',
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
                    height={320}
                    width={300}
                />;
            antwoorden = <section className="vraag__canvas">{antwoorden}</section>
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
                                '#9896F1',
                                '#A8E063',
                                '#F7F48B'
                            ],
                            borderWidth: 0,
                            borderRadius: {
                                topRight: 10,
                                topLeft: 10,
                            },
                            borderSkipped: false,
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
                                    borderColor: '#fff',
                                    borderWidth: 10,
                                },
                                ticks: {
                                    color: '#fff',
                                }
                            },
                            y:
                            {
                                grid: {
                                    display: false,
                                    borderColor: '#fff',
                                    borderWidth: 10,
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: '#fff',
                                },
                            },
                        }
                    }}
                    height={320}
                    width={300}
                />;
            antwoorden = <section className="vraag__canvas">{antwoorden}</section>
        }

        return (
            <article className={extraClass} onClick={functie}>
                <h3 className="vraag__header">{this.props.vraag}</h3>
                {antwoorden}
            </article>
        );
    }
}

export default Vraag;

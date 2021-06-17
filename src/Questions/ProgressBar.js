import React from 'react';

const ProgressBar = props => {

    return (
        <section className="progressArea">
            <label className="progressArea__label u-glasMorphism">Vraag {props.currentQuestion + 1} van {props.length}</label>
            <progress className="progressArea__progress" value={props.currentQuestion} max={props.length}></progress>
        </section>
    );
}

export default ProgressBar;
import React from 'react';

const ProgressBar = props => {

    if(props.currentQuestion + 1 > props.length) {
        return (
            <section className="progressArea">
                <label className="progressArea__label u-glasMorphism">Einde</label>
                <progress className="progressArea__progress" value={props.currentQuestion} max={props.length}></progress>
            </section>
        );
    }
    else {
        return (
            <section className="progressArea">
                <label className="progressArea__label u-glasMorphism">Vraag {props.currentQuestion + 1} van {props.length}</label>
                <progress className="progressArea__progress" value={props.currentQuestion} max={props.length}></progress>
            </section>
        );
    }
    
}

export default ProgressBar;
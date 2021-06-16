import React from 'react';

class QuestionOpen extends React.Component {
    // state = {value: 'huts?'};

    constructor(props) {
        super(props);
    }

    onSubmit = (event) => {
        if(this.props.onSubmit) {
            this.props.onSubmit('je moeder');
        }
    };

    render() {
        return (
            <div className="questions__questionMc">
                <button onClick={this.onSubmit.bind(this)} className="questions__mcButton" type="button" value={this.props.options[1]}>{this.props.options[1]}</button>
                <button onClick={this.onSubmit.bind(this)} className="questions__mcButton" type="button" value={this.props.options[2]}>{this.props.options[1]}</button>
                <button onClick={this.onSubmit.bind(this)} className="questions__mcButton" type="button" value={this.props.options[0]}>{this.props.options[1]}</button>
                <button onClick={this.onSubmit.bind(this)} className="questions__mcButton" type="button" value={this.props.options[3]}>{this.props.options[1]}</button>
            </div>
        );
    }
}

export default QuestionOpen;
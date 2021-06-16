import React from 'react';

class QuestionOpen extends React.Component {
    state = {value: '', limit: 250};

    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        this.setState({value: event.target.value}, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    };

    render() {
        return (
            <div className="questions__questionOpen">
                <form>
                    <textarea
                        onChange={this.onChange}
                        className="questions__textArea"
                    />
                    <p className="questions__textArea__label">{this.state.limit - this.state.value.length} tekens over</p>
                </form>
            </div>
        );
    }
}

export default QuestionOpen;
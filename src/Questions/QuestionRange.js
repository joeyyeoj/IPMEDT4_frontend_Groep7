import React from 'react';

class QuestionRange extends React.Component {

    state = { value: 3, valueText: 'Neutraal'}

    onChange(e) {
        const newVal = e.target.value;
        if(newVal == 1) {
            this.setState({ value : newVal, valueText: "Helemaal oneens"});
        }
        else if(newVal == 2) {
            this.setState({ value : newVal, valueText: "Oneens"});
        }
        else if(newVal == 3) {
            this.setState({ value : newVal, valueText: "Neutraal"});
        }
        else if(newVal == 4) {
            this.setState({ value : newVal, valueText: "Eens"});
        }
        else if(newVal == 5) {
            this.setState({ value : newVal, valueText: "Helemaal eens"});
        }
    }

    render() {
        return (
            <div className="questions__questionRange">
                <form className="u-flex-column">
                    <input name="range" 
                           id="range" 
                           className="questions__questionRange__slider u-margin-top-1rem"
                           type="range" 
                           min="1" 
                           max="5" 
                           value={this.state.value} 
                           onChange={this.onChange.bind(this)}>
                    </input>
                    {/* <ul className="questions__questionRange__list">
                        <li className="questions__questionRange__listItem">1</li>
                        <li className="questions__questionRange__listItem">2</li>
                        <li className="questions__questionRange__listItem">3</li>
                        <li className="questions__questionRange__listItem">4</li>
                        <li className="questions__questionRange__listItem">5</li>
                    </ul> */}
                    <label className="u-margin-top-1rem" for="range">{this.state.valueText}</label>
                </form>
            </div>
        );
    }
}

export default QuestionRange;
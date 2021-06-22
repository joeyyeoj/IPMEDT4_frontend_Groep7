import React from 'react';

class QuestionRange extends React.Component {
	state = { value: 3, valueText: 'Neutraal' };

	onChange(e) {
		const newVal = e.target.value;
		if (newVal == 1) {
			this.setState({ value: newVal, valueText: 'Helemaal oneens' }, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.value);
				}
			});
		} else if (newVal == 2) {
			this.setState({ value: newVal, valueText: 'Oneens' }, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.value);
				}
			});
		} else if (newVal == 3) {
			this.setState({ value: newVal, valueText: 'Neutraal' }, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.value);
				}
			});
		} else if (newVal == 4) {
			this.setState({ value: newVal, valueText: 'Eens' }, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.value);
				}
			});
		} else if (newVal == 5) {
			this.setState({ value: newVal, valueText: 'Helemaal eens' }, () => {
				if (this.props.onChange) {
					this.props.onChange(this.state.value);
				}
			});
		}
	}

	render() {
		return (
			<div className="questions__questionRange">
				<form className="u-flex-column">
					<input
						name="range"
						id="range"
						className="questions__questionRange__slider u-margin-top-1rem"
						type="range"
						min="1"
						max="5"
						value={this.props.value}
						onChange={this.onChange.bind(this)}
					></input>
					<label className="u-margin-top-1rem" for="range">
						{this.state.valueText}
					</label>
				</form>
			</div>
		);
	}
}

export default QuestionRange;

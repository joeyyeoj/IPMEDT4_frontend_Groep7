import React from 'react';
import TextArea from './TextArea.js';
import { connect } from 'react-redux';
import { changeAnswer } from './actions';

const QuestionOpen = props => {

    function onChange(event) {
        this.props.changeAnswer(event.target.value);
        console.log(this.props.changedAnswer);
      };

    return (
        <div className="questions__questionOpen">
            <form>
                <TextArea limit={250} value="" onChange={onChange} />
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {changedAnswer: state.changedAnswer};
}

export default connect(
    mapStateToProps,
    {changeAnswer: changeAnswer}
  )(QuestionOpen);
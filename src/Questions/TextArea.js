import React from 'react';
import { connect } from 'react-redux';
import { changeAnswer } from './actions';

const Textarea = ({ rows, cols, value, limit }) => {
  const [content, setContent] = React.useState(value.slice(0, limit));

  const setFormattedContent = React.useCallback(
    text => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );  

  function onChange(event) {
    this.props.changeAnswer(event.target.value);
    console.log(this.props.changedAnswer);
  };

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
        className="questions__textArea"
      />
      <p className="questions__textArea__label">
        {limit - content.length} tekens over
      </p>
    </>
  );
};

const mapStateToProps = state => {
    return {changedAnswer: state.changedAnswer};
}

export default connect(
  mapStateToProps,
  {changeAnswer: changeAnswer}
)(Textarea);
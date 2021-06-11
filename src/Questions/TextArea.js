import React from 'react';

const Textarea = ({ rows, cols, value, limit }) => {
  const [content, setContent] = React.useState(value.slice(0, limit));

  const setFormattedContent = React.useCallback(
    text => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

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

export default Textarea;
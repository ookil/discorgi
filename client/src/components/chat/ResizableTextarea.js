import React, { useState, useContext } from 'react';
import ServerContext from '../../context/serverContext';

const ResizableTextarea = ({ createNewMessage }) => {
  const [state, setState] = useState({
    value: '',
    rows: 1,
    minRows: 1,
    maxRows: 18,
  });

  const { serverId, channelId } = useContext(ServerContext);

  const handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setState({
      ...state,
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  const handleSubmit = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      createNewMessage({
        variables: {
          createMessageData: {
            channelId,
            serverId,
            msg: state.value,
          },
        },
      });
      setState({
        ...state,
        value: '',
        rows: 1,
      });
    }
  };

  return (
    <form onKeyDown={handleSubmit}>
      <textarea
        rows={state.rows}
        value={state.value}
        placeholder='Enter message'
        className='textarea'
        onChange={handleChange}
      />
    </form>
  );
};

export default ResizableTextarea;

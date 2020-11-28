import { useEffect } from 'react';

const MessageTile = ({ message }) => {
  const { username, msg, date } = message;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'skyblue',
          }}
        ></div>
        <div>
          <h4>
            <span>{username}</span>
            <span> {date}</span>
          </h4>
          {msg}
        </div>
      </div>
    </div>
  );
};

export default MessageTile;

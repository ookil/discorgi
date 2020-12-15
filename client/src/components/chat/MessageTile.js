import icon from '../../img/corgi-icon.png';
import { formatRelative, parseISO } from 'date-fns';

const MessageTile = ({ message, sameBox }) => {
  const {
    createdBy: { name, id },
    msg,
    date,
  } = message;

  let content;

  if (sameBox) {
    content = (
      <div style={{ paddingLeft: '45px' }}>
        <p className='msg'>{msg}</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className='separator'></div>
        <div
          style={{ display: 'flex', marginTop: '15px', position: 'relative' }}
        >
          <div
            style={{ position: 'absolute' }}
            aria-label={name}
            className={`user-icon--box ${
              parseInt(id) % 4 === 1
                ? 'bg-yellow'
                : parseInt(id) % 4 === 2
                ? 'bg-red'
                : parseInt(id) % 4 === 3
                ? 'bg-green'
                : 'bg-blue'
            }`}
          >
            <img src={icon} alt='icon' />
          </div>
          <div style={{ paddingLeft: '45px', paddingRight: '10px' }}>
            <h4 style={{ marginTop: '-5px', marginBottom: '5px' }}>
              <span className='username'>{name}</span>
              <span className='timestamp'>
                {formatRelative(parseISO(date), new Date())}
              </span>
            </h4>
            <p className='msg'>{msg}</p>
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default MessageTile;

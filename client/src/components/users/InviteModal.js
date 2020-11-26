import { useContext, useState } from 'react';
import Modal from 'react-modal';
import ServerContext from '../../context/serverContext';
import { OPEN_MODAL, INVITE_TO_SERVER } from '../../const';
import { customStyles } from '../channels/CreateChannelForm';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_SERVER = gql`
  query getServer($serverId: ID!) {
    server(serverId: $serverId) @client {
      name
    }
  }
`;

const InviteModal = () => {
  const { openModal, dispatch, serverName } = useContext(ServerContext);

  const { serverId } = useParams();

  const { data } = useQuery(GET_SERVER, {
    variables: {
      serverId,
    },
  });

  let input;

  const [btnText, setBtnText] = useState('Copy');

  const handleClose = () => {
    dispatch({ type: OPEN_MODAL, payload: null });
  };

  const copyToClipboard = (e) => {
    input.select();
    document.execCommand('copy');
    e.target.focus();
    setBtnText('Copied');
    setTimeout(() => setBtnText('Copy'), 2000);
  };

  return (
    <Modal
      isOpen={openModal === INVITE_TO_SERVER}
      contentLabel='Invite to server'
      style={customStyles}
      onRequestClose={handleClose}
    >
      <div className='delete-server-content'>
        <div style={{ padding: '20px' }}>
          <p className='close-button light' onClick={handleClose}>
            &#10006;
          </p>
          <h3 className='modal-title'>
            Invite friends to{' '}
            <span style={{ color: '#7289da' }}>{data && data.server.name}</span>
          </h3>

          <div style={{ position: 'relative', marginTop: '20px' }}>
            <label htmlFor='serverName'>
              SEND A SERVER INVITE LINK TO A FRIEND
            </label>
            <button
              onClick={copyToClipboard}
              className={`button-copy ${btnText === 'Copied' ? 'copied' : ''}`}
            >
              {btnText}
            </button>
            <input
              className={`input-dark ${btnText === 'Copied' ? 'copied' : ''}`}
              required
              type='text'
              name='serverName'
              value={serverId}
              ref={(node) => (input = node)}
              readOnly
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;

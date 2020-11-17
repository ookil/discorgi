import { useContext, useState } from 'react';
import Modal from 'react-modal';
import ServerContext from '../../context/serverContext';
import { DELETE_SERVER, OPEN_MODAL } from '../../const';
import { useMutation, gql } from '@apollo/client';
import { customStyles } from '../channels/CreateChannelForm';

const DELETE_SERVER_MUTATION = gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId) {
      id
    }
  }
`;

const DeleteServer = () => {
  let nameRef;

  const { openModal, dispatch, serverId, serverName, serverRole } = useContext(
    ServerContext
  );

  const [isAlert, setAlert] = useState(false);

  const handleClose = () => {
    setAlert(false);
    dispatch({ type: OPEN_MODAL, payload: null });
  };

  const [deleteServer] = useMutation(DELETE_SERVER_MUTATION, {
    update(cache, { data: { deleteServer } }) {
      cache.modify({
        id: cache.identify(deleteServer),
        fields: {
          userServers(_, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverName === nameRef.value) {
      deleteServer({
        variables: {
          serverId,
        },
      });
      setAlert(false);
      nameRef.value = '';
      dispatch({ type: OPEN_MODAL, payload: null });
    }
    setAlert(true);
  };

  return (
    <Modal
      isOpen={openModal === DELETE_SERVER}
      contentLabel='Delete server'
      style={customStyles}
    >
      <div className='delete-server-content'>
        <div style={{ padding: '20px' }}>
          <p className='close-button light' onClick={handleClose}>
            &#10006;
          </p>
          <h3 className='modal-title'>
            {serverRole === 'ADMIN' ? 'Delete' : 'Leave'}{' '}
            <span style={{ color: '#7289da' }}>'{serverName}'</span>
          </h3>

          <div style={{ position: 'relative' }}>
            <div className='warning'>
              <p>
                Are you sure you want to{' '}
                {serverRole === 'ADMIN' ? 'delete' : 'leave'}{' '}
                <strong>{serverName}</strong>? This action cannot be undone.
              </p>
            </div>

            <form id='delete-server' onSubmit={handleSubmit}>
              <label htmlFor='serverName'>ENTER SERVER NAME</label>
              <input
                className='input-dark'
                required
                type='text'
                name='serverName'
                ref={(node) => (nameRef = node)}
              />
              {isAlert && (
                <div className='alert'>
                  You didn't enter the server name correctly
                </div>
              )}
            </form>
          </div>
        </div>
        <div className='buttons-wrapper'>
          <button
            className='button-cancel'
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className='button-delete-server' form='delete-server'>
            {serverRole === 'ADMIN' ? 'Delete' : 'Leave'} Server
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteServer;

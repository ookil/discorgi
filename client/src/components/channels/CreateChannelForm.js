import { useContext } from 'react';
import Modal from 'react-modal';
import ServerContext from '../../context/serverContext';
import { CREATE_CHANNEL, OPEN_MODAL } from '../../const';
import { useMutation, gql } from '@apollo/client';

const CREATE_NEW_CHANNEL = gql`
  mutation CreateChannelMutation($createChannelData: CreateChannelInput!) {
    createChannel(data: $createChannelData) {
      id
      name
    }
  }
`;

const CreateChannelForm = () => {
  let channelRef;

  const { openModal, dispatch, serverId } = useContext(ServerContext);

  const [createNewChannel] = useMutation(CREATE_NEW_CHANNEL/* , {
    update(cache, { data: { createChannel } }) {
      const newChannelFromResponse = createChannel;

      const existingChannels = cache.readQuery({
        query: GET_SERVER_CHANNELS,
        variables: {
          serverId,
        },
      });

      cache.writeQuery({
        query: GET_SERVER_CHANNELS,
        variables: {
          serverId,
        },
        data: {
          server: {
            channels: existingChannels.server.channels.concat(
              newChannelFromResponse
            ),
          },
        },
      });
    },
  } */);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewChannel({
      variables: {
        createChannelData: {
          name: channelRef.value,
          serverId,
        },
      },
    });
    channelRef.value = '';
    dispatch({ type: OPEN_MODAL, payload: null });
  };

  return (
    <Modal
      isOpen={openModal === CREATE_CHANNEL}
      contentLabel='Create channel'
      style={customStyles}
    >
      <div className='create-channel-content'>
        <div style={{ padding: '20px' }}>
          <p
            className='close-button light'
            onClick={() => dispatch({ type: OPEN_MODAL, payload: null })}
          >
            &#10006;
          </p>
          <h2 className='modal-title'>Create Text Channel</h2>

          <div style={{ position: 'relative' }}>
            <div className='channel-icon'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className='modifier-box--icon'
              >
                <path
                  fill='white'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'
                ></path>
              </svg>
            </div>
            <form id='create-channel' onSubmit={handleSubmit}>
              <label htmlFor='channelName'>CHANNEL NAME</label>
              <input
                className='input-darak'
                required
                type='text'
                name='channelName'
                ref={(node) => (channelRef = node)}
                placeholder='new-channel'
              />
            </form>
          </div>
        </div>
        <div className='buttons-wrapper'>
          <button
            className='button-cancel'
            onClick={() => dispatch({ type: OPEN_MODAL, payload: null })}
          >
            Cancel
          </button>
          <button className='button-create-channel' form='create-channel'>
            Create Channel{' '}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelForm;

export const customStyles = {
  content: {
    padding: '0px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    backgroundColor: '#36393f',
    boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.85)',
    zIndex: '1',
  },
};

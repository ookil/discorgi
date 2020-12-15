import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import ServerContext from '../../context/serverContext';
import Modal from 'react-modal';
import { DELETE_CHANNEL, OPEN_MODAL } from '../../const';
import { customStyles } from './CreateChannelForm';
import { useParams } from 'react-router-dom';

const DELETE_CHANNEL_MUTATION = gql`
  mutation DeleteChannel($deleteChannelData: DeleteChannelInput!) {
    deleteChannel(data: $deleteChannelData) {
      id
      name
    }
  }
`;

const DeleteChannel = () => {
  const { channelId, openModal, dispatch } = useContext(ServerContext);
  const { serverId } = useParams();

  const handleClose = () => {
    dispatch({ type: OPEN_MODAL, payload: null });
  };

  const [deleteChannel] = useMutation(DELETE_CHANNEL_MUTATION, {
    update(cache, { data: { deleteChannel } }) {
      const channelToDelete = cache.identify(deleteChannel);
      cache.evict({ id: channelToDelete });
      cache.gc();
    },
  });

  const handleMutation = () => {
    deleteChannel({
      variables: {
        deleteChannelData: {
          serverId,
          channelId,
        },
      },
    });
    dispatch({ type: OPEN_MODAL, payload: null });
  };

  return (
    <Modal
      isOpen={openModal === DELETE_CHANNEL}
      contentLabel='Delete Channel'
      style={customStyles}
    >
      <div>
        <div>
          <p className='close-button light' onClick={handleClose}>
            &#10006;
          </p>
          <h3 className='modal-title'>DELETE CHANNEL</h3>
        </div>

        <div>
          <p>
            Are you sure you want to delete <strong>NAME</strong>? This action
            cannot be undone.
          </p>
        </div>
        <div className='buttons-wrapper'>
          <button className='button-cancel' onClick={handleClose}>
            Cancel
          </button>
          <button className='button-delete-server' onClick={handleMutation}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteChannel;

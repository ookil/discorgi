import Modal from 'react-modal';
import './serverModal.css';
import corgiCreate from '../../img/create-server.jpg';

const customStyles = {
  content: {
    padding: '20px',
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(22,20,24,.9)',
  },
};

const ServerModal = ({ modalIsOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel='Add server'
      onRequestClose={handleClose}
    >
      <p className='close-button' onClick={handleClose}>
        &#8569;
      </p>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '.5em' }}>Create a server</h2>
        <p>
          Your server is where you and your friends hang out. Create one and
          start typing.
        </p>
      </div>
      <div className='create-button'>
        <div>
            <img src={corgiCreate} alt='Create Server' />
            <h4>Create My Own</h4>
        </div>
        <p>&#10140;</p>
      </div>
    </Modal>
  );
};

export default ServerModal;

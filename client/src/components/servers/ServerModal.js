import Modal from 'react-modal';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './serverModal.css';
import corgiCreate from '../../img/create-server.jpg';
import { useState } from 'react';
import AddServerForm from './AddServerForm';
import JoinServerForm from './JoinServerForm';

const customStyles = {
  content: {
    padding: '20px',
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
    setState('main');
  };

  const [state, setState] = useState('main');

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel='Add server'
      onRequestClose={handleClose}
    >
      <p className='close-button' onClick={handleClose}>
        &#10006;
      </p>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={state}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames={`${state === 'main' ? 'forward' : 'reverse'}`}
        >
          <>
            {state === 'main' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  scrollbarWidth: 'none',
                }}
              >
                <div className='text-center'>
                  <h2 style={{ marginBottom: '.5em' }}>Create a server</h2>
                  <p>
                    Your server is where you and your friends hang out. Create
                    one and start typing.
                  </p>
                </div>
                <div
                  className='create-button'
                  onClick={() => setState('create')}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={corgiCreate} alt='Create Server' />
                    <h4 style={{ marginLeft: '10px' }}>Create My Own</h4>
                  </div>
                  <p>&#10140;</p>
                </div>
                <h3 className='text-center mt-3'>Have an invite already?</h3>
                <button
                  type='button'
                  className='join-button'
                  onClick={() => setState('join')}
                >
                  Join a server
                </button>
              </div>
            ) : state === 'create' ? (
              <AddServerForm setState={setState} setIsOpen={setIsOpen} />
            ) : (
              <JoinServerForm setState={setState} setIsOpen={setIsOpen} />
            )}
          </>
        </CSSTransition>
      </SwitchTransition>
    </Modal>
  );
};

export default ServerModal;

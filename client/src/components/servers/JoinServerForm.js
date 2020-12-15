import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const JOIN_SERVER = gql`
  mutation Mutation($serverId: ID!) {
    joinServer(serverId: $serverId) {
      id
      channels {
        id
        name
      }
    }
  }
`;

const JoinServerForm = ({ setState, setIsOpen }) => {
  const [input, setInput] = useState('');
  const history = useHistory();

  const [joinServer, { error, loading }] = useMutation(JOIN_SERVER, {
    update(cache, { data: { joinServer } }) {
      const cacheId = cache.identify(joinServer);
      cache.modify({
        fields: {
          userServers(existingServers, { toReference }) {
            return [...existingServers, toReference(cacheId)];
          },
        },
      });
    },
    onCompleted({ joinServer }) {
      history.push(`/channels/${joinServer.id}/${joinServer.channels[0].id}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      joinServer({ variables: { serverId: input } }).then(() => {
        setInput('');
        setState('main');
        setIsOpen(false);
      });
    }
  };

  return (
    <div className='join-server--form'>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '.5em' }}>Join a Server</h2>
        <p>Enter an invite below to join an existing server</p>
      </div>

      <div>
        <form id='join-server' onSubmit={handleSubmit}>
          <label
            htmlFor='invite-link'
            className={error  ? 'error' : ''}
          >
            INVITE LINK
            {error ? (
              <span> - {error.message}</span>
            ) : (
              <span> * </span>
            )}
          </label>
          <br />
          <input
            placeholder='6_bKG_U2efsnkwdJiyPO2'
            type='text'
            name='invite-link'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      <div style={{ display: 'flex' }}>
        <button className='back-button' onClick={() => setState('main')}>
          Back
        </button>
        <button className='submit-button' form='join-server'>
          Join Server
        </button>
      </div>
    </div>
  );
};

export default JoinServerForm;

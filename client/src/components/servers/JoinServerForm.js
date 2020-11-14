import { gql, useMutation } from '@apollo/client';

const JOIN_SERVER = gql`
  mutation Mutation($serverId: ID!) {
    joinServer(serverId: $serverId) {
      id
    }
  }
`;

const JoinServerForm = ({ setState, setIsOpen }) => {
  let input;
  const [joinServer, {error}] = useMutation(
    JOIN_SERVER , {
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
  }
  );

  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault();
    joinServer({ variables: { serverId: input.value } });
    input.value = '';
    setIsOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ textAlign: 'center', marginBottom: '.5em' }}>
        <h2 style={{ marginBottom: '.5em' }}>Join a Server</h2>
        <p>Enter an invite below to join an existing server</p>
      </div>

      <div>
        <form id='join-server' onSubmit={handleSubmit}>
          <label htmlFor='invite-link'>INVITE LINK</label>
          <br />
          <input
            required
            placeholder='6_bKG_U2efsnkwdJiyPO2'
            type='text'
            name='invite-link'
            ref={(node) => {
              input = node;
            }}
          />
        </form>
      </div>
      <div style={{display: 'flex' }}>
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

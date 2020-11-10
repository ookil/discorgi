import { gql, useMutation } from '@apollo/client';

const CREATE_SERVER = gql`
  mutation CreateServer($serverName: String!) {
    createServer(serverName: $serverName) {
      id
    }
  }
`;

const AddServerForm = ({ setState, setIsOpen }) => {
  let input;
  const [createServer] = useMutation(CREATE_SERVER, {
    update(cache, { data: { createServer } }) {
      const cacheId = cache.identify(createServer);
      cache.modify({
        fields: {
          userServers(existingServers, { toReference }) {
            return [...existingServers, toReference(cacheId)];
          },
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createServer({ variables: { serverName: input.value } });
    input.value = '';
    setIsOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '.5em' }}>
        <h2 style={{ marginBottom: '.5em' }}>Customize your server</h2>
        <p>Give your server a personality with a unique name.</p>
      </div>

      <div>
        <form id='create-server' onSubmit={handleSubmit}>
          <label htmlFor='servername'>SERVER NAME</label>
          <br />
          <input
            type='text'
            name='servername'
            ref={(node) => {
              input = node;
            }}
          />
        </form>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button className='back-button'  onClick={() => setState('main')}>Back</button>
        <button className='submit-button' form='create-server'>Create</button>
      </div>
    </div>
  );
};

export default AddServerForm;

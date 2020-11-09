import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import corgi from './img/corgi-1.jpg';

const GET_USER_SERVERS = gql`
  query getUserServers {
    userServers {
      id
      name
    }
  }
`;

const ServerList = () => {
  const [activeId, setActiveId] = useState(null);

  const { loading, error, data } = useQuery(GET_USER_SERVERS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  console.log(data);

  const handleButton = () => {
    setActiveId('button');

    //logic for adding buton
  };

  const content = data.userServers.map(({ id, name }) => (
    <div
      key={id}
      title={name}
      className={`server-list--box ${activeId === id ? 'active' : ''}`}
      onClick={() => setActiveId(id)}
    >
      <img src={corgi} alt={name} />
    </div>
  ));

  return (
    <div className='server-list'>
      {content}
      <button
        id='button'
        className={`server-list--button ${
          activeId === 'button' ? 'active' : ''
        }`}
        onClick={handleButton}
      >
        &#65291;
      </button>
    </div>
  );
};

export default ServerList;

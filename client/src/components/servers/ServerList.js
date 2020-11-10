import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import corgi from '../../img/corgi-1.jpg';
import ServerModal from './ServerModal';

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isHoveredId, setHovered] = useState(null);

  const { loading, error, data } = useQuery(GET_USER_SERVERS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const handleButton = () => {
    setIsOpen(true);
  };

  const content = data.userServers.map(({ id, name }) => (
    <div
      key={id}
      className={`server-list--box ${activeId === id ? 'active' : ''}`}
      onClick={() => setActiveId(id)}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {isHoveredId === id && (
        <div className='modal--server-name'>
          <div className='modal--arrow-left'></div>
          <div className='modal--body'>
            <span>{name}</span>
          </div>
        </div>
      )}
      <img src={corgi} alt={name} />
    </div>
  ));

  return (
    <div className='server-list'>
      {content}
      <button
        className={`server-list--button ${modalIsOpen ? 'active' : ''}`}
        onClick={handleButton}
      >
        &#65291;
      </button>
      <ServerModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ServerList;

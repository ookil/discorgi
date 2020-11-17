import { useQuery, gql } from '@apollo/client';
import { useState, useContext } from 'react';
import ServerModal from './ServerModal';
import ServerContext from '../../context/serverContext';
import { GET_SERVER } from '../../const';

export const GET_USER_SERVERS = gql`
  query getUserServers {
    userServers {
      id
      name
      icon
      role
    }
  }
`;

const ServerList = () => {
  const { serverId, dispatch } = useContext(ServerContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isHoveredId, setHovered] = useState(null);

  const { loading, error, data } = useQuery(GET_USER_SERVERS);

  const handleButton = () => {
    setIsOpen(true);
  };

  let content;

  if (loading) {
    content = <h5>Loading...</h5>;
  } else if (data) {
    content = data.userServers.map(({ id, name, icon, role }) => (
      <div
        key={id}
        className={`server-list--box ${serverId === id ? 'active' : ''}`}
        onClick={() =>
          dispatch({
            type: GET_SERVER,
            payload: { serverId: id, serverName: name, serverRole: role },
          })
        }
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
      >
        {
          <div
            className={`modal--server-name ${
              isHoveredId === id ? 'hovered' : ''
            }  `}
          >
            <div className='modal--arrow-left'></div>
            <div className='modal--body'>
              <span>{name}</span>
            </div>
          </div>
        }
        <img
          src={require('../../img/corgi-server-' + icon + '.jpg').default}
          alt={name}
        />
      </div>
    ));
  } else if (error) {
    <h1>Error: {error.message}</h1>;
  }

  return (
    <div className='server-list'>
      <div className='server-list--wrapper'>
        {content}
        <div
          className={`server-list--button ${modalIsOpen ? 'active' : ''}`}
          onClick={handleButton}
        >
          &#65291;
        </div>
      </div>
      <ServerModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ServerList;

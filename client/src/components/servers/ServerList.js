import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useState, useRef } from 'react';
import ServerModal from './ServerModal';
import { Link, useHistory, useParams } from 'react-router-dom';

export const GET_USER_SERVERS = gql`
  query getUserServers {
    userServers {
      id
      name
      icon
      role
      channels {
        id
        name
      }
    }
  }
`;

const DELETED_SERVER = gql`
  subscription Subscription($serverId: ID!) {
    serverDeleted(serverId: $serverId) {
      id
    }
  }
`;

const ServerList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isHoveredId, setHovered] = useState(null);

  const { serverId } = useParams();

  const { loading, error, data, subscribeToMore } = useQuery(GET_USER_SERVERS);

  const history = useHistory();

  const serverIdRef = useRef(serverId);

  useEffect(() => {
    serverIdRef.current = serverId;
  });

  useEffect(() => {
    subscribeToMore({
      document: DELETED_SERVER,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionResponse = subscriptionData.data.serverDeleted;

        const newServerList = {
          userServers: prev.userServers.filter(
            (server) => server.id !== subscriptionResponse.id
          ),
        };

        if (subscriptionResponse.id === serverIdRef.current) {
          history.push('/channels/welcome/1');
        }

        return newServerList;
      },
    });
  }, [subscribeToMore, serverId, history]);

  const handleButton = () => {
    setIsOpen(true);
  };

  let content;

  if (loading) {
    content = <h5>Loading...</h5>;
  } else if (data) {
    content = data.userServers.map(({ id, name, icon, channels = [] }) => (
      <Link
        key={id}
        to={`/channels/${id}/${channels[0] && channels[0].id}`}
        style={{ textDecoration: 'none' }}
      >
        <div
          className={`server-list--box ${serverId === id ? 'active' : ''}`}
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
      </Link>
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

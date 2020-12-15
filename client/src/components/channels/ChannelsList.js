import { useQuery, gql } from '@apollo/client';
import { createRef, useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import UserBox from '../users/UserBox';

import CreateChannelForm from './CreateChannelForm';
import DeleteServer from '../servers/DeleteServer';
import InviteModal from '../users/InviteModal';
import { useParams, Link, useHistory } from 'react-router-dom';
import ContextMenu from '../contextMenu/ContextMenu';
import DeleteChannel from './DeleteChannel';
import UpdateChannel from './UpdateChannel';

export const GET_SERVER_CHANNELS = gql`
  query getServerChannels($serverId: ID!) {
    server(serverId: $serverId) {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

const CHANNEL_SUBSCRIPTION = gql`
  subscription channelSubscription($serverId: ID!) {
    channelSub(serverId: $serverId) {
      mutation
      data {
        id
        name
      }
    }
  }
`;

const ChannelsList = () => {
  const [isDropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const history = useHistory();

  let channelsRefs = []; //needed an array with all item refs because otherwise only the last item was referenced after mapping

  const { serverId, channelId } = useParams();

  const { subscribeToMore, loading, error, data } = useQuery(
    GET_SERVER_CHANNELS,
    {
      variables: { serverId },
      fetchPolicy: 'network-only',
    }
  );

  const channelsWrapperRef = useRef(null);
  const channelIdRef = useRef(channelId);

  useEffect(() => {
    channelIdRef.current = channelId;
  });

  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: CHANNEL_SUBSCRIPTION,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionResponse = subscriptionData.data.channelSub;

        if (subscriptionResponse.mutation === 'Added') {
          return Object.assign({}, prev, {
            server: {
              channels: [...prev.server.channels, subscriptionResponse.data],
            },
          });
        }

        if (subscriptionResponse.mutation === 'Deleted') {
          const newChannelsList = {
            server: {
              channels: prev.server.channels.filter(
                (channel) => channel.id !== subscriptionResponse.data.id
              ),
            },
          };
          if (subscriptionResponse.data.id === channelIdRef.current) {
            history.push(
              `/channels/${serverId}/${newChannelsList.server.channels[0].id}`
            );
          }
          return newChannelsList;
        }
      },
    });
    return () => unsubscribe();
  }, [serverId, subscribeToMore, history]);

  const handleHideDropdown = (e) => {
    if (e.key === 'Escape') {
      setDropdown(false);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  let content;

  if (loading) {
    content = <div> </div>;
  } else if (data) {
    content = data.server.channels.map(({ id, name }) => {
      const newChannelRef = createRef();
      channelsRefs.push(newChannelRef);
      return (
        <Link
          key={id}
          to={`/channels/${serverId}/${id}`}
          style={{ textDecoration: 'none' }}
        >
          <div
            id={id}
            className={`modifier-box ${channelId === id ? 'active' : ''}`}
            ref={newChannelRef}
          >
            <div className='modifier-box--main'>
              <div>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='modifier-box--icon'
                >
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'
                  ></path>
                </svg>
              </div>

              <p className='name'>{name}</p>
            </div>
          </div>
        </Link>
      );
    });
  } else if (error) {
    content = <div> Error: {error.message}</div>;
  }

  return (
    <div className='channels-list'>
      <div
        ref={dropdownRef}
        className='channels-list--title'
        onClick={() => setDropdown((state) => !state)}
        aria-label={data && data.server.name}
      >
        <h4>{data && data.server.name}</h4>
        <div>
          {isDropdown ? (
            <i className='fas fa-times'></i>
          ) : (
            <i className='fas fa-chevron-down' />
          )}
        </div>

        {isDropdown && <Dropdown />}
      </div>

      <div className='channels-list--wrapper' ref={channelsWrapperRef}>
        {content}
      </div>
      <ContextMenu
        channelsRefs={channelsRefs}
        channelsWrapperRef={channelsWrapperRef}
      />
      {/* <ConTextMenuChannel objectRef={channelsWrapperRef} /> */}

      <UserBox />
      <DeleteChannel />
      <CreateChannelForm />
      <UpdateChannel />
      <DeleteServer />
      <InviteModal />
    </div>
  );
};

export default ChannelsList;

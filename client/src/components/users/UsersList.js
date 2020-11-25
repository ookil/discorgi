import { useQuery, gql } from '@apollo/client';
import { useContext, useEffect } from 'react';
import ServerContext from '../../context/serverContext';
import icon from '../../img/corgi-icon.png';

const GET_SERVER_USERS = gql`
  query getServerUsers($serverId: ID!) {
    server(serverId: $serverId) {
      id
      users {
        id
        name
      }
    }
  }
`;

const USER_SUBSCRIBE = gql`
  subscription userSubscription($serverId: ID!) {
    userSub(serverId: $serverId) {
      mutation
      data {
        id
        name
      }
    }
  }
`;

const UsersList = () => {
  const { serverId } = useContext(ServerContext);

  const { subscribeToMore, loading, error, data } = useQuery(GET_SERVER_USERS, {
    variables: { serverId },
  });

  useEffect(() => {
    subscribeToMore({
      document: USER_SUBSCRIBE,
      variables: { serverId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionResponse = subscriptionData.data.userSub;

        if (subscriptionResponse.mutation === 'Added') {
          return Object.assign({}, prev, {
            server: {
              users: [...prev.server.users, subscriptionResponse.data],
            },
          });
        }

        if (subscriptionResponse.mutation === 'Deleted') {
          return {
            server: {
              users: prev.server.users.filter(
                (user) => user.id !== subscriptionResponse.data.id
              ),
            },
          };
        }
      },
    });
  }, [subscribeToMore, serverId]);

  let content;

  if (loading) {
    content = <div> </div>;
  } else if (data) {
    content = data.server.users.map(({ id, name }) => (
      <div key={id} className='modifier-box'>
        <div className='modifier-box--main'>
          <div
            aria-label={name}
            className={`user-icon--box ${
              parseInt(id) % 4 === 1
                ? 'bg-blue'
                : parseInt(id) % 4 === 2
                ? 'bg-red'
                : parseInt(id) % 4 === 3
                ? 'bg-green'
                : 'bg-yellow'
            }`}
          >
            <img src={icon} alt='icon' />
          </div>

          <div>{name}</div>
        </div>
      </div>
    ));
  } else if (error) {
    content = <div> Error: {error.message}</div>;
  }

  return (
    <div className='users-list'>
      <div className='users-list--wrapper'>{content}</div>
    </div>
  );
};

export default UsersList;

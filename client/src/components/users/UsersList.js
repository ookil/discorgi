import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import icon from '../../img/corgi-icon.png';

const GET_SERVER_USERS = gql`
  query getServerUsers($serverId: ID!) {
    server(serverId: $serverId) {
      id
      adminId
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
  const { serverId } = useParams();

  const { subscribeToMore, loading, error, data } = useQuery(GET_SERVER_USERS, {
    variables: { serverId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    let unsubscribe = subscribeToMore({
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
    return () => unsubscribe();
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
                ? 'bg-yellow'
                : parseInt(id) % 4 === 2
                ? 'bg-red'
                : parseInt(id) % 4 === 3
                ? 'bg-green'
                : 'bg-blue'
            }`}
          >
            <img src={icon} alt='icon' />
          </div>

          <div style={{ width: '100%' }}>
            {name}
            {data.server.adminId === parseInt(id) && (
              <span>
                <i
                  className='fas fa-crown'
                  style={{
                    marginLeft: '6px',
                    color: '#faa61a',
                    fontSize: '12px',
                  }}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    ));
  } else if (error) {
    content = <div> Error: {error.message}</div>;
  }

  return (
    <div className='users-list'>
      <div className='users-list--wrapper'>{content}</div>
      <div className='dev-box'>
        <i className='fas fa-terminal'></i>

        <span style={{ color: 'white' }}>
          Developed by{' '}
          <strong>
            <a target='_blank' href='https://github.com/ookil/discorgi'>
              ookil
            </a>
          </strong>
        </span>
      </div>
    </div>
  );
};

export default UsersList;

import { useQuery, gql } from '@apollo/client';
import { useContext } from 'react';
import ServerContext from '../../context/serverContext';
import icon from '../../img/corgi-icon.png';

const GET_SERVER_USERS = gql`
  query getServerUsers($serverId: ID!) {
    serverUsers(serverId: $serverId) {
      id
      name
    }
  }
`;

const UsersList = () => {
  const { serverId } = useContext(ServerContext);

  const { loading, error, data } = useQuery(GET_SERVER_USERS, {
    variables: { serverId },
  });

  let content;

  if (loading) {
    content = <div> </div>;
  } else if (data) {
    content = data.serverUsers.map(({ id, name }) => (
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

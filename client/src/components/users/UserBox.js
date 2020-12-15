import { useQuery, gql } from '@apollo/client';
import icon from '../../img/corgi-icon.png';
import { memo } from 'react';
import LogoutButton from '../LogoutButton';

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
    }
  }
`;

const UserBox = memo(() => {
  const { loading, data } = useQuery(GET_USER);

  let content;

  if (loading) {
    content = '';
  } else if (data && data.getUser) {
    const { id, name } = data.getUser;
    content = (
      <div className='user-box'>
        <div className='user-box--content'>
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

          <div>{name}
          <span></span>
          </div>
        </div>
        <LogoutButton />
      </div>
    );
  }

  return <div className='user-box'>{content}</div>;
});

export default UserBox;

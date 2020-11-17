import { useQuery, gql } from '@apollo/client';
import icon from '../../img/corgi-icon.png';

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
    }
  }
`;

const UserBox = () => {
  const { loading, __, data } = useQuery(GET_USER);

  let content;

  if (loading) {
    content = '';
  } else if (data && data.getUser) {
    const { id, name } = data.getUser;
    content = (
      <div className='user-box--content'>
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
    );
  }

  return <div className='user-box'>{content}</div>;
};

export default UserBox;

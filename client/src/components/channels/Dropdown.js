import { useContext } from 'react';
import ServerContext from '../../context/serverContext';
import {
  OPEN_MODAL,
  CREATE_CHANNEL,
  DELETE_SERVER,
  INVITE_TO_SERVER,
} from '../../const';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const SERVER_ROLE = gql`
  query serverRole($serverId: ID!) {
    server(serverId: $serverId) @client {
      id
      role
    }
  }
`;

const Dropdown = () => {
  const { serverId } = useParams();

  const { data } = useQuery(SERVER_ROLE, {
    variables: {
      serverId,
    },
  });
  const { dispatch } = useContext(ServerContext);

  return (
    <div className='dropdown-menu--server'>
      <div
        className='dropdown-box invite'
        onClick={() =>
          dispatch({ type: OPEN_MODAL, payload: INVITE_TO_SERVER })
        }
      >
        <p>Invite People</p>
        <i className='fas fa-user-plus' />
      </div>
      {data.server.role === 'ADMIN' && (
        <div
          className='dropdown-box'
          onClick={() =>
            dispatch({ type: OPEN_MODAL, payload: CREATE_CHANNEL })
          }
        >
          <p>Create Channel</p>
          <i className='fas fa-plus-circle' />
        </div>
      )}
      <div className='separator'></div>
      <div
        className='dropdown-box delete'
        onClick={() => dispatch({ type: OPEN_MODAL, payload: DELETE_SERVER })}
      >
        {data.server.role === 'ADMIN' ? (
          <>
            <p>Delete Server</p>
            <i className='far fa-trash-alt' />
          </>
        ) : (
          <>
            <p>Leave Server</p>
            <i className='fas fa-arrow-alt-circle-left' />
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

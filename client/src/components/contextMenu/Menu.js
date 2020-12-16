import { memo, useContext } from 'react';
import ServerContext from '../../context/serverContext';
import {
  OPEN_MODAL,
  CREATE_CHANNEL,
  DELETE_SERVER,
  INVITE_TO_SERVER,
  DELETE_CHANNEL,
  UPDATE_CHANNEL,
} from '../../const';
import { SERVER_NAME_ROLE } from '../channels/Dropdown';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Menu = memo(({ currentItem }) => {
  //memo because there was some old channelId values that would mess things up
  const { dispatch } = useContext(ServerContext);
  const { serverId } = useParams();

  const { data } = useQuery(SERVER_NAME_ROLE, {
    variables: {
      serverId,
    },
  });

  if (data && data.server) {
    return (
      <ul className='menu--list'>
        {data.server.role === 'ADMIN' && currentItem !== 'WRAPPER' && (
          <>
            <li
              className='list-item'
              onClick={() => {
                dispatch({
                  type: UPDATE_CHANNEL,
                  payload: {
                    openModal: UPDATE_CHANNEL,
                    channelId: currentItem,
                  },
                });
              }}
            >
              Edit Channel
            </li>
            <li>
              <div className='separator'></div>
            </li>
          </>
        )}
        <li
          className='list-item invite'
          onClick={() =>
            dispatch({ type: OPEN_MODAL, payload: INVITE_TO_SERVER })
          }
        >
          Invite People
        </li>

        {data.server.role === 'ADMIN' && (
          <li
            className='list-item'
            onClick={() =>
              dispatch({ type: OPEN_MODAL, payload: CREATE_CHANNEL })
            }
          >
            Create Channel
          </li>
        )}
        <li>
          <div className='separator'></div>
        </li>
        {data.server.role === 'ADMIN' ? (
          currentItem !== 'WRAPPER' ? (
            <li
              className='list-item delete'
              onClick={() => {
                dispatch({
                  type: DELETE_CHANNEL,
                  payload: {
                    openModal: DELETE_CHANNEL,
                    channelId: currentItem,
                  },
                });
              }}
            >
              Delete Channel
            </li>
          ) : (
            <li
              className='list-item delete'
              onClick={() => {
                dispatch({
                  type: OPEN_MODAL,
                  payload: DELETE_SERVER,
                });
              }}
            >
              Delete Server
            </li>
          )
        ) : (
          <li
            className='list-item delete'
            onClick={() => {
              dispatch({
                type: OPEN_MODAL,
                payload: DELETE_SERVER,
              });
            }}
          >
            Leave Server
          </li>
        )}
      </ul>
    );
  }
  return null;
});

export default Menu;

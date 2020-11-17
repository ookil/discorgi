import { useContext } from 'react';
import ServerContext from '../../context/serverContext';
import { OPEN_MODAL, CREATE_CHANNEL, DELETE_SERVER } from '../../const';

const Dropdown = () => {
  const { dispatch, serverRole } = useContext(ServerContext);

  return (
    <div className='dropdown-menu--server'>
      <div className='dropdown-box invite'>
        <p>Invite People</p>
        <i className='fas fa-user-plus' />
      </div>
      {serverRole === 'ADMIN' && (
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
        {serverRole === 'ADMIN' ? (
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

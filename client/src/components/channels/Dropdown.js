
const Dropdown = ({ serverRole, setTest }) => {
  return (
    <div className='dropdown-menu--server'>
      <div className='dropdown-box invite' onClick={() => setTest('invite')}>
        <p>Invite People</p>
        <i className='fas fa-user-plus' />
      </div>
      {serverRole === 'ADMIN' && (
        <div className='dropdown-box' onClick={() => setTest('create')}>
          <p>Create Channel</p>
          <i className='fas fa-plus-circle' />
        </div>
      )}
      <div className='separator'></div>
      <div className='dropdown-box delete' onClick={() => setTest('delete')}>
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

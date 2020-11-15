import UsersList from '../users/UsersList';
import './serverContainer.scss';

const MainServerContainer = () => {
  return (
    <div className='main-container'>
      <div className='main-header'>
        <h4>Channel Name</h4>
      </div>

      <div className='container-box'>
        <div className='messages-container'>
          <div /* style={{ paddingTop: '16px' }} */>Jestem messages</div>
        </div>
        <UsersList />
      </div>
    </div>
  );
};

export default MainServerContainer;

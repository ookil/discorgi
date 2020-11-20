import { useContext } from 'react';
import ServerContext from '../../context/serverContext';
import ChannelsList from '../channels/ChannelsList';
import ChatDisplay from '../chat/ChatDisplay';
import MessageForm from '../chat/MessageForm';
import UsersList from '../users/UsersList';

const MainServerContainer = () => {
  const { channelName } = useContext(ServerContext);

  return (
    <>
      <ChannelsList />
      <div className='main-container'>
        <div className='main-header'>
          <h4>{channelName}</h4>
        </div>

        <div className='container-box'>
          <div className='messages-container'>
            <ChatDisplay />
            <MessageForm />
          </div>
          <UsersList />
        </div>
      </div>
    </>
  );
};

export default MainServerContainer;

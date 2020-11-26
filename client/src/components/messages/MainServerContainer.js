import ChannelsList from '../channels/ChannelsList';
import ChatDisplay from '../chat/ChatDisplay';
import MessageForm from '../chat/MessageForm';
import UsersList from '../users/UsersList';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

export const GET_CHANNEL = gql`
  query getChannel($channelId: ID!) {
    channel(channelId: $channelId) @client {
      id
      name
    }
  }
`;

const MainServerContainer = () => {
  const { channelId } = useParams();

  const { data } = useQuery(GET_CHANNEL, {
    variables: {
      channelId,
    },
  });

  return (
    <>
      <ChannelsList />
      <div className='main-container'>
        <div className='main-header'>
          <h4>{data && data.channel.name}</h4>
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

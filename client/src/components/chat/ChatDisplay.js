import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageTile from './MessageTile';

const GET_CHANNEL_MESSAGES = gql`
  query getMessages($channelId: ID!, $after: String) {
    getMessages(channelId: $channelId, after: $after) {
      cursor
      hasMore
      messages {
        id
        username
        msg
        date
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      username
      msg
      date
    }
  }
`;

const ChatDisplay = () => {
  const { channelId } = useParams();

  const { subscribeToMore, data, loading, error, fetchMore } = useQuery(
    GET_CHANNEL_MESSAGES,
    {
      variables: {
        channelId,
      },
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { channelId },
      updateQuery: (prev, { subscribtionData }) => {
        if (!subscribtionData.data) return prev;

        const subscriptionResponse = subscribtionData.data.messageAdded;

        return Object.assign({}, prev, {
          getMessages: {
            messages: [subscriptionResponse, ...prev.getMessages.messages],
          },
        });
      },
    });
  }, [channelId, subscribeToMore]);

  return (
    <div className='chat-display'>
      <div className='chat-display--wrapper'>
        {data &&
          data.getMessages.messages &&
          data.getMessages.messages.map((message) => (
            <MessageTile key={message.id} message={message} />
          ))}
      </div>
    </div>
  );
};

export default ChatDisplay;

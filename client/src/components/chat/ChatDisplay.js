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
        msg
        date
        createdBy {
          id
          name
        }
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      msg
      date
      createdBy {
        id
        name
      }
    }
  }
`;

const ChatDisplay = () => {

  const { channelId } = useParams();

  const { subscribeToMore, data, loading, fetchMore } = useQuery(
    GET_CHANNEL_MESSAGES,
    {
      variables: {
        channelId,
      },

      fetchPolicy: 'network-only',
    }
  );

 
  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
       
        if (!subscriptionData.data) return prev;
        const subscriptionResponse = subscriptionData.data.messageAdded;
        
        const newCache = Object.assign({}, prev, {
          getMessages: {
            messages: [subscriptionResponse, ...prev.getMessages.messages],
          },
        });

        return newCache;
      },
    });
    return () => {
      unsubscribe();
    };
  }, [channelId, subscribeToMore]);

  const handleScroll = ({ currentTarget }) => {
    if (
      data.getMessages.hasMore &&
      currentTarget.clientHeight - currentTarget.scrollTop >=
        currentTarget.scrollHeight
    ) {
      fetchMore({
        variables: {
          channelId,
          after: data.getMessages.cursor,
        },
      });
    }
  };

  return (
    <div className='chat-display'>
      {loading ? null : (
        <div
          className='chat-display--wrapper'
          onScroll={(e) => handleScroll(e)}
        >
          {data &&
            data.getMessages.messages &&
            data.getMessages.messages.map((messageItem, index) => {
              const message = data.getMessages.messages[index];
              const nextMessage = data.getMessages.messages[index + 1];

              if (message.createdBy.name === nextMessage?.createdBy.name) {
                if (
                  Date.parse(message.date) - Date.parse(nextMessage.date) >=
                  300000
                ) {
                  return (
                    <MessageTile
                      key={messageItem.id}
                      message={message}
                      sameBox={false}
                    />
                  );
                }
                return (
                  <MessageTile
                    key={messageItem.id}
                    message={message}
                    sameBox={true}
                  />
                );
              }

              if (message.createdBy.name !== nextMessage?.createdBy.name) {
                return (
                  <MessageTile
                    key={messageItem.id}
                    message={message}
                    sameBox={false}
                  />
                );
              }

              return null
            })}
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;

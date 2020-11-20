import { gql, useMutation } from '@apollo/client';
import React from 'react';
import ResizableTextarea from './ResizableTextarea';

const CREATE_NEW_MESSAGE = gql`
  mutation CreateMessageMutation($createMessageData: CreateMessageInput!) {
    createMessage(data: $createMessageData) {
      id
      username
      msg
    }
  }
`;

const MessageForm = () => {
  const [createNewMessage] = useMutation(CREATE_NEW_MESSAGE);

  return (
    <div className='text-area'>
      <div>
        <ResizableTextarea createNewMessage={createNewMessage} />
      </div>
    </div>
  );
};

export default MessageForm;

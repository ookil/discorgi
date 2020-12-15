import { useReducer } from 'react';
import ServerContext from './serverContext';
import serverReducer from './serverReducer';
import { DEFAULT_SERVER } from '../const';

const ServerState = (props) => {
  const { serverName } = DEFAULT_SERVER;

  const initialState = {
    serverName,
    openModal: null,
    channelId: null,
    /* serverRole: null,
    channelName: null, */
  };

  const [state, dispatch] = useReducer(serverReducer, initialState);

  return (
    <ServerContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </ServerContext.Provider>
  );
};

export default ServerState;

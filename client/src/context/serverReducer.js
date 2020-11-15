import { GET_SERVER } from '../const';

export default (state, action) => {
  switch (action.type) {
    case GET_SERVER:
      return {
        ...state,
        serverId: action.payload.serverId,
        serverName: action.payload.serverName,
      };
    default:
      throw Error(`Unhandled Action: ${action.type}`);
  }
};

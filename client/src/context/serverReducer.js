import { GET_CHANNEL, GET_SERVER, OPEN_MODAL } from '../const';

export default (state, action) => {
  switch (action.type) {
    case GET_SERVER:
      return {
        ...state,
        serverName: action.payload.serverName,
        serverRole: action.payload.serverRole,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case GET_CHANNEL:
      return {
        ...state,
        channelId: action.payload.channelId,
        channelName: action.payload.channelName,
      };
    default:
      throw Error(`Unhandled Action: ${action.type}`);
  }
};

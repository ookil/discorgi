import { GET_SERVER, OPEN_MODAL } from '../const';

export default (state, action) => {
  switch (action.type) {
    case GET_SERVER:
      return {
        ...state,
        serverId: action.payload.serverId,
        serverName: action.payload.serverName,
        serverRole: action.payload.serverRole,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    default:
      throw Error(`Unhandled Action: ${action.type}`);
  }
};

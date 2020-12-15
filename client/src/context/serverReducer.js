import { DELETE_CHANNEL, OPEN_MODAL, UPDATE_CHANNEL } from '../const';

export default (state, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case DELETE_CHANNEL:
      return {
        ...state,
        openModal: action.payload.openModal,
        channelId: action.payload.channelId,
      };
    case UPDATE_CHANNEL:
      return {
        ...state,
        openModal: action.payload.openModal,
        channelId: action.payload.channelId,
      };
    default:
      throw Error(`Unhandled Action: ${action.type}`);
  }
};

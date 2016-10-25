import {
  GET_CAMPAIGN,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
} from '../constants';

export default function campaigns(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN:
      {
        return {
          ...state,
          current: action.payload.campaign,
        };
      }

    case GET_CAMPAIGNS:
      {
        return {
          ...state,
          list: action.payload.campaigns,
        };
      }

    case CREATE_CAMPAIGN:
      {
        state.list.unshift(action.payload.campaign);
        return {
          ...state,
        };
      }
    case UPDATE_CAMPAIGN:
      {
        return {
          ...state,
          current: action.payload.campaign,
        };
      }

    case DELETE_CAMPAIGN:
      {
        return {
          ...state,
          current: null,
        };
      }

    default:
      {
        return state;
      }
  }
}

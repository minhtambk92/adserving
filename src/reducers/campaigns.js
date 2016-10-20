import {
  GET_CAMPAIGN,
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  UPDATE_CAMPAIGN_INCLUDE_PLACEMENT,
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
          latest: action.payload.campaigns,
        };
      }

    case CREATE_CAMPAIGN:
      {
        if (state.latest) {
          state.latest.unshift(action.payload.campaign);
          return {
            ...state,
          };
        } else if (!state.latest) {
          return {
            ...state,
            new: action.payload.campaign,
          };
        }
      }

    case UPDATE_CAMPAIGN:
      {
        return {
          ...state,
          current: action.payload.campaign,
        };
      }

    case UPDATE_CAMPAIGN_INCLUDE_PLACEMENT:
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

import {
  GET_ADVERTISER,
  GET_ADVERTISERS,
  CREATE_ADVERTISER,
  UPDATE_ADVERTISER,
  DELETE_ADVERTISER,
  UPDATE_ADVERTISER_INCLUDE_CAMPAIGN,
} from '../constants';

export default function advertisers(state = {}, action) {
  switch (action.type) {
    case GET_ADVERTISER:
      {
        return {
          ...state,
          current: action.payload.advertiser,
        };
      }

    case GET_ADVERTISERS:
      {
        return {
          ...state,
          latest: action.payload.advertisers,
        };
      }

    case CREATE_ADVERTISER:
      {
        state.latest.unshift(action.payload.advertiser);
        return { ...state };
      }

    case UPDATE_ADVERTISER:
      {
        return {
          ...state,
          editing: action.payload.advertiser,
        };
      }
    case UPDATE_ADVERTISER_INCLUDE_CAMPAIGN:
      {
        return {
          ...state,
          current: action.payload.advertiser,
        };
      }
    case DELETE_ADVERTISER:
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

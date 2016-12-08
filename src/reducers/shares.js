import { combineReducers } from 'redux';
import {
  GET_SHARE_BY_ZONE_ID,
  GET_SHARES,
  CREATE_SHARE,
  UPDATE_SHARE,
  DELETE_SHARE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_SHARE_BY_ZONE_ID: {
      return action.payload.shares;
    }
    case GET_SHARES: {
      return action.payload.shares;
    }
    case CREATE_SHARE: {
      return [
        action.payload.share,
        ...state,
      ];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_SHARE: {
      return action.payload.share;
    }
    case DELETE_SHARE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const shares = combineReducers({
  list,
  editing,
});

export default shares;

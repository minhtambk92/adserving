import { combineReducers } from 'redux';
import {
  GET_SHARE_ZONE,
  GET_SHARE_ZONES,
  CREATE_SHARE_ZONE,
  UPDATE_SHARE_ZONE,
  DELETE_SHARE_ZONE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_SHARE_ZONES: {
      return action.payload.shareZones;
    }
    case CREATE_SHARE_ZONE: {
      return [
        action.payload.shareZone,
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
    case GET_SHARE_ZONE: {
      return action.payload.shareZone;
    }
    case UPDATE_SHARE_ZONE: {
      return action.payload.shareZone;
    }
    case DELETE_SHARE_ZONE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const shareZones = combineReducers({
  list,
  editing,
});

export default shareZones;

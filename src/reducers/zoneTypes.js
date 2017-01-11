import { combineReducers } from 'redux';
import {
  GET_ZONE_TYPES,
  GET_ZONE_TYPE,
  CREATE_ZONE_TYPE,
  UPDATE_ZONE_TYPE,
  DELETE_ZONE_TYPE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ZONE_TYPES: {
      return action.payload.zoneTypes;
    }
    case CREATE_ZONE_TYPE: {
      return [action.payload.zoneType, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_ZONE_TYPE: {
      return action.payload.zoneType;
    }
    case UPDATE_ZONE_TYPE: {
      return action.payload.zoneType;
    }
    case DELETE_ZONE_TYPE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const zoneTypes = combineReducers({
  list,
  editing,
});

export default zoneTypes;

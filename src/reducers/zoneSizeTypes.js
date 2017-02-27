import { combineReducers } from 'redux';
import {
  GET_ZONE_SIZE_TYPES,
  CREATE_ZONE_SIZE_TYPE,
  UPDATE_ZONE_SIZE_TYPE,
  DELETE_ZONE_SIZE_TYPE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ZONE_SIZE_TYPES: {
      return action.payload.zoneSizeTypes;
    }
    case CREATE_ZONE_SIZE_TYPE: {
      return [action.payload.zoneSizeType, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_ZONE_SIZE_TYPE: {
      return action.payload.zoneSizeType;
    }
    case DELETE_ZONE_SIZE_TYPE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const zoneSizeTypes = combineReducers({
  list,
  editing,
});

export default zoneSizeTypes;

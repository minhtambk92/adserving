import { combineReducers } from 'redux';
import {
  CREATE_TRACK,
  UPDATE_TRACK,
  DELETE_TRACK,
} from '../constants';


function list(state = [], action) {
  switch (action.type) {
    case CREATE_TRACK: {
      return [action.payload.track, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_TRACK: {
      return action.payload.track;
    }
    case DELETE_TRACK: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const tracks = combineReducers({
  list,
  editing,
});

export default tracks;

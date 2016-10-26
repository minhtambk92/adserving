import { combineReducers } from 'redux';
import {
  GET_PLACEMENT,
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_PLACEMENTS: {
      return action.payload.placements;
    }
    case CREATE_PLACEMENT: {
      return [
        action.payload.placement,
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
    case GET_PLACEMENT: {
      return action.payload.placement;
    }
    case UPDATE_PLACEMENT: {
      return action.payload.placement;
    }
    case DELETE_PLACEMENT: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const placements = combineReducers({
  list,
  editing,
});
export default placements;

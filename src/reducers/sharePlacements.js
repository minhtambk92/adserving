import { combineReducers } from 'redux';
import {
  GET_SHARE_PLACEMENTS,
  GET_SHARE_PLACEMENT,
  CREATE_SHARE_PLACEMENT,
  UPDATE_SHARE_PLACEMENT,
  DELETE_SHARE_PLACEMENT,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_SHARE_PLACEMENTS: {
      return action.payload.sharePlacements;
    }
    case CREATE_SHARE_PLACEMENT: {
      return [
        action.payload.sharePlacement,
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
    case GET_SHARE_PLACEMENT: {
      return action.payload.sharePlacement;
    }
    case UPDATE_SHARE_PLACEMENT: {
      return action.payload.sharePlacement;
    }
    case DELETE_SHARE_PLACEMENT: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const sharePlacements = combineReducers({
  list,
  editing,
});

export default sharePlacements;

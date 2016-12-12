import { combineReducers } from 'redux';
import {
  REMOVE_SHARE_IN_SHARE_PLACEMENT,
  REMOVE_PLACEMENT,
  CREATE_SHARE_PLACEMENT,
  DELETE_SHARE_PLACEMENT,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
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
    case REMOVE_PLACEMENT: {
      return null;
    }
    case REMOVE_SHARE_IN_SHARE_PLACEMENT: {
      return null;
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

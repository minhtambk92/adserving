import { combineReducers } from 'redux';
import {
  GET_OPTION_CHANNEL_TYPES,
  CREATE_OPTION_CHANNEL_TYPE,
  UPDATE_OPTION_CHANNEL_TYPE,
  DELETE_OPTION_CHANNEL_TYPE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_OPTION_CHANNEL_TYPES: {
      return action.payload.optionChannelTypes;
    }
    case CREATE_OPTION_CHANNEL_TYPE: {
      return [action.payload.optionChannelType, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTION_CHANNEL_TYPE: {
      return action.payload.optionChannelType;
    }
    case DELETE_OPTION_CHANNEL_TYPE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const optionChannelTypes = combineReducers({
  list,
  editing,
});

export default optionChannelTypes;

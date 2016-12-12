import { combineReducers } from 'redux';
import {
  GET_OPTION_CHANNEL_BY_CHANNEL_ID,
  GET_OPTION_CHANNELS,
  CREATE_OPTION_CHANNEL,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_OPTION_CHANNEL_BY_CHANNEL_ID: {
      return action.payload.optionChannels;
    }
    case GET_OPTION_CHANNELS: {
      return action.payload.optionChannels;
    }
    case CREATE_OPTION_CHANNEL: {
      return [action.payload.optionChannel, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTION_CHANNEL: {
      return action.payload.optionChannel;
    }
    case DELETE_OPTION_CHANNEL: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const optionChannels = combineReducers({
  list,
  editing,
});

export default optionChannels;

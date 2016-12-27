import { combineReducers } from 'redux';
import {
  GET_CHANNEL_OPTION_CATEGORIES,
  GET_CHANNEL_OPTION_CATEGORY,
  CREATE_CHANNEL_OPTION_CATEGORY,
  UPDATE_CHANNEL_OPTION_CATEGORY,
  DELETE_CHANNEL_OPTION_CATEGORY,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_CHANNEL_OPTION_CATEGORIES: {
      return action.payload.channelOptionCategories;
    }
    case CREATE_CHANNEL_OPTION_CATEGORY: {
      return [action.payload.channelOptionCategory, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_CHANNEL_OPTION_CATEGORY: {
      return action.payload.channelOptionCategory;
    }
    case UPDATE_CHANNEL_OPTION_CATEGORY: {
      return action.payload.channelOptionCategory;
    }
    case DELETE_CHANNEL_OPTION_CATEGORY: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const channelChannelOptionCategories = combineReducers({
  list,
  editing,
});

export default channelChannelOptionCategories;

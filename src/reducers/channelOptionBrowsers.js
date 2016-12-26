import { combineReducers } from 'redux';
import {
  GET_CHANNEL_OPTION_BROWSERS,
  GET_CHANNEL_OPTION_BROWSER,
  CREATE_CHANNEL_OPTION_BROWSER,
  UPDATE_CHANNEL_OPTION_BROWSER,
  DELETE_CHANNEL_OPTION_BROWSER,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_CHANNEL_OPTION_BROWSERS: {
      return action.payload.channelOptionBrowsers;
    }
    case CREATE_CHANNEL_OPTION_BROWSER: {
      return [action.payload.channelOptionBrowser, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_CHANNEL_OPTION_BROWSER: {
      return action.payload.channelOptionBrowser;
    }
    case UPDATE_CHANNEL_OPTION_BROWSER: {
      return action.payload.channelOptionBrowser;
    }
    case DELETE_CHANNEL_OPTION_BROWSER: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const channelChannelOptionBrowsers = combineReducers({
  list,
  editing,
});

export default channelChannelOptionBrowsers;

import { combineReducers } from 'redux';
import {
  GET_OPTION_CHANNEL_VALUES,
  CREATE_OPTION_CHANNEL_VALUE,
  UPDATE_OPTION_CHANNEL_VALUE,
  DELETE_OPTION_CHANNEL_VALUE,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_OPTION_CHANNEL_VALUES: {
      return action.payload.optionChannelValues;
    }
    case CREATE_OPTION_CHANNEL_VALUE: {
      return [action.payload.optionChannelValue, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case UPDATE_OPTION_CHANNEL_VALUE: {
      return action.payload.optionChannelValue;
    }
    case DELETE_OPTION_CHANNEL_VALUE: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const optionChannelValues = combineReducers({
  list,
  editing,
});

export default optionChannelValues;

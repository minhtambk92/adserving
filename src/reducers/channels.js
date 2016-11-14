import { combineReducers } from 'redux';
import {
  GET_CHANNEL,
  GET_CHANNELS,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  GET_CHANNELS_FILTERS,
  SET_CHANNELS_FILTERS,
} from '../constants';

function filters(state = {}, action) {
  switch (action.type) {
    case GET_CHANNELS_FILTERS: {
      return {
        ...state,
      };
    }
    case SET_CHANNELS_FILTERS: {
      const newState = Object.assign({}, state);
      const criteriaValue = Object.values(action.payload).pop();
      const criteriaKey = Object.keys(action.payload).pop();

      switch (criteriaValue) {
        case 'null': {
          delete newState[criteriaKey];
          return { ...newState };
        }
        case 'true': {
          return {
            ...state,
            ...{ [criteriaKey]: true },
          };
        }
        case 'false': {
          return {
            ...state,
            ...{ [criteriaKey]: false },
          };
        }
        default: {
          return {
            ...state,
            ...action.payload,
          };
        }
      }
    }
    default: {
      return state;
    }
  }
}

function list(state = [], action) {
  switch (action.type) {
    case GET_CHANNELS: {
      return action.payload.channels;
    }
    case CREATE_CHANNEL: {
      return [action.payload.channel, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_CHANNEL: {
      return action.payload.channel;
    }
    case UPDATE_CHANNEL: {
      return action.payload.channel;
    }
    case DELETE_CHANNEL: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const channels = combineReducers({
  filters,
  list,
  editing,
});

export default channels;

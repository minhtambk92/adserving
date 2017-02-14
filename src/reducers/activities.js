import { combineReducers } from 'redux';
import {
  GET_ACTIVITIES,
  GET_ACTIVITY,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_BY_USER_ID,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ACTIVITIES: {
      return action.payload.activities;
    }
    case GET_ACTIVITIES_BY_USER_ID: {
      return action.payload.activities;
    }
    case CREATE_ACTIVITY: {
      return [action.payload.activity, ...state];
    }
    default: {
      return state;
    }
  }
}

function editing(state = {}, action) {
  switch (action.type) {
    case GET_ACTIVITY: {
      return action.payload.activity;
    }
    case UPDATE_ACTIVITY: {
      return action.payload.activity;
    }
    case DELETE_ACTIVITY: {
      return null;
    }
    default: {
      return { ...state };
    }
  }
}

const activities = combineReducers({
  list,
  editing,
});

export default activities;

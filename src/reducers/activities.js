import { combineReducers } from 'redux';
import {
  CREATE_ACTIVITY,
  GET_ACTIVITIES_BY_SUBJECT_ID,
  GET_ACTIVITIES_BY_USER_ID,
} from '../constants';

function list(state = [], action) {
  switch (action.type) {
    case GET_ACTIVITIES_BY_SUBJECT_ID: {
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

const activities = combineReducers({
  list,
});

export default activities;

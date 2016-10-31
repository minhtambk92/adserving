/**
 * Created by Manhhailua on 10/27/16.
 */

import { combineReducers } from 'redux';
import {
  REGISTER_USER,
} from '../constants';

function loggedIn(state = {}, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

function registered(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER: {
      return action.payload.user;
    }
    default: {
      return state;
    }
  }
}

const me = combineReducers({
  loggedIn,
  registered,
});

export default me;

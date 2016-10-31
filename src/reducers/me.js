/**
 * Created by Manhhailua on 10/27/16.
 */

import { combineReducers } from 'redux';
import {
  SIGN_USER_UP,
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
    case SIGN_USER_UP: {
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

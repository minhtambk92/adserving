/**
 * Created by Manhhailua on 10/27/16.
 */

import { combineReducers } from 'redux';
import {
  REGISTER_USER,
} from '../constants';

function loggedIn(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER: {
      return state;
    }
    default: {
      return state;
    }
  }
}

const me = combineReducers({
  loggedIn,
});

export default me;

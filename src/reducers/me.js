/**
 * Created by Manhhailua on 10/27/16.
 */

import { combineReducers } from 'redux';
import {
  SIGN_USER_UP,
} from '../constants';

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
  registered,
});

export default me;

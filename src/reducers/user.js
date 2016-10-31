import Cookies from 'js-cookie';
import {
  LOG_USER_IN,
  LOG_USER_OUT,
} from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOG_USER_IN: {
      return action.payload.user;
    }
    case LOG_USER_OUT: {
      if (Cookies.get('id_token')) Cookies.remove('id_token');

      return action.payload.user;
    }
    default:
      return state;
  }
}

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
      if (document) {
        document.cookie = 'id_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

      return action.payload.user;
    }
    default:
      return state;
  }
}

import {
  LOGIN_USER,
} from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return action.payload.user;
    }
    default:
      return state;
  }
}

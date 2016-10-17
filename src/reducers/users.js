import { combineReducers } from 'redux';
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_FAIL_PASSWORD,
  EMAIL_EXIST,
  EMAIL_NOT_EXIST,
  USER_LOGIN_NOT_EXISTS,
  USER_LOGIN_SUCCESS,
  SUCCESS,
  ERROR,
} from '../constants';

function userRegisterReducers(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      {
        return {
          ...state,
          ...action.payload.user,
          statusRegister: action.payload.statusRegister,
        };
      }
    case USER_REGISTER_ERROR:
      {
        return {
          ...state,
          user: {},
          statusRegister: 'fail',
        };
      }

    default:
      {
        return state;
      }
  }
}

function userLoginReducers(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      {
        return {
          ...state,
          statusLogin: USER_LOGIN_SUCCESS,
          uid: action.payload.id_token,
          isAuthenticated: true,
        };
      }
    case USER_LOGIN_FAIL_PASSWORD:
      {
        return {
          ...state,
          statusLogin: USER_LOGIN_FAIL_PASSWORD,
          uid: null,
          isAuthenticated: false,
        };
      }
    case USER_LOGIN_NOT_EXISTS:
      {
        return {
          ...state,
          statusLogin: USER_LOGIN_NOT_EXISTS,
          uid: null,
          isAuthenticated: false,
        };
      }
    default:
      {
        return state;
      }
  }
}

function userFindById(state = {}, action) {
  switch (action.type) {
    case SUCCESS:
      {
        return {
          user: action.payload.userInfo,
        };
      }
    case ERROR:
      {
        return {
          user: null,
        };
      }
    default:
      {
        return state;
      }
  }
}

function checkEmail(state = {}, action) {
  switch (action.type) {
    case EMAIL_EXIST:
      {
        return {
          emailExist: action.payload.emailExist,
        };
      }
    case EMAIL_NOT_EXIST:
      {
        return {
          emailExist: action.payload.emailExist,
        };
      }
    default:
      {
        return state;
      }
  }
}

const users = combineReducers({
  userRegisterReducers,
  userLoginReducers,
  userFindById,
  checkEmail,
})

export default users;

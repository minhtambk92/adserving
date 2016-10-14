/* eslint-disable import/prefer-default-export */

import {
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS,
  SUCCESS,
  ERROR,
  EMAIL_NOT_EXIST,
  EMAIL_EXIST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_NOT_EXISTS,
  USER_LOGIN_FAIL_PASSWORD,
} from '../constants';

/*
 REGISTER USER
 */
const queryRegisterUser = `mutation ($user: UserInputTypeWithoutId!) {userRegister(user: $user) { id email username password}}`;

export function submitRegisterUser({ email, username, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(queryRegisterUser, {
        user: {
          email,
          username,
          password,
        }
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: {
          user: data.userRegister,
          statusRegister: 'success',
        },
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_ERROR,
        payload: {
          user: {},
          error,
        },
      });
      return false;
    }
    return true;
  };
}

/*
 LOGIN USER
 */
const queryLoginUser = `mutation ($email:String!) {findByEmail(email:$email){id username email password}}`;
function parseJSON(response) {
  return response.json();
}
export function submitLoginUser({ email, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryLoginUser, { email: email });
    if (data.findByEmail) {
      if (data.findByEmail.password === password) {
        return fetch('http://rsk.quynd.com/auth/getToken', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: data.findByEmail }),
        }).then(parseJSON).then(response => {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
              user: data.findByEmail,
              statusLogin: USER_LOGIN_SUCCESS,
              id_token: response.token,
            },
          });
          // // // remember token for every new request
          // if (process.env.BROWSER) {
          //   const maxAge = 3650 * 24 * 3600; // 10 years in seconds
          //   document.cookie = `id_token=${response.token};path=/;max-age=${maxAge}`;
          // };
        });
      } else if (data.findByEmail.password !== password) {
        dispatch({
          type: USER_LOGIN_FAIL_PASSWORD,
          payload: {
            statusLogin: USER_LOGIN_FAIL_PASSWORD,
          },
        });
      }
    } else {
      dispatch({
        type: USER_LOGIN_NOT_EXISTS,
        payload: {
          statusLogin: USER_LOGIN_NOT_EXISTS,
        },
      });
    }
    return true;
  };
}

/*
 FIND BY ID
 */
const useFindById = `mutation ($id:String!) {findById(id:$id){id username email password}}`;
export function findById({ id }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(useFindById, { id: id });
    if (data.findById) {
      dispatch({
        type: SUCCESS,
        payload: {
          userInfo: data.findById,
        },
      });
    } else {
      dispatch({
        type: ERROR,
        payload: {
          userInfo: null,
        },
      });
    }
    return true;
  };
}

/*
 CHECK EMAIL EXIST
 */
const checkEmail = `mutation ($email:String!) {findByEmail(email:$email){id username email password}}`;
export function checkEmailExist({ email }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(checkEmail, { email: email });
    if (data.findByEmail) {
      dispatch({
        type: EMAIL_EXIST,
        payload: {
          emailExist: true,
        },
      });
    } else {
      dispatch({
        type: EMAIL_NOT_EXIST,
        payload: {
          emailExist: false,
        },
      });
    }
    return true;
  };
}

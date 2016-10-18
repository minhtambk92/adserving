/* eslint-disable import/prefer-default-export */

import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
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
const queryRegisterUser = `
mutation ($user: UserInputTypeWithoutId!) {userRegister(user: $user) { id email username password}
}`;

export function submitRegisterUser({ email, username, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(queryRegisterUser, {
        user: {
          email,
          username,
          password,
        },
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
const queryLoginUser = `
mutation ($email:String!) {findByEmail(email:$email){id username email password}
}`;
function parseJSON(response) {
  return response.json();
}
export function submitLoginUser({ email, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryLoginUser, { email });
    if (data.findByEmail) {
      if (data.findByEmail.password === password) {
        return fetch('http://rsk.quynd.com/auth/getToken', {
          method: 'post',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
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
const useFindById = `
mutation ($id:String!) {findById(id:$id){id username email password}
}`;
export function findById({ id }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(useFindById, { id });
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
const checkEmail = `
mutation ($email:String!) {findByEmail(email:$email){id username email password}
}`;
export function checkEmailExist({ email }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(checkEmail, { email });
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

export function getUser(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        users(where: {id: "${id}"}, limit: 1) {
          id
          email
          emailConfirmed
          status
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_USER,
      payload: {
        user: data.users.shift(),
      },
    });
  };
}

export function getUsers() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        users {
          id
          email
          emailConfirmed
          status
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_USERS,
      payload: {
        users: data.users,
      },
    });
  };
}

export function createUser({ email, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputWithoutId!) {
        createdUser(user: $user) {
          id
          email
          emailConfirmed
          status
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, { user: { email, password } });

    dispatch({
      type: CREATE_USER,
      payload: {
        user: data.createdUser,
      },
    });
  };
}

export function updateUser({ id, email, password, emailConfirmed, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInput!) {
        updatedUser(user: $user) {
          id
          email
          emailConfirmed
          status
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        id,
        email,
        password,
        emailConfirmed,
        status,
      },
    });

    dispatch({
      type: UPDATE_USER,
      payload: {
        user: data.updatedUser,
      },
    });
  };
}

export function deleteUser(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedUser(id: "${id}") {
          id
          email
          emailConfirmed
          status
          description
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_USER,
      payload: {
        user: data.deletedUser,
      },
    });
  };
}

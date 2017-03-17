/* eslint-disable import/prefer-default-export */

import fetch from '../../core/fetch';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_FILTERS,
  SET_USERS_FILTERS,
  SIGN_USER_UP,
  LOG_USER_IN,
  LOG_USER_OUT,
  UPDATE_PROFILE,
  GET_USER_PROFILE,
} from '../../constants';

import queryGetUser from './getUser.graphql';
import queryGetUserProfile from './getUserProfile.graphql';
import queryGetUsers from './getUsers.graphql';
import mutationCreatedUser from './createdUser.graphql';
import mutationRegisterUser from './registerUser.graphql';
import mutationUpdatedProfile from './updatedProfile.graphql';
import mutationUpdatedUser from './updatedUser.graphql';
import mutationDeletedUser from './deletedUser.graphql';

export function getUsersFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_USERS_FILTERS,
      payload: {},
    });
  };
}

export function setUsersFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_USERS_FILTERS,
      payload: filter,
    });
  };
}

export function getUser(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryGetUser,
      variables: { id },
    });

    dispatch({
      type: GET_USER,
      payload: {
        user: data.users[0],
      },
    });
  };
}

export function getUserProfile(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryGetUserProfile,
      variables: { id },
    });

    dispatch({
      type: GET_USER_PROFILE,
      payload: {
        user: data.users[0],
      },
    });
  };
}

export function getUsers(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().users.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await client.query({
      query: queryGetUsers,
      variables: variables.where,
    });

    dispatch({
      type: GET_USERS,
      payload: {
        users: data.users,
      },
    });
  };
}

export function createUser({
  email,
  profile,
  roles,
  password,
  emailConfirmed,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationCreatedUser,
      variables: {
        user: {
          email,
          profile,
          roles,
          password,
          emailConfirmed,
          status,
        },
      },
    });

    dispatch({
      type: CREATE_USER,
      payload: {
        user: data.createdUser,
      },
    });
  };
}

export function updateUser({
  id,
  email,
  profile,
  roles,
  password,
  emailConfirmed,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedUser,
      variables: {
        user: {
          id,
          email,
          profile,
          roles,
          password,
          emailConfirmed,
          status,
        },
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

export function updateProfile({
  id,
  profile,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedProfile,
      variables: {
        user: {
          id,
          profile,
        },
      },
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        user: data.updatedUser,
      },
    });
  };
}

export function deleteUser(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationDeletedUser,
      variables: { id },
    });

    dispatch({
      type: DELETE_USER,
      payload: {
        user: data.deletedUser,
      },
    });
  };
}

export function registerUser({
  email,
  password,
  fullName,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationRegisterUser,
      variables: {
        user: {
          email,
          roles: ['user'],
          password,
          emailConfirmed: 'true',
          status: 'active',
          profile: {
            displayName: fullName,
          },
        },
      },
    });

    dispatch({
      type: SIGN_USER_UP,
      payload: {
        user: data.createdUser,
      },
    });
  };
}

export function logUserIn({
  email,
  password,
  rememberMe,
}) {
  return async (dispatch) => {
    const res = await fetch('/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
      credentials: 'include',
    });

    const { data } = await res.json();

    dispatch({
      type: LOG_USER_IN,
      payload: {
        user: data.loggedInUser,
      },
    });
  };
}

export function logUserOut() {
  return async (dispatch) => {
    await fetch('/logout', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    dispatch({
      type: LOG_USER_OUT,
      payload: {
        user: null,
      },
    });
  };
}

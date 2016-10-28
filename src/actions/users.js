/* eslint-disable import/prefer-default-export */

import fetch from '../core/fetch';
import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_FILTERS,
  SET_USERS_FILTERS,
  REGISTER_USER,
  LOGIN_USER,
} from '../constants';

export function getUsersFilters() {
  return async(dispatch) => {
    dispatch({
      type: GET_USERS_FILTERS,
      payload: {},
    });
  };
}

export function setUsersFilters(filter) {
  return async(dispatch) => {
    dispatch({
      type: SET_USERS_FILTERS,
      payload: filter,
    });
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
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
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

export function getUsers(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        users(where: $where, order: $order, limit: $limit) {
          id
          email
          emailConfirmed
          status
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().zones.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_USERS,
      payload: {
        users: data.users,
      },
    });
  };
}

export function createUser({ email, roleIds, password, emailConfirmed, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputTypeWithoutId!) {
        createdUser(user: $user) {
          id
          email
          emailConfirmed
          status
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        email,
        roleIds,
        password,
        emailConfirmed: emailConfirmed === 'true',
        status,
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

export function updateUser({ id, email, roleIds, password, emailConfirmed, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputType!) {
        updatedUser(user: $user) {
          id
          email
          emailConfirmed
          status
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        id,
        email,
        roleIds,
        password,
        emailConfirmed: emailConfirmed === 'true',
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
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
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

export function registerUser({ email, password }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputTypeWithoutId!) {
        createdUser(user: $user) {
          id
          email
          emailConfirmed
          status
          roles {
            id
            uniqueName
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        email,
        roleIds: ['9e31f4e4-f562-4244-b769-c5c4b34e263d'],
        password,
        emailConfirmed: 'true',
        status: 'active',
      },
    });

    dispatch({
      type: REGISTER_USER,
      payload: {
        user: data.createdUser,
      },
    });
  };
}

export function loginUser({ email, password, rememberMe }) {
  return async(dispatch) => {
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
    });

    const { data } = await res.json();

    dispatch({
      type: LOGIN_USER,
      payload: {
        user: data.loggedInUser,
      },
    });
  };
}

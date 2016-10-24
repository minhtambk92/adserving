/* eslint-disable import/prefer-default-export */

import {
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_FILTERS,
  SET_USERS_FILTERS,
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

export function createUser({ email, password, emailConfirmed, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputTypeWithoutId!) {
        createdUser(user: $user) {
          id
          email
          emailConfirmed
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        email,
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

export function updateUser({ id, email, password, emailConfirmed, status }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($user: UserInputType!) {
        updatedUser(user: $user) {
          id
          email
          emailConfirmed
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      user: {
        id,
        email,
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

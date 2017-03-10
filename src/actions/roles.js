/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_ROLE,
  GET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ROLES_FILTERS,
  SET_ROLES_FILTERS,
} from '../constants';

export function getRolesFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_ROLES_FILTERS,
      payload: {},
    });
  };
}

export function setRolesFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_ROLES_FILTERS,
      payload: filter,
    });
  };
}

export function getRole(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        roles(where: {id: "${id}"}, limit: 1) {
          id
          uniqueName
          name
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ROLE,
      payload: {
        role: data.roles[0],
      },
    });
  };
}

export function getRoles(args = {
  where: {},
  limit: 0,
  order: '',
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        roles {
          id
          uniqueName
          name
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const { filters } = await getState().roles;

    if (
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = { ...filters };
    }

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_ROLES,
      payload: {
        roles: data.roles,
      },
    });
  };
}

export function createRole({ uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($role: RoleInputTypeWithoutId!) {
        createdRole(role: $role) {
          id
          uniqueName
          name
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, { role: { uniqueName, name } });

    dispatch({
      type: CREATE_ROLE,
      payload: {
        role: data.createdRole,
      },
    });
  };
}

export function updateRole({ id, uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($role: RoleInputType!) {
        updatedRole(role: $role) {
          id
          uniqueName
          name
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, { role: { id, uniqueName, name } });

    dispatch({
      type: UPDATE_ROLE,
      payload: {
        role: data.updatedRole,
      },
    });
  };
}

export function deleteRole(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedRole(id: "${id}") {
          id
          uniqueName
          name
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ROLE,
      payload: {
        role: data.deletedRole,
      },
    });
  };
}

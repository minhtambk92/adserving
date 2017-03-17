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
} from '../../constants';

import queryGetRole from './getRole.graphql';
import queryGetRoles from './getRoles.graphql';
import mutationCreatedRole from './createdRole.graphql';
import mutationUpdatedRole from './updatedRole.graphql';
import mutationDeletedRole from './deletedRole.graphql';

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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryGetRole,
      variables: { id },
    });

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
}) {
  return async (dispatch, getState, { client }) => {
    const variables = Object.assign({}, args);
    const { filters } = await getState().roles;

    if (
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = { ...filters };
    }

    const { data } = await client.query({
      query: queryGetRoles,
      variables: variables.where,
    });

    dispatch({
      type: GET_ROLES,
      payload: {
        roles: data.roles,
      },
    });
  };
}

export function createRole({
  uniqueName,
  name,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationCreatedRole,
      variables: {
        role: {
          uniqueName,
          name,
        },
      },
    });

    dispatch({
      type: CREATE_ROLE,
      payload: {
        role: data.createdRole,
      },
    });
  };
}

export function updateRole({
  id,
  uniqueName,
  name,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedRole,
      variables: {
        role: {
          id,
          uniqueName,
          name,
        },
      },
    });

    dispatch({
      type: UPDATE_ROLE,
      payload: {
        role: data.updatedRole,
      },
    });
  };
}

export function deleteRole(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationDeletedRole,
      variables: { id },
    });

    dispatch({
      type: DELETE_ROLE,
      payload: {
        role: data.deletedRole,
      },
    });
  };
}

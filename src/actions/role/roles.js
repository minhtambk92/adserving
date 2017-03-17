/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_ROLE,
  GET_ROLE_ERROR,
  GET_ROLES,
  GET_ROLES_ERROR,
  CREATE_ROLE,
  CREATE_ROLE_ERROR,
  UPDATE_ROLE,
  UPDATE_ROLE_ERROR,
  DELETE_ROLE,
  DELETE_ROLE_ERROR,
  GET_ROLES_FILTERS,
  GET_ROLES_FILTERS_ERROR,
  SET_ROLES_FILTERS,
  SET_ROLES_FILTERS_ERROR,
} from '../../constants';

import queryGetRole from './getRole.graphql';
import queryGetRoles from './getRoles.graphql';
import mutationCreatedRole from './createdRole.graphql';
import mutationUpdatedRole from './updatedRole.graphql';
import mutationDeletedRole from './deletedRole.graphql';

export function getRolesFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ROLES_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_ROLES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setRolesFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_ROLES_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_ROLES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getRole(id) {
  return async (dispatch, getState, { client }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: GET_ROLE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getRoles(args = {
  where: {},
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const variables = Object.assign({}, args);
      const { filters } = await getState().roles;

      if (
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = { ...filters };
      }

      const { data } = await graphqlRequest(queryGetRoles, variables.where);

      dispatch({
        type: GET_ROLES,
        payload: {
          roles: data.roles,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ROLES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createRole({ uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedRole, { role: { uniqueName, name } });

      dispatch({
        type: CREATE_ROLE,
        payload: {
          role: data.createdRole,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ROLE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}

export function updateRole({ id, uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } =
        await graphqlRequest(mutationUpdatedRole, { role: { id, uniqueName, name } });

      dispatch({
        type: UPDATE_ROLE,
        payload: {
          role: data.updatedRole,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ROLE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteRole(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedRole, { id });

      dispatch({
        type: DELETE_ROLE,
        payload: {
          role: data.deletedRole,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_ROLE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

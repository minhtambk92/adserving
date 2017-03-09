import {
  GET_PERMISSIONS,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from '../../constants';

import queryGetPermissions from './getPermissions.graphql';
import mutationCreatedPermission from './createdPermission.graphql';
import mutationUpdatedPermission from './updatedPermission.graphql';
import mutationDeletedPermission from './deletedPermission.graphql';

export function getPermissions() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetPermissions);

    dispatch({
      type: GET_PERMISSIONS,
      payload: {
        permissions: data.permissions,
      },
    });
  };
}

export function createPermission({
  name,
  status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedPermission, {
      permission: {
        name,
        status,
      },
    });

    dispatch({
      type: CREATE_PERMISSION,
      payload: {
        permission: data.createdPermission,
      },
    });
  };
}

export function updatePermission({
  id,
  name,
  status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedPermission, {
      permission: {
        id,
        name,
        status,
      },
    });

    dispatch({
      type: UPDATE_PERMISSION,
      payload: {
        permission: data.updatedPermission,
      },
    });
  };
}

export function deletePermission(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedPermission, { id });

    dispatch({
      type: DELETE_PERMISSION,
      payload: {
        permission: data.deletedPermission,
      },
    });
  };
}

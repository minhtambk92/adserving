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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryGetPermissions,
    });

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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({ mutation: mutationCreatedPermission,
      variables: {
        permission: {
          name,
          status,
        },
      } });

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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedPermission,
      variables: {
        permission: {
          id,
          name,
          status,
        },
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
  return async (dispatch, getState, { client }) => {
    const { data } =
      await client.mutate({ mutation: mutationDeletedPermission, variables: { id } });

    dispatch({
      type: DELETE_PERMISSION,
      payload: {
        permission: data.deletedPermission,
      },
    });
  };
}

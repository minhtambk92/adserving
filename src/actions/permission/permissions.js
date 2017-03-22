import {
  GET_PERMISSIONS,
  GET_PERMISSIONS_ERROR,
  CREATE_PERMISSION,
  CREATE_PERMISSION_ERROR,
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_ERROR,
  DELETE_PERMISSION,
  DELETE_PERMISSION_ERROR,
} from '../../constants';

import queryGetPermissions from './getPermissions.graphql';
import mutationCreatedPermission from './createdPermission.graphql';
import mutationUpdatedPermission from './updatedPermission.graphql';
import mutationDeletedPermission from './deletedPermission.graphql';

export function getPermissions() {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.networkInterface.query({
        query: queryGetPermissions,
      });

      dispatch({
        type: GET_PERMISSIONS,
        payload: {
          permissions: data.permissions,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_PERMISSIONS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createPermission({
  name,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: CREATE_PERMISSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updatePermission({
  id,
  name,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: UPDATE_PERMISSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deletePermission(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } =
        await client.mutate({ mutation: mutationDeletedPermission, variables: { id } });

      dispatch({
        type: DELETE_PERMISSION,
        payload: {
          permission: data.deletedPermission,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_PERMISSION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

import {
  GET_PERMISSIONS,
  CREATE_PERMISSION,
  GET_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
} from '../constants';

export function getPermission(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        permissions(where: {id: "${id}"}, limit: 1) {
          id
          name
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_PERMISSION,
      payload: {
        permission: data.permissions.shift(),
      },
    });
  };
}

export function getPermissions() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        permissions {
          id
          name
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_PERMISSIONS,
      payload: {
        permissions: data.permissions,
      },
    });
  };
}

export function createPermission({
  name, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($permission: PermissionInputTypeWithoutId!) {
        createdPermission(permission: $permission) {
          id
          name
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
  id, name, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($permission: PermissionInputType!) {
        updatedPermission(permission: $permission) {
          id
          name
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedPermission(id: "${id}") {
          id
          name
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_PERMISSION,
      payload: {
        permission: data.deletedPermission,
      },
    });
  };
}

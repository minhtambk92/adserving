/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_SIZE_TYPES,
  GET_ZONE_SIZE_TYPES_ERROR,
  CREATE_ZONE_SIZE_TYPE,
  CREATE_ZONE_SIZE_TYPE_ERROR,
  UPDATE_ZONE_SIZE_TYPE,
  UPDATE_ZONE_SIZE_TYPE_ERROR,
  DELETE_ZONE_SIZE_TYPE,
  DELETE_ZONE_SIZE_TYPE_ERROR,
} from '../../constants';

import queryGetZoneSizeTypes from './getZoneSizeTypes.graphql';
import mutationCreatedZoneSizeType from './createdZoneSizeType.graphql';
import mutationUpdatedZoneSizeType from './updatedZoneSizeType.graphql';
import mutationDeletedZoneSizeType from './deletedZoneSizeType.graphql';

export function getZoneSizeTypes(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().zoneSizeTypes.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }

      const { data } = await client.networkInterface.query({ query: queryGetZoneSizeTypes });

      dispatch({
        type: GET_ZONE_SIZE_TYPES,
        payload: {
          zoneSizeTypes: data.zoneSizeTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ZONE_SIZE_TYPES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createZoneSizeType({
  name,
  width,
  height,
  status,
  userId,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedZoneSizeType,
        variables: {
          zoneSizeType: {
            name,
            width,
            height,
            status,
            userId,
          },
        },
      });

      dispatch({
        type: CREATE_ZONE_SIZE_TYPE,
        payload: {
          zoneSizeType: data.createdZoneSizeType,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ZONE_SIZE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateZoneSizeType({
  id,
  name,
  width,
  height,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedZoneSizeType,
        variables: {
          zoneSizeType: {
            id,
            name,
            width,
            height,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_ZONE_SIZE_TYPE,
        payload: {
          zoneSizeType: data.updatedZoneSizeType,
        },
      });
    } catch
      (error) {
      dispatch({
        type: UPDATE_ZONE_SIZE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteZoneSizeType(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedZoneSizeType,
        variables: { id },
      });

      dispatch({
        type: DELETE_ZONE_SIZE_TYPE,
        payload: {
          zoneSizeType: data.deletedZoneSizeType,
        },
      });
    } catch
      (error) {
      dispatch({
        type: DELETE_ZONE_SIZE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

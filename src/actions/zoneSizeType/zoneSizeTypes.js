/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_SIZE_TYPES,
  CREATE_ZONE_SIZE_TYPE,
  UPDATE_ZONE_SIZE_TYPE,
  DELETE_ZONE_SIZE_TYPE,
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
  return async (dispatch, getState, { graphqlRequest }) => {
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

    const { data } = await graphqlRequest(queryGetZoneSizeTypes);

    dispatch({
      type: GET_ZONE_SIZE_TYPES,
      payload: {
        zoneSizeTypes: data.zoneSizeTypes,
      },
    });
  };
}

export function createZoneSizeType({ name, width, height, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedZoneSizeType, {
      zoneSizeType: {
        name,
        width,
        height,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_ZONE_SIZE_TYPE,
      payload: {
        zoneSizeType: data.createdZoneSizeType,
      },
    });
  };
}

export function updateZoneSizeType({ id, name, width, height, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedZoneSizeType, {
      zoneSizeType: {
        id,
        name,
        width,
        height,
        status,
      },
    });

    dispatch({
      type: UPDATE_ZONE_SIZE_TYPE,
      payload: {
        zoneSizeType: data.updatedZoneSizeType,
      },
    });
  };
}

export function deleteZoneSizeType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedZoneSizeType, { id });

    dispatch({
      type: DELETE_ZONE_SIZE_TYPE,
      payload: {
        zoneSizeType: data.deletedZoneSizeType,
      },
    });
  };
}

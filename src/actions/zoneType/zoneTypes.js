/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_TYPES,
  CREATE_ZONE_TYPE,
  UPDATE_ZONE_TYPE,
  DELETE_ZONE_TYPE,
} from '../../constants';

import queryGetZoneTypes from './getZoneTypes.graphql';
import mutationCreatedZoneType from './createdZoneType.graphql';
import mutationUpdatedZoneType from './updatedZoneType.graphql';
import mutationDeletedZoneType from './deletedZoneType.graphql';

export function getZoneTypes(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().zoneTypes.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await client.query({
      query: queryGetZoneTypes,
      variables: variables.where,
    });

    dispatch({
      type: GET_ZONE_TYPES,
      payload: {
        zoneTypes: data.zoneTypes,
      },
    });
  };
}

export function createZoneType({ name, value, isSize, status, userId }) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationCreatedZoneType,
      variables: {
        zoneType: {
          name,
          value,
          isSize,
          status,
          userId,
        },
      },
    });

    dispatch({
      type: CREATE_ZONE_TYPE,
      payload: {
        zoneType: data.createdZoneType,
      },
    });
  };
}

export function updateZoneType({ id, name, value, isSize, status }) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedZoneType,
      variables: {
        zoneType: {
          id,
          name,
          value,
          isSize,
          status,
        },
      },
    });

    dispatch({
      type: UPDATE_ZONE_TYPE,
      payload: {
        zoneType: data.updatedZoneType,
      },
    });
  };
}

export function deleteZoneType(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationDeletedZoneType,
      variables: { id },
    });

    dispatch({
      type: DELETE_ZONE_TYPE,
      payload: {
        zoneType: data.deletedZoneType,
      },
    });
  };
}

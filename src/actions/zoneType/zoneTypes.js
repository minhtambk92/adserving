/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_TYPES,
  GET_ZONE_TYPES_ERROR,
  CREATE_ZONE_TYPE,
  CREATE_ZONE_TYPE_ERROR,
  UPDATE_ZONE_TYPE,
  UPDATE_ZONE_TYPE_ERROR,
  DELETE_ZONE_TYPE,
  DELETE_ZONE_TYPE_ERROR,
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
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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

      const { data } = await graphqlRequest(queryGetZoneTypes, variables.where);

      dispatch({
        type: GET_ZONE_TYPES,
        payload: {
          zoneTypes: data.zoneTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ZONE_TYPES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createZoneType({ name, value, isSize, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedZoneType, {
        zoneType: {
          name,
          value,
          isSize,
          status,
          userId,
        },
      });

      dispatch({
        type: CREATE_ZONE_TYPE,
        payload: {
          zoneType: data.createdZoneType,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ZONE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateZoneType({ id, name, value, isSize, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationUpdatedZoneType, {
        zoneType: {
          id,
          name,
          value,
          isSize,
          status,
        },
      });

      dispatch({
        type: UPDATE_ZONE_TYPE,
        payload: {
          zoneType: data.updatedZoneType,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ZONE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteZoneType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedZoneType, { id });

      dispatch({
        type: DELETE_ZONE_TYPE,
        payload: {
          zoneType: data.deletedZoneType,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_ZONE_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

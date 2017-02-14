/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_TYPES,
  GET_ZONE_TYPE,
  CREATE_ZONE_TYPE,
  UPDATE_ZONE_TYPE,
  DELETE_ZONE_TYPE,
} from '../constants';

export function getZoneType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zoneTypes(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          isSize
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ZONE_TYPE,
      payload: {
        zoneType: data.zoneTypes.shift(),
      },
    });
  };
}

export function getZoneTypes(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zoneTypes {
          id
          name
          value
          isSize
          status
          userId
          createdAt
          updatedAt
        }
      }`;

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

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_ZONE_TYPES,
      payload: {
        zoneTypes: data.zoneTypes,
      },
    });
  };
}

export function createZoneType({ name, value, isSize, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zoneType: ZoneTypeInputTypeWithoutId!) {
        createdZoneType(zoneType: $zoneType) {
          id
          name
          value
          isSize
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
  };
}

export function updateZoneType({ id, name, value, isSize, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zoneType: ZoneTypeInputType!) {
        updatedZoneType(zoneType: $zoneType) {
          id
          name
          value
          isSize
          status
          userId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
  };
}

export function deleteZoneType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedZoneType(id: "${id}") {
          id
          name
          value
          isSize
          status
          userId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ZONE_TYPE,
      payload: {
        zoneType: data.deletedZoneType,
      },
    });
  };
}

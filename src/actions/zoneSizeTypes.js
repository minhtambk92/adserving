/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE_SIZE_TYPES,
  GET_ZONE_SIZE_TYPE,
  CREATE_ZONE_SIZE_TYPE,
  UPDATE_ZONE_SIZE_TYPE,
  DELETE_ZONE_SIZE_TYPE,
} from '../constants';

export function getZoneSizeType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zoneSizeTypes(where: {id: "${id}"}, limit: 1) {
          id
          name
          width
          height
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_ZONE_SIZE_TYPE,
      payload: {
        zoneSizeType: data.zoneSizeTypes.shift(),
      },
    });
  };
}

export function getZoneSizeTypes(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        zoneSizeTypes {
          id
          name
          width
          height
          status
          createdAt
          updatedAt
        }
      }`;

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

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_ZONE_SIZE_TYPES,
      payload: {
        zoneSizeTypes: data.zoneSizeTypes,
      },
    });
  };
}

export function createZoneSizeType({ name, width, height, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($zoneSizeType: ZoneSizeTypeInputTypeWithoutId!) {
        createdZoneSizeType(zoneSizeType: $zoneSizeType) {
          id
          name
          width
          height
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      zoneSizeType: {
        name,
        width,
        height,
        status,
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
    const mutation = `
      mutation ($zoneSizeType: ZoneSizeTypeInputType!) {
        updatedZoneSizeType(zoneSizeType: $zoneSizeType) {
          id
          name
          width
          height
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedZoneSizeType(id: "${id}") {
          id
          name
          width
          height
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_ZONE_SIZE_TYPE,
      payload: {
        zoneSizeType: data.deletedZoneSizeType,
      },
    });
  };
}

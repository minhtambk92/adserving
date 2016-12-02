
/* eslint-disable import/prefer-default-export */

import {
  GET_SHARE_ZONE,
  GET_SHARE_ZONES,
  CREATE_SHARE_ZONE,
  UPDATE_SHARE_ZONE,
  DELETE_SHARE_ZONE,
} from '../constants';

export function getShareZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        shareZones(where: {id: "${id}"}, limit: 1) {
          id
          name
          width
          height
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SHARE_ZONE,
      payload: {
        shareZone: data.shareZones.shift(),
      },
    });
  };
}

export function getShareZones(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        shareZones(where: $where, order: $order, limit: $limit) {
          id
          name
          width
          height
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().shareZones.filters;

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
      type: GET_SHARE_ZONES,
      payload: {
        shareZones: data.shareZones,
      },
    });
  };
}

export function createShareZone({ name, width, height, description, zoneId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($shareZone: ShareZoneInputTypeWithoutId!) {
        createdShareZone(shareZone: $shareZone) {
          id
          name
          width
          height
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      shareZone: {
        name,
        width,
        height,
        description,
        zoneId,
      },
    });

    dispatch({
      type: CREATE_SHARE_ZONE,
      payload: {
        shareZone: data.createdShareZone,
      },
    });
  };
}

export function updateShareZone({ id, name, width, height, description, zoneId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($shareZone: ShareZoneInputType!) {
        updatedShareZone(shareZone: $shareZone) {
          id
          name
          width
          height
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      shareZone: {
        id,
        name,
        width,
        height,
        description,
        zoneId,
      },
    });

    dispatch({
      type: UPDATE_SHARE_ZONE,
      payload: {
        shareZone: data.updatedShareZone,
      },
    });
  };
}

export function deleteShareZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedShareZone(id: "${id}") {
          id
          name
          width
          height
          description
          zoneId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_SHARE_ZONE,
      payload: {
        shareZone: data.deletedShareZone,
      },
    });
  };
}

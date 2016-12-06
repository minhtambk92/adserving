
/* eslint-disable import/prefer-default-export */

import {
  GET_SHARE_PLACEMENT,
  GET_SHARE_PLACEMENTS,
  CREATE_SHARE_PLACEMENT,
  UPDATE_SHARE_PLACEMENT,
  DELETE_SHARE_PLACEMENT,
} from '../constants';

export function getSharePlacement(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sharePlacements(where: {id: "${id}"}, limit: 1) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SHARE_PLACEMENT,
      payload: {
        sharePlacement: data.sharePlacements.shift(),
      },
    });
  };
}

export function getSharePlacements(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        sharePlacements(where: $where, order: $order, limit: $limit) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().sharePlacemets.filters;

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
      type: GET_SHARE_PLACEMENTS,
      payload: {
        sharePlacements: data.sharePlacements,
      },
    });
  };
}

export function createSharePlacement({ placementId, shareId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($sharePlacement: SharePlacementInputTypeWithoutId!) {
        createdShare(sharePlacement: $sharePlacement) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      share: {
        placementId,
        shareId,
      },
    });

    dispatch({
      type: CREATE_SHARE_PLACEMENT,
      payload: {
        sharePlacement: data.createdSharePlacement,
      },
    });
  };
}

export function updateSharePlacement({ id, placementId, shareId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($sharePlacement: SharePlacementInputType!) {
        updatedSharePlacement(sharePlacement: $sharePlacement) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      share: {
        id,
        placementId,
        shareId,
      },
    });

    dispatch({
      type: UPDATE_SHARE_PLACEMENT,
      payload: {
        sharePlacement: data.updatedSharePlacement,
      },
    });
  };
}

export function deleteSharePlacement(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedSharePlacement(id: "${id}") {
          id
          placementId
          shareId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_SHARE_PLACEMENT,
      payload: {
        sharePlacement: data.deletedSharePlacement,
      },
    });
  };
}

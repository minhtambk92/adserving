
/* eslint-disable import/prefer-default-export */

import {
  GET_SHARE_BY_ZONE_ID,
  GET_SHARES,
  CREATE_SHARE,
  UPDATE_SHARE,
  DELETE_SHARE,
  GET_SHARE,
} from '../constants';

export function getShareByZoneId(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        shares(where: {zoneId: "${id}"}) {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SHARE_BY_ZONE_ID,
      payload: {
        shares: data.shares,
      },
    });
  };
}

export function getShare(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        shares(where: {id: "${id}"}, limit: 1) {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          placements {
            id
            name
            width
            height
            startTime
            endTime
            weight
            description
            campaignId
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_SHARE,
      payload: {
        share: data.shares.shift(),
      },
    });
  };
}

export function getShares(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        shares {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().shares.filters;

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
      type: GET_SHARES,
      payload: {
        shares: data.shares,
      },
    });
  };
}

export function createShare({ name, html, css, outputCss, width,
  height,
  weight, classes, type, description, zoneId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($share: ShareInputTypeWithoutId!) {
        createdShare(share: $share) {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      share: {
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
      },
    });

    dispatch({
      type: CREATE_SHARE,
      payload: {
        share: data.createdShare,
      },
    });
  };
}

export function updateShare({ id, name, html, css, outputCss, width,
  height,
  weight, classes, type, description, zoneId, placements,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($share: ShareInputType!) {
        updatedShare(share: $share) {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          placements {
            id
            name
            width
            height
            startTime
            endTime
            weight
            description
            campaignId
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      share: {
        id,
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
        placements,
      },
    });
    dispatch({
      type: UPDATE_SHARE,
      payload: {
        share: data.updatedShare,
      },
    });
  };
}

export function deleteShare(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedShare(id: "${id}") {
          id
          name
          html
          css
          outputCss
          width
          height
          weight
          classes
          type
          description
          zoneId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_SHARE,
      payload: {
        share: data.deletedShare,
      },
    });
  };
}

export function removeShareByZoneId(zoneId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    if (zoneId !== null) {
      const query = `
      query {
        shares(where: {zoneId: "${zoneId}"}) {
          id
          placementId
          bannerId
          createdAt
          updatedAt
        }
      }`;
      const { data } = await graphqlRequest(query);
      if (data.shares.length > 0) {
        const id = data.shares[0].id;
        const mutation = `
          mutation {
            deletedShare(id: "${id}") {
            id
            name
            html
            css
            outputCss
            width
            height
            weight
            classes
            type
            description
            zoneId
            }
          }`;
        await graphqlRequest(mutation);
        dispatch({
          type: DELETE_SHARE,
          payload: {
            share: data.deletedShare,
          },
        });
      }
    }
  };
}

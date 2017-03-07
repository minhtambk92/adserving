
/* eslint-disable import/prefer-default-export */

import {
  CREATE_SHARE,
  UPDATE_SHARE,
  DELETE_SHARE,
} from '../../constants';

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


/* eslint-disable import/prefer-default-export */

import {
  CREATE_SHARE_PLACEMENT,
  DELETE_SHARE_PLACEMENT,
  REMOVE_SHARE_IN_SHARE_PLACEMENT,
  REMOVE_PLACEMENT,
} from '../constants';

export function createSharePlacement({ placementId, shareId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($sharePlacement: SharePlacementInputTypeWithoutId!) {
        createdSharePlacement(sharePlacement: $sharePlacement) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      sharePlacement: {
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

export function removePlacementInSharePlacement(placementId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sharePlacements(where: {placementId: "${placementId}"}) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;
    const { data } = await graphqlRequest(query);
    if (data.sharePlacements.length > 0) {
      for (let i = 0; i < data.sharePlacements.length; i += 1) {
        const id = data.sharePlacements[i].id;
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

        await graphqlRequest(mutation);

        dispatch({
          type: REMOVE_PLACEMENT,
          payload: {
            sharePlacement: REMOVE_PLACEMENT,
          },
        });
      }
    }
  };
}

export function removeShare(shareId) {
  // DELETE BANNER
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        sharePlacements(where: {shareId: "${shareId}"}) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;
    const { data } = await graphqlRequest(query);
    if (data.sharePlacements.length > 0) {
      for (let i = 0; i < data.sharePlacements.length; i += 1) {
        const id = data.sharePlacements[i].id;
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
        await graphqlRequest(mutation);
        dispatch({
          type: DELETE_SHARE_PLACEMENT,
          payload: {
            sharePlacement: DELETE_SHARE_PLACEMENT,
          },
        });
      }
    }
  };
}

export function removeShareInSharePlacement({ placementId, shareId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    if (shareId !== null) {
      const query = `
      query {
        sharePlacements(where: {placementId: "${placementId}",shareId: "${shareId}"}) {
          id
          placementId
          shareId
          createdAt
          updatedAt
        }
      }`;
      const { data } = await graphqlRequest(query);
      if (data.sharePlacements.length > 0) {
        const id = data.sharePlacements[0].id;
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
        await graphqlRequest(mutation);
        dispatch({
          type: REMOVE_SHARE_IN_SHARE_PLACEMENT,
          payload: {
            sharePlacement: REMOVE_SHARE_IN_SHARE_PLACEMENT,
          },
        });
      }
    }
  };
}

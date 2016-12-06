import {
  CREATE_PLACEMENT_BANNER,
  REMOVE_PLACEMENT_BANNER,
  DELETE_BANNER,
} from '../constants';

export function createPlacementBanner({ placementId, bannerId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placementBanner: PlacementBannerInputTypeWithoutId!) {
        createdPlacementBanner(placementBanner: $placementBanner) {
          id
          placementId
          bannerId
          createdAt
          updatedAt
        }
      }`;
    const { data } = await graphqlRequest(mutation, {
      placementBanner: {
        placementId,
        bannerId,
      },
    });
    dispatch({
      type: CREATE_PLACEMENT_BANNER,
      payload: {
        placementBanner: data.createdPlacementBanner,
      },
    });
  };
}

export function removeBannerInPlacementBanner({ placementId, bId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    // REMOVE BANNER IN PLACEMENT OR REMOVE PLACEMENT IN BANNER
    if (bId !== null) {
      const query = `
      query {
        placementBanners(where: {placementId: "${placementId}",bannerId: "${bId}"}) {
          id
          placementId
          bannerId
          createdAt
          updatedAt
        }
      }`;
      const { data } = await graphqlRequest(query);
      if (data.placementBanners.length > 0) {
        const id = data.placementBanners[0].id;
        const mutation = `
          mutation {
            deletedPlacementBanner(id: "${id}") {
              id
              placementId
              bannerId
              createdAt
              updatedAt
              deletedAt
            }
          }`;
        await graphqlRequest(mutation);
        dispatch({
          type: REMOVE_PLACEMENT_BANNER,
          payload: {
            placementBanner: REMOVE_PLACEMENT_BANNER,
          },
        });
      }
    }
  };
}

export function removePlacement(placementId) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placementBanners(where: {placementId: "${placementId}"}) {
          id
          placementId
          bannerId
          createdAt
          updatedAt
        }
      }`;
    const { data } = await graphqlRequest(query);
    if (data.placementBanners.length > 0) {
      for (let i = 0; i < data.placementBanners.length; i += 1) {
        const id = data.placementBanners[i].id;
        const mutation = `
        mutation {
          deletedPlacementBanner(id: "${id}") {
            id
            placementId
            bannerId
            createdAt
            updatedAt
            deletedAt
          }
        }`;

        await graphqlRequest(mutation);

        dispatch({
          type: REMOVE_PLACEMENT_BANNER,
          payload: {
            placementBanner: REMOVE_PLACEMENT_BANNER,
          },
        });
      }
    }
  };
}

export function removeBanner(bId) {
  // DELETE BANNER
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placementBanners(where: {bannerId: "${bId}"}) {
          id
          placementId
          bannerId
          createdAt
          updatedAt
        }
      }`;
    const { data } = await graphqlRequest(query);
    if (data.placementBanners.length > 0) {
      for (let i = 0; i < data.placementBanners.length; i += 1) {
        const id = data.placementBanners[i].id;
        const mutation = `
            mutation {
              deletedPlacementBanner(id: "${id}") {
                id
                placementId
                bannerId
                createdAt
                updatedAt
                deletedAt
              }
            }`;
        await graphqlRequest(mutation);
        dispatch({
          type: DELETE_BANNER,
          payload: {
            placementBanner: DELETE_BANNER,
          },
        });
      }
    }
  };
}

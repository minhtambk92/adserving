import { CREATE_PLACEMENT_BANNER_ZONE } from '../constants';

export function createPlacementBannerZone({ placementId, bannerId, zoneId }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placementBannerZones(where: {placementId: "${placementId}"}) {
          id
          placementId
          bannerId
          zoneId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);
    const newArrBanner = [];
    const newArrZone = [];
    if (data.placementBannerZones.length > 0) {
      for (let i = 0; i < data.placementBannerZones.length; i += 1) {
        if (data.placementBannerZones[i].bannerId === null) {
          newArrBanner.push(data.placementBannerZones[i]);
        } else if (data.placementBannerZones[i].zoneId === null) {
          newArrZone.push(data.placementBannerZones[i]);
        }
      }
      if (newArrBanner.length > 0) {
        const id = newArrBanner[0].id;
        const mutation = `
              mutation ($placementBannerZone: PlacementBannerZoneInputType!) {
               updatedPlacementBannerZone(placementBannerZone: $placementBannerZone) {
                  id
                  placementId
                  bannerId
                  zoneId
                  createdAt
                  updatedAt
                }
              }`;
        const updateBanner = await graphqlRequest(mutation, {
          placementBannerZone: {
            id,
            placementId,
            bannerId,
          },
        });
        dispatch({
          type: CREATE_PLACEMENT_BANNER_ZONE,
          payload: {
            placementBannerZone: updateBanner.updatedPlacementBannerZone,
          },
        });
      }
      if (newArrZone.length > 0) {
        const id = newArrZone[0].id;
        const mutation = `
              mutation ($placementBannerZone: PlacementBannerZoneInputType!) {
               updatedPlacementBannerZone(placementBannerZone: $placementBannerZone) {
                  id
                  placementId
                  bannerId
                  zoneId
                  createdAt
                  updatedAt
                }
              }`;
        const updateZoneId = await graphqlRequest(mutation, {
          placementBannerZone: {
            id,
            placementId,
            zoneId,
          },
        });
        dispatch({
          type: CREATE_PLACEMENT_BANNER_ZONE,
          payload: {
            placementBannerZone: updateZoneId.updatedPlacementBannerZone,
          },
        });
      }
      if (newArrBanner.length === 0 && newArrZone.length === 0) {
        const mutation = `
      mutation ($placementBannerZone: PlacementBannerZoneInputTypeWithoutId!) {
        createdPlacementBannerZone(placementBannerZone: $placementBannerZone) {
          id
          placementId
          bannerId
          zoneId
          createdAt
          updatedAt
        }
      }`;
        const create = await graphqlRequest(mutation, {
          placementBannerZone: {
            placementId,
            bannerId,
            zoneId,
          },
        });
        dispatch({
          type: CREATE_PLACEMENT_BANNER_ZONE,
          payload: {
            placementBannerZone: create.createdPlacementBannerZone,
          },
        });
      }
    } else {
      const mutation = `
      mutation ($placementBannerZone: PlacementBannerZoneInputTypeWithoutId!) {
        createdPlacementBannerZone(placementBannerZone: $placementBannerZone) {
          id
          placementId
          bannerId
          zoneId
          createdAt
          updatedAt
        }
      }`;
      const create = await graphqlRequest(mutation, {
        placementBannerZone: {
          placementId,
          bannerId,
          zoneId,
        },
      });
      dispatch({
        type: CREATE_PLACEMENT_BANNER_ZONE,
        payload: {
          placementBannerZone: create.createdPlacementBannerZone,
        },
      });
    }
  };
}

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
    if (data.placementBannerZones.length > 0) {
      for (let i = 0; i < data.placementBannerZones.length; i++) {
        const id = data.placementBannerZones[i].id;
        if (data.placementBannerZones[i].bannerId === null) {
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

          const { data1 } = await graphqlRequest(mutation, {
            placementBannerZone: {
              id,
              placementId,
              bannerId,
              zoneId,
            },
          });
        }
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

      const { data2 } = await graphqlRequest(mutation, {
        placementBannerZone: {
          placementId,
          bannerId,
          zoneId,
        },
      });
    }
  };
}


import {
  CREATE_PLACEMENT_BANNER_ZONE,
  REMOVE_PLACEMENT_BANNER_ZONE,
  DELETE_BANNER,
  DELETE_ZONE,
} from '../constants';

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
      if (bannerId !== null && zoneId === null) {
        for (let i = 0; i < data.placementBannerZones.length; i += 1) {
          if (data.placementBannerZones[i].bannerId === null) {
            newArrBanner.push(data.placementBannerZones[i]);
          }
        }
      } else if (bannerId === null && zoneId !== null) {
        for (let i = 0; i < data.placementBannerZones.length; i += 1) {
          if (data.placementBannerZones[i].zoneId === null) {
            newArrZone.push(data.placementBannerZones[i]);
          }
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
export function removeZoneInPlacementBannerZone({ placementId, zId }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    // REMOVE ZONE IN PLACEMENT OR REMOVE PLACEMENT IN ZONE
    if (zId !== null) {
      const query = `
      query {
        placementBannerZones(where: {placementId: "${placementId}",zoneId: "${zId}"}) {
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
        const id = data.placementBannerZones[0].id;
        if (data.placementBannerZones[0].bannerId === null) {
          const mutation = `
          mutation {
            deletedPlacementBannerZone(id: "${id}") {
              id
              placementId
              bannerId
              zoneId
              createdAt
              updatedAt
              deletedAt
            }
          }`;
          const { deleted } = await graphqlRequest(mutation);
          dispatch({
            type: REMOVE_PLACEMENT_BANNER_ZONE,
            payload: {
              placementBannerZone: deleted,
            },
          });
        } else if (data.placementBannerZones[0].bannerId !== null) {
          const zoneId = null;
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

          const { updatePlz } = await graphqlRequest(mutation, {
            placementBannerZone: {
              id,
              zoneId,
            },
          });

          dispatch({
            type: REMOVE_PLACEMENT_BANNER_ZONE,
            payload: {
              placementBannerZone: updatePlz.updatedPlacementBannerZone,
            },
          });
        }
      }
    }
  };
}
export function removerBannerInPlacementBannerZone({ placementId, bId }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    // REMOVE BANNER IN PLACEMENT OR REMOVE PLACEMENT IN BANNER
    if (bId !== null) {
      const query = `
      query {
        placementBannerZones(where: {placementId: "${placementId}",bannerId: "${bId}"}) {
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
        const id = data.placementBannerZones[0].id;
        if (data.placementBannerZones[0].zoneId === null) {
          const mutation = `
          mutation {
            deletedPlacementBannerZone(id: "${id}") {
              id
              placementId
              bannerId
              zoneId
              createdAt
              updatedAt
              deletedAt
            }
          }`;
          const { deletedPbz } = await graphqlRequest(mutation);
          dispatch({
            type: REMOVE_PLACEMENT_BANNER_ZONE,
            payload: {
              placementBannerZone: deletedPbz,
            },
          });
        } else if (data.placementBannerZones[0].zoneId !== null) {
          const bannerId = null;
          const mutation = `
          mutation ($placementBannerZone: PlacementBannerZoneInput!) {
            updatedPlacementBannerZone(placementBannerZone: $placementBannerZone) {
              id
              placementId
              bannerId
              zoneId
              createdAt
              updatedAt
            }
          }`;

          const { updatePlz } = await graphqlRequest(mutation, {
            placementBannerZone: {
              id,
              bannerId,
            },
          });

          dispatch({
            type: REMOVE_PLACEMENT_BANNER_ZONE,
            payload: {
              placementBannerZone: updatePlz.updatedPlacementBannerZone,
            },
          });
        }
      }
    }
  };
}
export function removePlacement(placementId) {
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
      for (let i = 0; i < data.placementBannerZones.length; i += 1) {
        const id = data.placementBannerZones[i].id;
        const mutation = `
        mutation {
          deletedPlacementBannerZone(id: "${id}") {
            id
            placementId
            bannerId
            zoneId
            createdAt
            updatedAt
            deletedAt
          }
        }`;

        const { deletedPlacement } = await graphqlRequest(mutation);

        dispatch({
          type: REMOVE_PLACEMENT_BANNER_ZONE,
          payload: {
            placementBannerZone: deletedPlacement,
          },
        });
      }
    }
  };
}
export function removeZone(zId) {
  // DELETE ZONE
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placementBannerZones(where: {zoneId: "${zId}"}) {
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
      for (let i = 0; i < data.placementBannerZones.length; i += 1) {
        const id = data.placementBannerZones[i].id;
        if (data.placementBannerZones[i].bannerId === null) {
          const mutation = `
            mutation {
              deletedPlacementBannerZone(id: "${id}") {
                id
                placementId
                bannerId
                zoneId
                createdAt
                updatedAt
                deletedAt
              }
            }`;

          const { deletedPlacement } = await graphqlRequest(mutation);

          dispatch({
            type: DELETE_ZONE,
            payload: {
              placementBannerZone: deletedPlacement,
            },
          });
        } else if (data.placementBannerZones[i].bannerId !== null) {
          const zoneId = null;
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
          const { updatePlz } = await graphqlRequest(mutation, {
            placementBannerZone: {
              id,
              zoneId,
            },
          });
          dispatch({
            type: DELETE_ZONE,
            payload: {
              placementBannerZone: updatePlz.updatedPlacementBannerZone,
            },
          });
        }
      }
    }
  };
}
export function removeBanner(bId) {
  // DELETE BANNER
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placementBannerZones(where: {bannerId: "${bId}"}) {
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
      for (let i = 0; i < data.placementBannerZones.length; i += 1) {
        const id = data.placementBannerZones[i].id;
        if (data.placementBannerZones[i].zoneId === null) {
          const mutation = `
            mutation {
              deletedPlacementBannerZone(id: "${id}") {
                id
                placementId
                bannerId
                zoneId
                createdAt
                updatedAt
                deletedAt
              }
            }`;

          const { deletedPlacement } = await graphqlRequest(mutation);

          dispatch({
            type: DELETE_BANNER,
            payload: {
              placementBannerZone: deletedPlacement,
            },
          });
        } else if (data.placementBannerZones[i].zoneId !== null) {
          const bannerId = null;
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
          const { updatePlz } = await graphqlRequest(mutation, {
            placementBannerZone: {
              id,
              bannerId,
            },
          });
          dispatch({
            type: DELETE_BANNER,
            payload: {
              placementBannerZone: updatePlz.updatedPlacementBannerZone,
            },
          });
        }
      }
    }
  };
}

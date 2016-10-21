import {
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  GET_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
  CREATE_PLACEMENT_INCLUDE_CAMPAIGN,
} from '../constants/';

export function getPlacement(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placements(where: {id: "${id}"}, limit: 1) {
          id
          name
          size
          startTime
          endTime
          weight
          description
          campaignId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_PLACEMENT,
      payload: {
        placement: data.placements.shift(),
      },
    });
  };
}

export function getPlacements() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placements {
          id
          name
          size
          startTime
          endTime
          weight
          description
           campaignId
          createdAt
          updatedAt
          }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_PLACEMENTS,
      payload: {
        placements: data.placements,
      },
    });
  };
}

export function createPlacement({
  name,
  size,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputTypeWithoutId!) {
        createdPlacement(placement: $placement) {
          id
          name
          size
          startTime
          endTime
          weight
          description
          campaignId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        name,
        size,
        startTime,
        endTime,
        weight,
        description,
        campaignId,
      },
    });

    dispatch({
      type: CREATE_PLACEMENT,
      payload: {
        placement: data.createdPlacement,
      },
    });
  };
}

export function createPlacementIncludeCampaign({
  name,
  size,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputTypeWithoutId!) {
        createdPlacement(placement: $placement) {
          id
          name
          size
          startTime
          endTime
          weight
          description
          campaignId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        name,
        size,
        startTime,
        endTime,
        weight,
        description,
        campaignId,
      },
    });

    dispatch({
      type: CREATE_PLACEMENT_INCLUDE_CAMPAIGN,
      payload: {
        placement: data.createdPlacement,
      },
    });
  };
}

export function updatePlacement({
  id,
  name,
  size,
  startTime,
  endTime,
  weight,
  description,
  campaignId,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputType!) {
        updatedPlacement(placement: $placement) {
          id
          name
          size
          startTime
          endTime
          weight
          description
           campaignId
           createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        id,
        name,
        size,
        startTime,
        endTime,
        weight,
        description,
        campaignId,
      },
    });

    dispatch({
      type: UPDATE_PLACEMENT,
      payload: {
        placement: data.updatedPlacement,
      },
    });
  };
}

export function deletePlacement(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedPlacement(id: "${id}") {
          id
          name
          size
          startTime
          endTime
          weight
          description
           campaignId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_PLACEMENT,
      payload: {
        placement: data.deletedPlacement,
      },
    });
  };
}

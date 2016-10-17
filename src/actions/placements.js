import {
  GET_PLACEMENTS,
  CREATE_PLACEMENT,
  GET_PLACEMENT,
  UPDATE_PLACEMENT,
  DELETE_PLACEMENT,
} from '../constants/';
export function getPlacement(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        placements(where: {id: "${id}"}, limit: 1) {
          id
          userId
          name
          size
          startTime
          endTime
          weight
          description
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
          userId
          name
          size
          startTime
          endTime
          weight
          description
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
  userId,
  name,
  size,
  startTime,
  endTime,
  weight,
  description,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputTypeWithoutId!) {
        createdPlacement(placement: $placement) {
          id
          userId
          name
          size
          startTime
          endTime
          weight
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        userId,
        name,
        size,
        startTime,
        endTime,
        weight,
        description,

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
export function updatePlacement({
  id,
  userId,
  name,
  size,
  startTime,
  endTime,
  weight,
  description,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($placement: PlacementInputType!) {
        updatedPlacement(placement: $placement) {
          id
          userId
          name
          size
          startTime
          endTime
          weight
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      placement: {
        id,
        userId,
        name,
        size,
        startTime,
        endTime,
        weight,
        description,
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
          userId
          name
          size
          startTime
          endTime
          weight
          description
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

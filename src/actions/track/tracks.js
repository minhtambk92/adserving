import {
  CREATE_TRACK,
  UPDATE_TRACK,
  DELETE_TRACK,
} from '../../constants';

export function createTrack({
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($track: TrackInputTypeWithoutId!) {
        createdTrack(track: $track) {
         id
         clickUrl
         impressionUrl
         bannerId
         createdAt
         updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      track: {
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: CREATE_TRACK,
      payload: {
        track: data.createdTrack,
      },
    });
  };
}

export function updateTrack({
  id,
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($track: TrackInputType!) {
        updatedTrack(track: $track) {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      track: {
        id,
        clickUrl,
        impressionUrl,
        bannerId,
      },
    });

    dispatch({
      type: UPDATE_TRACK,
      payload: {
        track: data.updatedTrack,
      },
    });
  };
}

export function deleteTrack(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedTrack(id: "${id}") {
          id
          clickUrl
          impressionUrl
          bannerId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_TRACK,
      payload: {
        track: data.deletedTrack,
      },
    });
  };
}

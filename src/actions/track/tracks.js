import {
  CREATE_TRACK,
  UPDATE_TRACK,
  DELETE_TRACK,
} from '../../constants';

import mutationCreatedTrack from './createdTrack.graphql';
import mutationDeletedTrack from './deletedTrack.graphql';
import mutationUpdatedTrack from './updatedTrack.graphql';

export function createTrack({
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationCreatedTrack,
      variables: {
        track: {
          clickUrl,
          impressionUrl,
          bannerId,
        },
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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdatedTrack,
      variables: {
        track: {
          id,
          clickUrl,
          impressionUrl,
          bannerId,
        },
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
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationDeletedTrack,
      variables: { id },
    });

    dispatch({
      type: DELETE_TRACK,
      payload: {
        track: data.deletedTrack,
      },
    });
  };
}

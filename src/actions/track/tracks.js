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
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedTrack, {
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
    const { data } = await graphqlRequest(mutationUpdatedTrack, {
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
    const { data } = await graphqlRequest(mutationDeletedTrack, { id });

    dispatch({
      type: DELETE_TRACK,
      payload: {
        track: data.deletedTrack,
      },
    });
  };
}

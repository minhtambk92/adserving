import {
  CREATE_TRACK,
  CREATE_TRACK_ERROR,
  UPDATE_TRACK,
  UPDATE_TRACK_ERROR,
  DELETE_TRACK,
  DELETE_TRACK_ERROR,
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
    try {
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
    } catch (error) {
      dispatch({
        type: CREATE_TRACK_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateTrack({
  id,
  clickUrl,
  impressionUrl,
  bannerId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: UPDATE_TRACK_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteTrack(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedTrack, { id });

      dispatch({
        type: DELETE_TRACK,
        payload: {
          track: data.deletedTrack,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_TRACK_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

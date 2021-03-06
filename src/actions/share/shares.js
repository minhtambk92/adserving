/* eslint-disable import/prefer-default-export */

import {
  CREATE_SHARE,
  UPDATE_SHARE,
  DELETE_SHARE,
} from '../../constants';

import mutationCreatedShare from './createdShare.graphql';
import mutationUpdatedShare from './updatedShare.graphql';
import mutationDeletedShare from './deletedShare.graphql';

export function createShare({
  name,
  html,
  css,
  outputCss,
  width,
  height,
  weight,
  classes,
  type,
  description,
  zoneId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedShare, {
      share: {
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
      },
    });

    dispatch({
      type: CREATE_SHARE,
      payload: {
        share: data.createdShare,
      },
    });
  };
}

export function updateShare({
  id,
  name,
  html,
  css,
  outputCss,
  width,
  height,
  weight,
  classes,
  type,
  description,
  zoneId,
  placements,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedShare, {
      share: {
        id,
        name,
        html,
        css,
        outputCss,
        width,
        height,
        weight,
        classes,
        type,
        description,
        zoneId,
        placements,
      },
    });
    dispatch({
      type: UPDATE_SHARE,
      payload: {
        share: data.updatedShare,
      },
    });
  };
}

export function deleteShare(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedShare, { id });

    dispatch({
      type: DELETE_SHARE,
      payload: {
        share: data.deletedShare,
      },
    });
  };
}

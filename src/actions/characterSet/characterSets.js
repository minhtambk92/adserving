/**
 * Created by quynd on 1/18/17.
 */
/* eslint-disable import/prefer-default-export */

import {
  GET_CHARACTER_SETS,
  CREATE_CHARACTER_SET,
  UPDATE_CHARACTER_SET,
  DELETE_CHARACTER_SET,
} from '../../constants';

import queryGetCharacterSets from './getCharacterSets.graphql';
import mutationCreateCharacterSet from './createdCharacterSet.graphql';
import mutationUpdatedCharacterSet from './updatedCharacterSet.graphql';
import mutationDeletedCharacterSet from './deletedCharacterSet.graphql';

export function getCharacterSets(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().characterSets.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(queryGetCharacterSets, variables.where);

    dispatch({
      type: GET_CHARACTER_SETS,
      payload: {
        characterSets: data.characterSets,
      },
    });
  };
}

export function createCharacterSet({ name, value, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreateCharacterSet, {
      characterSet: {
        name,
        value,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_CHARACTER_SET,
      payload: {
        characterSet: data.createdCharacterSet,
      },
    });
  };
}

export function updateCharacterSet({ id, name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedCharacterSet, {
      characterSet: {
        id,
        name,
        value,
        status,
      },
    });

    dispatch({
      type: UPDATE_CHARACTER_SET,
      payload: {
        characterSet: data.updatedCharacterSet,
      },
    });
  };
}

export function deleteCharacterSet(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedCharacterSet, { id });

    dispatch({
      type: DELETE_CHARACTER_SET,
      payload: {
        characterSet: data.deletedCharacterSet,
      },
    });
  };
}

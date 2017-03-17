/**
 * Created by quynd on 1/18/17.
 */
/* eslint-disable import/prefer-default-export */

import {
  GET_CHARACTER_SETS,
  GET_CHARACTER_SETS_ERROR,
  CREATE_CHARACTER_SET,
  CREATE_CHARACTER_SET_ERROR,
  UPDATE_CHARACTER_SET,
  UPDATE_CHARACTER_SET_ERROR,
  DELETE_CHARACTER_SET,
  DELETE_CHARACTER_SET_ERROR,
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
  return async (dispatch, getState, { client }) => {
    try {
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

      const { data } = await client.query({
        query: queryGetCharacterSets,
        variables: variables.where,
      });

      dispatch({
        type: GET_CHARACTER_SETS,
        payload: {
          characterSets: data.characterSets,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_CHARACTER_SETS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createCharacterSet({ name, value, status, userId }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({ mutation: mutationCreateCharacterSet,
        variables: {
          characterSet: {
            name,
            value,
            status,
            userId,
          },
        } });

      dispatch({
        type: CREATE_CHARACTER_SET,
        payload: {
          characterSet: data.createdCharacterSet,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_CHARACTER_SET_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateCharacterSet({ id, name, value, status }) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedCharacterSet,
        variables: {
          characterSet: {
            id,
            name,
            value,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_CHARACTER_SET,
        payload: {
          characterSet: data.updatedCharacterSet,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CHARACTER_SET_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteCharacterSet(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedCharacterSet, variables: { id },
      });

      dispatch({
        type: DELETE_CHARACTER_SET,
        payload: {
          characterSet: data.deletedCharacterSet,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_CHARACTER_SET_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

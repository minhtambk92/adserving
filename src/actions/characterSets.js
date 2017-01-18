/**
 * Created by quynd on 1/18/17.
 */
/* eslint-disable import/prefer-default-export */

import {
  GET_CHARACTER_SET,
  GET_CHARACTER_SETS,
  CREATE_CHARACTER_SET,
  UPDATE_CHARACTER_SET,
  DELETE_CHARACTER_SET,
} from '../constants';

export function getCharacterSet(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        characterSets(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_CHARACTER_SET,
      payload: {
        characterSet: data.characterSets.shift(),
      },
    });
  };
}

export function getCharacterSets(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        characterSets(where: $where, order: $order, limit: $limit) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

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

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_CHARACTER_SETS,
      payload: {
        characterSets: data.characterSets,
      },
    });
  };
}

export function createCharacterSet({ name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($characterSet: CharacterSetInputTypeWithoutId!) {
        createdCharacterSet(characterSet: $characterSet) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      characterSet: {
        name,
        value,
        status,
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
    const mutation = `
      mutation ($characterSet: CharacterSetInputType!) {
        updatedCharacterSet(characterSet: $characterSet) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedCharacterSet(id: "${id}") {
          id
          name
          value
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_CHARACTER_SET,
      payload: {
        characterSet: data.deletedCharacterSet,
      },
    });
  };
}

import {
  GET_OPTIONS,
  CREATE_OPTION,
  GET_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
} from '../../constants';

import queryGetOption from './getOption.graphql';
import queryGetOptions from './getOptions.graphql';
import mutationCreateOption from './createOption.graphql';
import mutationUpdateOption from './updateOption.graphql';
import mutationDeleteOption from './deleteOption.graphql';

export function getOption(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.networkInterface.query({
      query: queryGetOption,
      variables: { id },
    });

    dispatch({
      type: GET_OPTION,
      payload: {
        option: data.options[0],
      },
    });
  };
}

export function getOptions() {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.networkInterface.query({
      query: queryGetOptions,
      variables: {},
    });

    dispatch({
      type: GET_OPTIONS,
      payload: {
        options: data.options,
      },
    });
  };
}

export function createOption({
  name, value, autoLoad, status,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationCreateOption,
      variables: {
        option: {
          name,
          value,
          autoLoad,
          status,
        },
      },
    });

    dispatch({
      type: CREATE_OPTION,
      payload: {
        option: data.createdOption,
      },
    });
  };
}

export function updateOption({
  id, name, value, autoLoad, status,
}) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationUpdateOption,
      variables: {
        option: {
          id,
          name,
          value,
          autoLoad,
          status,
        },
      },
    });

    dispatch({
      type: UPDATE_OPTION,
      payload: {
        option: data.updatedOption,
      },
    });
  };
}

export function deleteOption(id) {
  return async (dispatch, getState, { client }) => {
    const { data } = await client.mutate({
      mutation: mutationDeleteOption,
      variables: {
        id,
      },
    });

    dispatch({
      type: DELETE_OPTION,
      payload: {
        option: data.deletedOption,
      },
    });
  };
}

/* eslint-disable import/prefer-default-export */

import {
  GET_CHANNEL,
  GET_CHANNELS,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  GET_CHANNELS_FILTERS,
  SET_CHANNELS_FILTERS,
} from '../../constants';

import queryGetChannel from './getChannel.graphql';
import queryGetChannels from './getChannels.graphql';
import mutationCreatedChannel from './createdChannel.graphql';
import mutationUpdatedChannel from './updatedChannel.graphql';
import mutationDeletedChannel from './deletedChannel.graphql';

export function getChannelsFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_CHANNELS_FILTERS,
      payload: {},
    });
  };
}

export function setChannelsFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_CHANNELS_FILTERS,
      payload: filter,
    });
  };
}

export function getChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetChannel, { id });

    dispatch({
      type: GET_CHANNEL,
      payload: {
        channel: data.channels[0],
      },
    });
  };
}

export function getChannels(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().channels.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(queryGetChannels, variables.where);

    dispatch({
      type: GET_CHANNELS,
      payload: {
        channels: data.channels,
      },
    });
  };
}

export function createChannel({ name, description, status, siteId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedChannel, {
      channel: {
        name,
        description,
        status,
        siteId,
      },
    });

    dispatch({
      type: CREATE_CHANNEL,
      payload: {
        channel: data.createdChannel,
      },
    });
  };
}

export function updateChannel({ id, name, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedChannel, {
      channel: {
        id,
        name,
        description,
        status,
      },
    });

    dispatch({
      type: UPDATE_CHANNEL,
      payload: {
        channel: data.updatedChannel,
      },
    });
  };
}

export function deleteChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedChannel, { id });

    dispatch({
      type: DELETE_CHANNEL,
      payload: {
        channel: data.deletedChannel,
      },
    });
  };
}

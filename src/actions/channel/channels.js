/* eslint-disable import/prefer-default-export */

import {
  GET_CHANNEL,
  GET_CHANNEL_ERROR,
  GET_CHANNELS,
  GET_CHANNELS_ERROR,
  CREATE_CHANNEL,
  CREATE_CHANNEL_ERROR,
  UPDATE_CHANNEL,
  UPDATE_CHANNEL_ERROR,
  DELETE_CHANNEL,
  DELETE_CHANNEL_ERROR,
  GET_CHANNELS_FILTERS,
  GET_CHANNELS_FILTERS_ERROR,
  SET_CHANNELS_FILTERS,
  SET_CHANNELS_FILTERS_ERROR,
} from '../../constants';

import queryGetChannel from './getChannel.graphql';
import queryGetChannels from './getChannels.graphql';
import mutationCreatedChannel from './createdChannel.graphql';
import mutationUpdatedChannel from './updatedChannel.graphql';
import mutationDeletedChannel from './deletedChannel.graphql';

export function getChannelsFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_CHANNELS_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_CHANNELS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setChannelsFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CHANNELS_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_CHANNELS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(queryGetChannel, { id });

      dispatch({
        type: GET_CHANNEL,
        payload: {
          channel: data.channels[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_CHANNEL_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getChannels(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: GET_CHANNELS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createChannel({ name, description, status, siteId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: CREATE_CHANNEL_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateChannel({ id, name, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
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
    } catch (error) {
      dispatch({
        type: UPDATE_CHANNEL_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedChannel, { id });

      dispatch({
        type: DELETE_CHANNEL,
        payload: {
          channel: data.deletedChannel,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_CHANNEL_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

/* eslint-disable import/prefer-default-export */

import {
  GET_CHANNEL_OPTION_BROWSERS,
  GET_CHANNEL_OPTION_BROWSER,
  CREATE_CHANNEL_OPTION_BROWSER,
  UPDATE_CHANNEL_OPTION_BROWSER,
  DELETE_CHANNEL_OPTION_BROWSER,
} from '../constants';

export function getChannelOptionBrowser(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        channelOptionBrowsers(where: {id: "${id}"}, limit: 1) {
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
      type: GET_CHANNEL_OPTION_BROWSER,
      payload: {
        channelOptionBrowser: data.channelOptionBrowsers.shift(),
      },
    });
  };
}

export function getChannelOptionBrowsers(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        channelOptionBrowsers(where: $where, order: $order, limit: $limit) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().channelOptionBrowsers.filters;

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
      type: GET_CHANNEL_OPTION_BROWSERS,
      payload: {
        channelOptionBrowsers: data.channelOptionBrowsers,
      },
    });
  };
}

export function createChannelOptionBrowser({ name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($channelOptionBrowser: ChannelOptionBrowserInputTypeWithoutId!) {
        createdChannelOptionBrowser(channelOptionBrowser: $channelOptionBrowser) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      channelOptionBrowser: {
        name,
        value,
        status,
      },
    });

    dispatch({
      type: CREATE_CHANNEL_OPTION_BROWSER,
      payload: {
        channelOptionBrowser: data.createdChannelOptionBrowser,
      },
    });
  };
}

export function updateChannelOptionBrowser({ id, name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($channelOptionBrowser: ChannelOptionBrowserInputType!) {
        updatedChannelOptionBrowser(channelOptionBrowser: $channelOptionBrowser) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      channelOptionBrowser: {
        id,
        name,
        value,
        status,
      },
    });

    dispatch({
      type: UPDATE_CHANNEL_OPTION_BROWSER,
      payload: {
        channelOptionBrowser: data.updatedChannelOptionBrowser,
      },
    });
  };
}

export function deleteChannelOptionBrowser(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedChannelOptionBrowser(id: "${id}") {
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
      type: DELETE_CHANNEL_OPTION_BROWSER,
      payload: {
        channelOptionBrowser: data.deletedChannelOptionBrowser,
      },
    });
  };
}

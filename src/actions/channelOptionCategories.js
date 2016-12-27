/* eslint-disable import/prefer-default-export */

import {
  GET_CHANNEL_OPTION_CATEGORIES,
  GET_CHANNEL_OPTION_CATEGORY,
  CREATE_CHANNEL_OPTION_CATEGORY,
  UPDATE_CHANNEL_OPTION_CATEGORY,
  DELETE_CHANNEL_OPTION_CATEGORY,
} from '../constants';

export function getChannelOptionCategory(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        channelOptionCategories(where: {id: "${id}"}, limit: 1) {
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
      type: GET_CHANNEL_OPTION_CATEGORY,
      payload: {
        channelOptionCategory: data.channelOptionCategories.shift(),
      },
    });
  };
}

export function getChannelOptionCategories(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        channelOptionCategories(where: $where, order: $order, limit: $limit) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const filters = await getState().channelOptionCategories.filters;

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
      type: GET_CHANNEL_OPTION_CATEGORIES,
      payload: {
        channelOptionCategories: data.channelOptionCategories,
      },
    });
  };
}

export function createChannelOptionCategory({ name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($channelOptionCategory: ChannelOptionCategoryInputTypeWithoutId!) {
        createdChannelOptionCategory(channelOptionCategory: $channelOptionCategory) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      channelOptionCategory: {
        name,
        value,
        status,
      },
    });

    dispatch({
      type: CREATE_CHANNEL_OPTION_CATEGORY,
      payload: {
        channelOptionCategory: data.createdChannelOptionCategory,
      },
    });
  };
}

export function updateChannelOptionCategory({ id, name, value, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($channelOptionCategory: ChannelOptionCategoryInputType!) {
        updatedChannelOptionCategory(channelOptionCategory: $channelOptionCategory) {
          id
          name
          value
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      channelOptionCategory: {
        id,
        name,
        value,
        status,
      },
    });

    dispatch({
      type: UPDATE_CHANNEL_OPTION_CATEGORY,
      payload: {
        channelOptionCategory: data.updatedChannelOptionCategory,
      },
    });
  };
}

export function deleteChannelOptionCategory(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedChannelOptionCategory(id: "${id}") {
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
      type: DELETE_CHANNEL_OPTION_CATEGORY,
      payload: {
        channelOptionCategory: data.deletedChannelOptionCategory,
      },
    });
  };
}

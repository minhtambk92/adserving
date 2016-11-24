import {
  GET_OPTION_CHANNEL,
  CREATE_OPTION_CHANNEL,
  GET_OPTION_CHANNELS,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../constants';

export function getOptionChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannels(where: {id: "${id}"}, limit: 1) {
          id
          name
          logical
          type
          comparison
          value
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION_CHANNEL,
      payload: {
        optionChannels: data.optionChannels.shift(),
      },
    });
  };
}

export function getOptionChannels() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannels {
          id
          name
          logical
          type
          comparison
          value
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION_CHANNELS,
      payload: {
        optionChannels: data.optionChannels,
      },
    });
  };
}

export function createOptionChannel({ name, logical, type, comparison, value, channelId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputTypeWithoutId!) {
        createdOptionChannel(optionChannel: $optionChannel) {
          id
          name
          logical
          type
          comparison
          value
          channelId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      optionChannel: {
        name,
        logical,
        type,
        comparison,
        value,
        channelId,
      },
    });

    dispatch({
      type: CREATE_OPTION_CHANNEL,
      payload: {
        optionChannel: data.createdOptionChannel,
      },
    });
  };
}

export function updateOptionChannel({ id, name, logical, type, comparison, value, channelId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputType!) {
        updatedOptionChannel(optionChannel: $optionChannel) {
          id
          name
          logical
          type
          comparison
          value
          channelId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      optionChannel: {
        id,
        name,
        logical,
        type,
        comparison,
        value,
        channelId,
      },
    });

    dispatch({
      type: UPDATE_OPTION_CHANNEL,
      payload: {
        optionChannel: data.updatedOptionChannel,
      },
    });
  };
}

export function deleteOptionChannel(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedOptionChannel(id: "${id}") {
          id
          name
          logical
          type
          comparison
          value
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_OPTION_CHANNEL,
      payload: {
        optionChannel: data.deletedOptionChannel,
      },
    });
  };
}

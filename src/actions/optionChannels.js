import {
  GET_OPTION_CHANNEL_BY_CHANNEL_ID,
  CREATE_OPTION_CHANNEL,
  GET_OPTION_CHANNELS,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../constants';

export function getOptionChannelByChannelId(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannels(where: {channelId: "${id}"}) {
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

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION_CHANNEL_BY_CHANNEL_ID,
      payload: {
        optionChannels: data.optionChannels,
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

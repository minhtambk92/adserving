import {
  GET_OPTION_CHANNEL,
  CREATE_OPTION_CHANNEL,
  GET_OPTION_CHANNELS,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../constants';

export function getOptionChannel(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannels(where: {id: "${id}"}, limit: 1) {
          id
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
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannels {
          id
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

export function createOptionChannel({ logical, type, comparison, value, channelId }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputTypeWithoutId!) {
        createdOptionChannel(optionChannel: $optionChannel) {
          id
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
        logical,
        type,
        comparison,
        value,
        channelId
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

export function updateOptionChannel({ id, logical, type, comparison, value }) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputType!) {
        updatedAdvertiser(optionChannel: $optionChannel) {
          id
          logical
          type
          comparison
          value
          createdAt
          updatedAt
        }
      }`;

    const { data1 } = await graphqlRequest(mutation, {
      optionChannel: {
        id,
        logical,
        type,
        comparison,
        value,
      },
    });

    dispatch({
      type: UPDATE_OPTION_CHANNEL,
      payload: {
        optionChannel: data1.updatedOptionChannel,
      },
    });
  };
}

export function deleteOptionChannel(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedOptionChannel(id: "${id}") {
          id
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

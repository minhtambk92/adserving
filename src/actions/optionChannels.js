import {
  CREATE_OPTION_CHANNEL,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../constants';

export function createOptionChannel({ name, logical, optionChannelTypeId,
  comparison, value, channelId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputTypeWithoutId!) {
        createdOptionChannel(optionChannel: $optionChannel) {
          id
          name
          logical
          optionChannelTypeId
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
        optionChannelTypeId,
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

export function updateOptionChannel({ id, name, logical, optionChannelTypeId,
  comparison, value, channelId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannel: OptionChannelInputType!) {
        updatedOptionChannel(optionChannel: $optionChannel) {
          id
          name
          logical
          optionChannelTypeId
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
        optionChannelTypeId,
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
          optionChannelTypeId
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

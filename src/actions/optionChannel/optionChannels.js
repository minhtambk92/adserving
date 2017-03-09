import {
  CREATE_OPTION_CHANNEL,
  UPDATE_OPTION_CHANNEL,
  DELETE_OPTION_CHANNEL,
} from '../../constants';

import mutationCreatedOptionChannel from './createdOptionChannel.graphql';
import mutationUpdatedOptionChannel from './updatedOptionChannel.graphql';
import mutationDeletedOptionChannel from './deletedOptionChannel.graphql';

export function createOptionChannel({ name, logical, optionChannelTypeId,
  comparison, value, channelId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedOptionChannel, {
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
    const { data } = await graphqlRequest(mutationUpdatedOptionChannel, {
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
    const { data } = await graphqlRequest(mutationDeletedOptionChannel, { id });

    dispatch({
      type: DELETE_OPTION_CHANNEL,
      payload: {
        optionChannel: data.deletedOptionChannel,
      },
    });
  };
}

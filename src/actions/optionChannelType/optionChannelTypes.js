import {
  CREATE_OPTION_CHANNEL_TYPE,
  GET_OPTION_CHANNEL_TYPES,
  UPDATE_OPTION_CHANNEL_TYPE,
  DELETE_OPTION_CHANNEL_TYPE,
  GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION,
} from '../../constants';

import queryGetOptionChannelTypes from './getOptionChannelTypes.graphql';
import queryGetOptionChannelTypeIsSelectOption from './getOptionChannelTypeIsSelectOption.graphql';
import mutationCreatedOptionChannelType from './createdOptionChannelType.graphql';
import mutationUpdatedOptionChannelType from './updatedOptionChannelType.graphql';
import mutationDeletedOptionChannelType from './deletedOptionChannelType.graphql';

export function getOptionChannelTypeIsSelectOption() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetOptionChannelTypeIsSelectOption);

    dispatch({
      type: GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION,
      payload: {
        optionChannelTypes: data.optionChannelTypes,
      },
    });
  };
}

export function getOptionChannelTypes() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetOptionChannelTypes);

    dispatch({
      type: GET_OPTION_CHANNEL_TYPES,
      payload: {
        optionChannelTypes: data.optionChannelTypes,
      },
    });
  };
}

export function createOptionChannelType({
  name,
  isInputLink,
  isSelectOption,
  isVariable,
  status,
  userId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedOptionChannelType, {
      optionChannelType: {
        name,
        isInputLink,
        isSelectOption,
        isVariable,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_OPTION_CHANNEL_TYPE,
      payload: {
        optionChannelType: data.createdOptionChannelType,
      },
    });
  };
}

export function updateOptionChannelType({
  id,
  name,
  isInputLink,
  isSelectOption,
  isVariable,
  status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedOptionChannelType, {
      optionChannelType: {
        id,
        name,
        isInputLink,
        isSelectOption,
        isVariable,
        status,
      },
    });

    dispatch({
      type: UPDATE_OPTION_CHANNEL_TYPE,
      payload: {
        optionChannelType: data.updatedOptionChannelType,
      },
    });
  };
}

export function deleteOptionChannelType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedOptionChannelType, { id });

    dispatch({
      type: DELETE_OPTION_CHANNEL_TYPE,
      payload: {
        optionChannelType: data.deletedOptionChannelType,
      },
    });
  };
}

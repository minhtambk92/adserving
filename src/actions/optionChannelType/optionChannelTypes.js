import {
  CREATE_OPTION_CHANNEL_TYPE,
  CREATE_OPTION_CHANNEL_TYPE_ERROR,
  GET_OPTION_CHANNEL_TYPES,
  GET_OPTION_CHANNEL_TYPES_ERROR,
  UPDATE_OPTION_CHANNEL_TYPE,
  UPDATE_OPTION_CHANNEL_TYPE_ERROR,
  DELETE_OPTION_CHANNEL_TYPE,
  DELETE_OPTION_CHANNEL_TYPE_ERROR,
  GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION,
  GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION_ERROR,
} from '../../constants';

import queryGetOptionChannelTypes from './getOptionChannelTypes.graphql';
import queryGetOptionChannelTypeIsSelectOption from './getOptionChannelTypeIsSelectOption.graphql';
import mutationCreatedOptionChannelType from './createdOptionChannelType.graphql';
import mutationUpdatedOptionChannelType from './updatedOptionChannelType.graphql';
import mutationDeletedOptionChannelType from './deletedOptionChannelType.graphql';

export function getOptionChannelTypeIsSelectOption() {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetOptionChannelTypeIsSelectOption,
      });

      dispatch({
        type: GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION,
        payload: {
          optionChannelTypes: data.optionChannelTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_TYPE_IS_SELECT_OPTION_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getOptionChannelTypes() {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetOptionChannelTypes,
      });

      dispatch({
        type: GET_OPTION_CHANNEL_TYPES,
        payload: {
          optionChannelTypes: data.optionChannelTypes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_TYPES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
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
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedOptionChannelType,
        variables: {
          optionChannelType: {
            name,
            isInputLink,
            isSelectOption,
            isVariable,
            status,
            userId,
          },
        },
      });

      dispatch({
        type: CREATE_OPTION_CHANNEL_TYPE,
        payload: {
          optionChannelType: data.createdOptionChannelType,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_OPTION_CHANNEL_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
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
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedOptionChannelType,
        variables: {
          optionChannelType: {
            id,
            name,
            isInputLink,
            isSelectOption,
            isVariable,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_OPTION_CHANNEL_TYPE,
        payload: {
          optionChannelType: data.updatedOptionChannelType,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_OPTION_CHANNEL_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteOptionChannelType(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedOptionChannelType, variables: { id },
      });

      dispatch({
        type: DELETE_OPTION_CHANNEL_TYPE,
        payload: {
          optionChannelType: data.deletedOptionChannelType,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_OPTION_CHANNEL_TYPE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

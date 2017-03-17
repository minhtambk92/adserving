/* eslint-disable import/prefer-default-export */

import {
  GET_OPTION_CHANNEL_VALUES,
  GET_OPTION_CHANNEL_VALUES_ERROR,
  CREATE_OPTION_CHANNEL_VALUE,
  CREATE_OPTION_CHANNEL_VALUE_ERROR,
  UPDATE_OPTION_CHANNEL_VALUE,
  UPDATE_OPTION_CHANNEL_VALUE_ERROR,
  DELETE_OPTION_CHANNEL_VALUE,
  DELETE_OPTION_CHANNEL_VALUE_ERROR,
  SET_OPTION_CHANNEL_VALUE_FILTER,
  SET_OPTION_CHANNEL_VALUE_FILTER_ERROR,
  GET_OPTION_CHANNEL_VALUE_FILTER,
  GET_OPTION_CHANNEL_VALUE_FILTER_ERROR,
  GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES,
  GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES_ERROR,
} from '../../constants';

import queryGetOptionChannelValues from './getOptionChannelValues.graphql';
import mutationCreatedOptionChannelValue from './createdOptionChannelValue.graphql';
import mutationUpdatedOptionChannelValue from './updatedOptionChannelValue.graphql';
import mutationDeletedOptionChannelValue from './deletedOptionChannelValue.graphql';
import queryOptionChannelValueIsProperties from './getOptionChannelValueIsProperties.graphql';

export function getOptionChannelValueIsProperties() {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client(queryOptionChannelValueIsProperties);

      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES,
        payload: {
          optionChannelValues: data.optionChannelValues,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_IS_PROPERTIES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setOptionChannelValueFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_OPTION_CHANNEL_VALUE_FILTER,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_OPTION_CHANNEL_VALUE_FILTER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getOptionChannelValueFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_FILTER,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_FILTER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getOptionChannelValues(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().optionChannelValues.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }

      const { data } = await client.query({
        query: queryGetOptionChannelValues, variables: variables.where,
      });

      dispatch({
        type: GET_OPTION_CHANNEL_VALUES,
        payload: {
          optionChannelValues: data.optionChannelValues,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createOptionChannelValue({
  name,
  value,
  status,
  optionChannelTypeId,
  userId,
  isProperties,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedOptionChannelValue,
        variables: {
          optionChannelValue: {
            name,
            value,
            status,
            optionChannelTypeId,
            userId,
            isProperties,
          },
        },
      });

      dispatch({
        type: CREATE_OPTION_CHANNEL_VALUE,
        payload: {
          optionChannelValue: data.createdOptionChannelValue,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_OPTION_CHANNEL_VALUE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateOptionChannelValue({
  id,
  name,
  value,
  status,
  optionChannelTypeId,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedOptionChannelValue,
        variables: {
          optionChannelValue: {
            id,
            name,
            value,
            status,
            optionChannelTypeId,
          },
        },
      });

      dispatch({
        type: UPDATE_OPTION_CHANNEL_VALUE,
        payload: {
          optionChannelValue: data.updatedOptionChannelValue,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_OPTION_CHANNEL_VALUE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteOptionChannelValue(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedOptionChannelValue, variables: { id },
      });

      dispatch({
        type: DELETE_OPTION_CHANNEL_VALUE,
        payload: {
          optionChannelValue: data.deletedOptionChannelValue,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_OPTION_CHANNEL_VALUE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

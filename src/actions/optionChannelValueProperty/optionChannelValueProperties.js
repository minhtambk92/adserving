/* eslint-disable import/prefer-default-export */

import {
  GET_OPTION_CHANNEL_VALUE_PROPERTIES,
  GET_OPTION_CHANNEL_VALUE_PROPERTIES_ERROR,
  CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
  CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
  UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
  UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
  DELETE_OPTION_CHANNEL_VALUE_PROPERTY,
  DELETE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
  SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
  SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR,
  GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
  GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR,
} from '../../constants';

import queryGetOptionChannelValueProperties from './getOptionChannelValueProperties.graphql';
import mutationCreatedOptionChannelValue from './createdOptionChannelValueProperty.graphql';
import mutationUpdatedOptionChannelValue from './updatedOptionChannelValueProperty.graphql';
import mutationDeletedOptionChannelValue from './deletedOptionChannelValueProperty.graphql';

export function setOptionChannelValuePropertyFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getOptionChannelValuePropertyFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getOptionChannelValueProperties(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().optionChannelValueProperties.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }
      const { data } = await client.query({
        query: queryGetOptionChannelValueProperties, variables: variables.where,
      });

      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_PROPERTIES,
        payload: {
          optionChannelValueProperties: data.optionChannelValueProperties,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_OPTION_CHANNEL_VALUE_PROPERTIES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createOptionChannelValueProperty({
  name,
  status,
  optionChannelValueId,
  userId,
  description,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({ mutation: mutationCreatedOptionChannelValue,
        variables: {
          optionChannelValueProperty: {
            name,
            status,
            optionChannelValueId,
            userId,
            description,
          },
        } });

      dispatch({
        type: CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
        payload: {
          optionChannelValueProperty: data.createdOptionChannelValueProperty,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateOptionChannelValueProperty({
  id,
  name,
  description,
  status,
  optionChannelValueId,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({ mutation: mutationUpdatedOptionChannelValue,
        variables: {
          optionChannelValueProperty: {
            id,
            name,
            status,
            optionChannelValueId,
            description,
          },
        } });

      dispatch({
        type: UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
        payload: {
          optionChannelValueProperty: data.updatedOptionChannelValueProperty,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteOptionChannelValueProperty(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedOptionChannelValue, variables: { id },
      });

      dispatch({
        type: DELETE_OPTION_CHANNEL_VALUE_PROPERTY,
        payload: {
          optionChannelValueProperty: data.deletedOptionChannelValueProperty,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_OPTION_CHANNEL_VALUE_PROPERTY_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

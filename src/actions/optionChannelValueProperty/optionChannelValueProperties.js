/* eslint-disable import/prefer-default-export */

import {
  GET_OPTION_CHANNEL_VALUE_PROPERTIES,
  CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
  UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
  DELETE_OPTION_CHANNEL_VALUE_PROPERTY,
  SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
  GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
} from '../../constants';

import queryGetOptionChannelValueProperties from './getOptionChannelValueProperties.graphql';
import mutationCreatedOptionChannelValue from './createdOptionChannelValueProperty.graphql';
import mutationUpdatedOptionChannelValue from './updatedOptionChannelValueProperty.graphql';
import mutationDeletedOptionChannelValue from './deletedOptionChannelValueProperty.graphql';

export function setOptionChannelValuePropertyFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
      payload: filter,
    });
  };
}

export function getOptionChannelValuePropertyFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_OPTION_CHANNEL_VALUE_PROPERTY_FILTER,
      payload: {},
    });
  };
}

export function getOptionChannelValueProperties(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
    const { data } = await graphqlRequest(queryGetOptionChannelValueProperties, variables.where);

    dispatch({
      type: GET_OPTION_CHANNEL_VALUE_PROPERTIES,
      payload: {
        optionChannelValueProperties: data.optionChannelValueProperties,
      },
    });
  };
}

export function createOptionChannelValueProperty({
  name,
  status,
  optionChannelValueId,
  userId,
  description,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedOptionChannelValue, {
      optionChannelValueProperty: {
        name,
        status,
        optionChannelValueId,
        userId,
        description,
      },
    });

    dispatch({
      type: CREATE_OPTION_CHANNEL_VALUE_PROPERTY,
      payload: {
        optionChannelValueProperty: data.createdOptionChannelValueProperty,
      },
    });
  };
}

export function updateOptionChannelValueProperty({
  id,
  name,
  description,
  status,
  optionChannelValueId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedOptionChannelValue, {
      optionChannelValueProperty: {
        id,
        name,
        status,
        optionChannelValueId,
        description,
      },
    });

    dispatch({
      type: UPDATE_OPTION_CHANNEL_VALUE_PROPERTY,
      payload: {
        optionChannelValueProperty: data.updatedOptionChannelValueProperty,
      },
    });
  };
}

export function deleteOptionChannelValueProperty(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedOptionChannelValue, { id });

    dispatch({
      type: DELETE_OPTION_CHANNEL_VALUE_PROPERTY,
      payload: {
        optionChannelValueProperty: data.deletedOptionChannelValueProperty,
      },
    });
  };
}

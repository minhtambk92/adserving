/* eslint-disable import/prefer-default-export */

import {
  GET_OPTION_CHANNEL_VALUES,
  GET_OPTION_CHANNEL_VALUE,
  CREATE_OPTION_CHANNEL_VALUE,
  UPDATE_OPTION_CHANNEL_VALUE,
  DELETE_OPTION_CHANNEL_VALUE,
} from '../constants';

export function getOptionChannelValue(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannelValues(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          status
          optionChannelTypeId
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION_CHANNEL_VALUE,
      payload: {
        optionChannelValue: data.optionChannelValues.shift(),
      },
    });
  };
}

export function getOptionChannelValues(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        optionChannelValues(where: $where, order: $order, limit: $limit) {
          id
          name
          value
          status
          optionChannelType {
            id
            name
            isInputLink
            isSelectOption
            isVariable
            status
          }
          createdAt
          updatedAt
        }
      }`;

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

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_OPTION_CHANNEL_VALUES,
      payload: {
        optionChannelValues: data.optionChannelValues,
      },
    });
  };
}

export function createOptionChannelValue({ name, value, status, optionChannelTypeId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannelValue: OptionChannelValueInputTypeWithoutId!) {
        createdOptionChannelValue(optionChannelValue: $optionChannelValue) {
          id
          name
          value
          status
          optionChannelType {
            id
            name
            isInputLink
            isSelectOption
            isVariable
            status
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      optionChannelValue: {
        name,
        value,
        status,
        optionChannelTypeId,
      },
    });

    dispatch({
      type: CREATE_OPTION_CHANNEL_VALUE,
      payload: {
        optionChannelValue: data.createdOptionChannelValue,
      },
    });
  };
}

export function updateOptionChannelValue({ id, name, value, status, optionChannelTypeId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannelValue: OptionChannelValueInputType!) {
        updatedOptionChannelValue(optionChannelValue: $optionChannelValue) {
          id
          name
          value
          status
          optionChannelType {
            id
            name
            isInputLink
            isSelectOption
            isVariable
            status
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      optionChannelValue: {
        id,
        name,
        value,
        status,
        optionChannelTypeId,
      },
    });

    dispatch({
      type: UPDATE_OPTION_CHANNEL_VALUE,
      payload: {
        optionChannelValue: data.updatedOptionChannelValue,
      },
    });
  };
}

export function deleteOptionChannelValue(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedOptionChannelValue(id: "${id}") {
          id
          name
          value
          status
          optionChannelTypeId
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_OPTION_CHANNEL_VALUE,
      payload: {
        optionChannelValue: data.deletedOptionChannelValue,
      },
    });
  };
}

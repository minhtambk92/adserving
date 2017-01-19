import {
  CREATE_OPTION_CHANNEL_TYPE,
  GET_OPTION_CHANNEL_TYPES,
  UPDATE_OPTION_CHANNEL_TYPE,
  DELETE_OPTION_CHANNEL_TYPE,
} from '../constants';

export function getOptionChannelTypes() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        optionChannelTypes {
          id
          name
          isInputLink
          isSelectOption
          isVariable
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION_CHANNEL_TYPES,
      payload: {
        optionChannelTypes: data.optionChannelTypes,
      },
    });
  };
}

export function createOptionChannelType({ name, isInputLink, isSelectOption, isVariable, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannelType: OptionChannelTypeInputTypeWithoutId!) {
        createdOptionChannelType(optionChannelType: $optionChannelType) {
          id
          name
          isInputLink
          isSelectOption
          isVariable
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      optionChannelType: {
        name,
        isInputLink,
        isSelectOption,
        isVariable,
        status,
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

export function updateOptionChannelType({ id, name, isInputLink, isSelectOption, isVariable, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($optionChannelType: OptionChannelTypeInputType!) {
        updatedOptionChannelType(optionChannelType: $optionChannelType) {
          id
          name
          isInputLink
          isSelectOption
          isVariable
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedOptionChannelType(id: "${id}") {
          id
          name
          isInputLink
          isSelectOption
          isVariable
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_OPTION_CHANNEL_TYPE,
      payload: {
        optionChannelType: data.deletedOptionChannelType,
      },
    });
  };
}

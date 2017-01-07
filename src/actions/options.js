import {
  GET_OPTIONS,
  CREATE_OPTION,
  GET_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
} from '../constants';

export function getOption(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        options(where: {id: "${id}"}, limit: 1) {
          id
          name
          value
          autoLoad
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTION,
      payload: {
        option: data.options.shift(),
      },
    });
  };
}

export function getOptions() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        options {
          id
          name
          value
          autoLoad
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_OPTIONS,
      payload: {
        options: data.options,
      },
    });
  };
}

export function createOption({
  name, value, autoLoad, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($option: OptionInputTypeWithoutId!) {
        createdOption(option: $option) {
          id
          name
          value
          autoLoad
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      option: {
        name,
        value,
        autoLoad,
        status,
      },
    });

    dispatch({
      type: CREATE_OPTION,
      payload: {
        option: data.createdOption,
      },
    });
  };
}

export function updateOption({
  id, name, value, autoLoad, status,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($option: OptionInputType!) {
        updatedOption(option: $option) {
          id
          name
          value
          autoLoad
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      option: {
        id,
        name,
        value,
        autoLoad,
        status,
      },
    });

    dispatch({
      type: UPDATE_OPTION,
      payload: {
        option: data.updatedOption,
      },
    });
  };
}

export function deleteOption(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedOption(id: "${id}") {
          id
          name
          value
          autoLoad
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_OPTION,
      payload: {
        option: data.deletedOption,
      },
    });
  };
}

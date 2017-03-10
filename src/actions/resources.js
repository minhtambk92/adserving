/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_RESOURCE,
  GET_RESOURCES,
  CREATE_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
  GET_RESOURCES_FILTERS,
  SET_RESOURCES_FILTERS,
} from '../constants';

export function getResourcesFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_RESOURCES_FILTERS,
      payload: {},
    });
  };
}

export function setResourcesFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_RESOURCES_FILTERS,
      payload: filter,
    });
  };
}

export function getResource(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        resources(where: {id: "${id}"}, limit: 1) {
          id
          uniqueName
          modelName
          name
          hasMeta
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_RESOURCE,
      payload: {
        resource: data.resources[0],
      },
    });
  };
}

export function getResources(args = {
  where: {},
  limit: 0,
  order: '',
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        resources {
          id
          uniqueName
          modelName
          name
          hasMeta
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const variables = Object.assign({}, args);
    const { filters } = await getState().resources;

    if (
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = { ...filters };
    }

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_RESOURCES,
      payload: {
        resources: data.resources,
      },
    });
  };
}

export function createResource({ uniqueName, modelName, name, hasMeta, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($resource: ResourceInputTypeWithoutId!) {
        createdResource(resource: $resource) {
          id
          uniqueName
          modelName
          name
          hasMeta
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      resource: {
        uniqueName,
        modelName,
        name,
        hasMeta: hasMeta === true,
        description,
        status,
      },
    });

    dispatch({
      type: CREATE_RESOURCE,
      payload: {
        resource: data.createdResource,
      },
    });
  };
}

export function updateResource({ id, uniqueName, modelName, name, hasMeta, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($resource: ResourceInputType!) {
        updatedResource(resource: $resource) {
          id
          uniqueName
          modelName
          name
          hasMeta
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      resource: {
        id,
        uniqueName,
        modelName,
        name,
        hasMeta: hasMeta === true,
        description,
        status,
      },
    });

    dispatch({
      type: UPDATE_RESOURCE,
      payload: {
        resource: data.updatedResource,
      },
    });
  };
}

export function deleteResource(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedResource(id: "${id}") {
          id
          uniqueName
          modelName
          name
          hasMeta
          description
          status
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_RESOURCE,
      payload: {
        resource: data.deletedResource,
      },
    });
  };
}

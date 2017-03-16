/**
 * Created by Manhhailua on 10/11/16.
 */

import {
  GET_RESOURCE,
  GET_RESOURCE_ERROR,
  GET_RESOURCES,
  GET_RESOURCES_ERROR,
  CREATE_RESOURCE,
  CREATE_RESOURCE_ERROR,
  UPDATE_RESOURCE,
  UPDATE_RESOURCE_ERROR,
  DELETE_RESOURCE,
  DELETE_RESOURCE_ERROR,
  GET_RESOURCES_FILTERS,
  GET_RESOURCES_FILTERS_ERROR,
  SET_RESOURCES_FILTERS,
  SET_RESOURCES_FILTERS_ERROR,
} from '../../constants';

import queryGetResource from './getResource.graphql';
import queryGetResources from './getResources.graphql';
import mutationCreatedResouce from './createdResource.graphql';
import mutationUpdatedResource from './updatedResource.graphql';
import mutationDeletedResource from './deletedResource.graphql';

export function getResourcesFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_RESOURCES_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_RESOURCES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setResourcesFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_RESOURCES_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_RESOURCES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getResource(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(queryGetResource, { id });

      dispatch({
        type: GET_RESOURCE,
        payload: {
          resource: data.resources[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getResources(args = {
  where: {},
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const variables = Object.assign({}, args);
      const { filters } = await getState().resources;

      if (
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = { ...filters };
      }

      const { data } = await graphqlRequest(queryGetResources, variables.where);

      dispatch({
        type: GET_RESOURCES,
        payload: {
          resources: data.resources,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_RESOURCES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createResource({ uniqueName, modelName, name, hasMeta, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedResouce, {
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
    } catch (error) {
      dispatch({
        type: CREATE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateResource({ id, uniqueName, modelName, name, hasMeta, description, status }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationUpdatedResource, {
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
    } catch (error) {
      dispatch({
        type: UPDATE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteResource(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedResource, { id });

      dispatch({
        type: DELETE_RESOURCE,
        payload: {
          resource: data.deletedResource,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_RESOURCE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

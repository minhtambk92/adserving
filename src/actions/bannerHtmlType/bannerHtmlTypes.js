/* eslint-disable import/prefer-default-export */

import {
  GET_BANNER_HTML_TYPES,
  CREATE_BANNER_HTML_TYPE,
  UPDATE_BANNER_HTML_TYPE,
  DELETE_BANNER_HTML_TYPE,
} from '../../constants';

import queryGetBannerHtmlTypes from './getBannerHtmlTypes.graphql';
import mutationCreatedBannerHtmlType from './createdBannerHtmlType.graphql';
import mutationUpdatedBannerHtmlType from './updatedBannerHtmlType.graphql';
import mutationDeletedBannerHtmlType from './deletedBannerhtmlType.graphql';

export function getBannerHtmlTypes(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const variables = Object.assign({}, args);
    const filters = await getState().bannerHtmlTypes.filters;

    if (
      options.globalFilters &&
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = Object.assign({}, filters);
    }

    const { data } = await graphqlRequest(queryGetBannerHtmlTypes, variables.where);

    dispatch({
      type: GET_BANNER_HTML_TYPES,
      payload: {
        bannerHtmlTypes: data.bannerHtmlTypes,
      },
    });
  };
}

export function createBannerHtmlType({ name, value, weight, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedBannerHtmlType, {
      bannerHtmlType: {
        name,
        value,
        weight,
        status,
        userId,
      },
    });

    dispatch({
      type: CREATE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.createdBannerHtmlType,
      },
    });
  };
}

export function updateBannerHtmlType({ id, name, value, weight, status, userId }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedBannerHtmlType, {
      bannerHtmlType: {
        id,
        name,
        value,
        weight,
        status,
        userId,
      },
    });

    dispatch({
      type: UPDATE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.updatedBannerHtmlType,
      },
    });
  };
}

export function deleteBannerHtmlType(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedBannerHtmlType, { id });

    dispatch({
      type: DELETE_BANNER_HTML_TYPE,
      payload: {
        bannerHtmlType: data.deletedBannerHtmlType,
      },
    });
  };
}

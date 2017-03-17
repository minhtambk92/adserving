import {
  GET_BANNERS,
  GET_BANNERS_ERROR,
  CREATE_BANNER,
  CREATE_BANNER_ERROR,
  GET_BANNER,
  GET_BANNER_ERROR,
  UPDATE_BANNER,
  UPDATE_BANNER_ERROR,
  DELETE_BANNER,
  DELETE_BANNER_ERROR,
  GET_BANNERS_FILTERS,
  GET_BANNERS_FILTERS_ERROR,
  SET_BANNERS_FILTERS,
  SET_BANNERS_FILTERS_ERROR,
} from '../../constants/';

import queryGetBanner from './getBanner.graphql';
import queryGetBanners from './getBanners.graphql';
import mutationCreatedBanner from './createdBanner.graphql';
import mutationUpdatedBanner from './updatedBanner.graphql';
import mutationDeletedBanner from './deletedBanner.graphql';

export function getBannersFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_BANNERS_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_BANNERS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setBannersFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_BANNERS_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_BANNERS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getBanner(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetBanner, variables: { id },
      });

      dispatch({
        type: GET_BANNER,
        payload: {
          banner: data.banners[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_BANNER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getBanners(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().banners.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }
      const { data } = await client.query({
        query: queryGetBanners,
        variables: variables.where,
      });

      dispatch({
        type: GET_BANNERS,
        payload: {
          banners: data.banners,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_BANNERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createBanner({
  name,
  html,
  width,
  height,
  keyword,
  weight,
  description,
  bannerTypeId,
  url,
  target,
  imageUrl,
  isIFrame,
  status,
  adsServerId,
  bannerHtmlTypeId,
  isCountView,
  isFixIE,
  isDefault,
  isRelative,
  adStore,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  channelId,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate(
        {
          mutation: mutationCreatedBanner,
          variables: {
            banner: {
              name,
              html,
              width,
              height,
              keyword,
              weight,
              description,
              bannerTypeId,
              url,
              target,
              imageUrl,
              isIFrame,
              status,
              adsServerId,
              bannerHtmlTypeId,
              isCountView,
              isFixIE,
              isDefault,
              isRelative,
              adStore,
              impressionsBooked,
              clicksBooked,
              activationDate,
              expirationDate,
              channelId,
            },
          },
        });

      dispatch({
        type: CREATE_BANNER,
        payload: {
          banner: data.createdBanner,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_BANNER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateBanner({
  id,
  name,
  html,
  width,
  height,
  keyword,
  weight,
  description,
  bannerTypeId,
  url,
  target,
  imageUrl,
  isIFrame,
  status,
  adsServerId,
  bannerHtmlTypeId,
  isCountView,
  isFixIE,
  isDefault,
  isRelative,
  adStore,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  channelId,
  placements,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedBanner,
        variables: {
          banner: {
            id,
            name,
            html,
            width,
            height,
            keyword,
            weight,
            description,
            bannerTypeId,
            url,
            target,
            imageUrl,
            isIFrame,
            status,
            adsServerId,
            bannerHtmlTypeId,
            isCountView,
            isFixIE,
            isDefault,
            isRelative,
            adStore,
            impressionsBooked,
            clicksBooked,
            activationDate,
            expirationDate,
            channelId,
            placements,
          },
        },
      });

      dispatch({
        type: UPDATE_BANNER,
        payload: {
          banner: data.updatedBanner,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BANNER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteBanner(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedBanner,
        variables: { id },
      });

      dispatch({
        type: DELETE_BANNER,
        payload: {
          banner: data.deletedBanner,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_BANNER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

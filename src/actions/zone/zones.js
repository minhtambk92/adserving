/**
 * Created by Manhhailua on 10/14/16.
 */

/* eslint-disable import/prefer-default-export */

import {
  GET_ZONE,
  GET_ZONE_ERROR,
  GET_ZONES,
  GET_ZONES_ERROR,
  CREATE_ZONE,
  CREATE_ZONE_ERROR,
  UPDATE_ZONE,
  UPDATE_ZONE_ERROR,
  DELETE_ZONE,
  DELETE_ZONE_ERROR,
  GET_ZONES_FILTERS,
  GET_ZONES_FILTERS_ERROR,
  SET_ZONES_FILTERS,
  SET_ZONES_FILTERS_ERROR,
} from '../../constants';

import queryGetZone from './getZone.graphql';
import queryGetZones from './getZones.graphql';
import mutationCreatedZone from './createdZone.graphql';
import mutationUpdatedZone from './updatedZone.graphql';
import mutationDeletedZone from './deletedZone.graphql';

export function getZonesFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_ZONES_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_ZONES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setZonesFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_ZONES_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_ZONES_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(queryGetZone, { id });

      dispatch({
        type: GET_ZONE,
        payload: {
          zone: data.zones[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ZONE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getZones(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().zones.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }

      const { data } = await graphqlRequest(queryGetZones, variables.where);

      dispatch({
        type: GET_ZONES,
        payload: {
          zones: data.zones,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ZONES_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createZone({
  siteId,
  name,
  zoneTypeId,
  zoneSizeTypeId,
  html,
  css,
  slot,
  width,
  height,
  targetIFrame,
  isShowBannerAgain,
  source,
  isShowCampaignAgain,
  isShowTextBanner,
  characterSetId,
  supportThirdParty,
  isIncludeDescription,
  isCustomSize,
  status,
  description,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationCreatedZone, {
        zone: {
          siteId,
          name,
          zoneTypeId,
          zoneSizeTypeId,
          html,
          css,
          width,
          height,
          slot,
          targetIFrame,
          isShowBannerAgain,
          source,
          isShowCampaignAgain,
          isShowTextBanner,
          characterSetId,
          supportThirdParty,
          isIncludeDescription,
          isCustomSize,
          status,
          description,
        },
      });

      dispatch({
        type: CREATE_ZONE,
        payload: {
          zone: data.createdZone,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_ZONE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateZone({
  id,
  siteId,
  name,
  zoneTypeId,
  zoneSizeTypeId,
  html,
  css,
  slot,
  width,
  height,
  targetIFrame,
  isShowBannerAgain,
  source,
  isShowCampaignAgain,
  isShowTextBanner,
  characterSetId,
  supportThirdParty,
  isIncludeDescription,
  status,
  isCustomSize,
  description,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationUpdatedZone, {
        zone: {
          id,
          siteId,
          name,
          zoneTypeId,
          zoneSizeTypeId,
          html,
          css,
          slot,
          width,
          height,
          targetIFrame,
          isShowBannerAgain,
          source,
          isShowCampaignAgain,
          isShowTextBanner,
          characterSetId,
          supportThirdParty,
          isIncludeDescription,
          isCustomSize,
          status,
          description,
        },
      });

      dispatch({
        type: UPDATE_ZONE,
        payload: {
          zone: data.updatedZone,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ZONE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteZone(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    try {
      const { data } = await graphqlRequest(mutationDeletedZone, { id });

      dispatch({
        type: DELETE_ZONE,
        payload: {
          zone: data.deletedZone,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_ZONE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

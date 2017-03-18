import {
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_ERROR,
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_ERROR,
  GET_CAMPAIGN,
  GET_CAMPAIGN_ERROR,
  UPDATE_CAMPAIGN,
  UPDATE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_ERROR,
  GET_CAMPAIGNS_FILTERS,
  GET_CAMPAIGNS_FILTERS_ERROR,
  SET_CAMPAIGNS_FILTERS,
  SET_CAMPAIGNS_FILTERS_ERROR,
} from '../../constants';

import queryGetCampaigns from './getCampaigns.graphql';
import queryGetCampaign from './getCampaign.graphql';
import mutationCreatedCampaign from './createdCampaign.graphql';
import mutationUpdatedCampaign from './updatedCampaign.graphql';
import mutationDeletedCampaign from './deletedCampaign.graphql';

export function getCampaignsFilters() {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_CAMPAIGNS_FILTERS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGNS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function setCampaignsFilters(filter) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CAMPAIGNS_FILTERS,
        payload: filter,
      });
    } catch (error) {
      dispatch({
        type: SET_CAMPAIGNS_FILTERS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getCampaign(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.query({
        query: queryGetCampaign, variables: { id },
      });

      dispatch({
        type: GET_CAMPAIGN,
        payload: {
          campaign: data.campaigns[0],
        },
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function getCampaigns(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const variables = Object.assign({}, args);
      const filters = await getState().campaigns.filters;

      if (
        options.globalFilters &&
        variables.where === {} &&
        Object.keys(filters).length > 0 &&
        filters.constructor === Object
      ) {
        variables.where = Object.assign({}, filters);
      }
      const { data } = await client.query({
        query: queryGetCampaigns,
        variables: variables.where,
      });

      dispatch({
        type: GET_CAMPAIGNS,
        payload: {
          campaigns: data.campaigns,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGNS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function createCampaign({
  advertiserId,
  name,
  startTime,
  endTime,
  views,
  viewPerSession,
  timeResetViewCount,
  weight,
  revenueType,
  expireValueCPM,
  maxCPMPerDay,
  description,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationCreatedCampaign,
        variables: {
          campaign: {
            advertiserId,
            name,
            startTime,
            endTime,
            views,
            viewPerSession,
            timeResetViewCount,
            weight,
            revenueType,
            expireValueCPM,
            maxCPMPerDay,
            description,
            status,
          },
        },
      });

      dispatch({
        type: CREATE_CAMPAIGN,
        payload: {
          campaign: data.createdCampaign,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_CAMPAIGN_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function updateCampaign({
  id,
  advertiserId,
  name,
  startTime,
  endTime,
  views,
  viewPerSession,
  timeResetViewCount,
  weight,
  revenueType,
  expireValueCPM,
  maxCPMPerDay,
  description,
  status,
}) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationUpdatedCampaign,
        variables: {
          campaign: {
            id,
            advertiserId,
            name,
            startTime,
            endTime,
            views,
            viewPerSession,
            timeResetViewCount,
            weight,
            revenueType,
            expireValueCPM,
            maxCPMPerDay,
            description,
            status,
          },
        },
      });

      dispatch({
        type: UPDATE_CAMPAIGN,
        payload: {
          campaign: data.updatedCampaign,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CAMPAIGN_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}

export function deleteCampaign(id) {
  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation: mutationDeletedCampaign, variables: { id },
      });

      dispatch({
        type: DELETE_CAMPAIGN,
        payload: {
          campaign: data.deletedCampaign,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_CAMPAIGN_ERROR,
        payload: {
          error,
        },
      });

      return false;
    }
    return true;
  };
}

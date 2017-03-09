import {
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  GET_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  GET_CAMPAIGNS_FILTERS,
  SET_CAMPAIGNS_FILTERS,
} from '../../constants';

import queryGetCampaigns from './getCampaigns.graphql';
import queryGetCampaign from './getCampaign.graphql';
import mutationCreatedCampaign from './createdCampaign.graphql';
import mutationUpdatedCampaign from './updatedCampaign.graphql';
import mutationDeletedCampaign from './deletedCampaign.graphql';

export function getCampaignsFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGNS_FILTERS,
      payload: {},
    });
  };
}

export function setCampaignsFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_CAMPAIGNS_FILTERS,
      payload: filter,
    });
  };
}

export function getCampaign(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetCampaign, { id });

    dispatch({
      type: GET_CAMPAIGN,
      payload: {
        campaign: data.campaigns[0],
      },
    });
  };
}

export function getCampaigns(args = {
  where: {},
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
    const { data } = await graphqlRequest(queryGetCampaigns, variables.where);

    dispatch({
      type: GET_CAMPAIGNS,
      payload: {
        campaigns: data.campaigns,
      },
    });
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationCreatedCampaign, {
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
    });

    dispatch({
      type: CREATE_CAMPAIGN,
      payload: {
        campaign: data.createdCampaign,
      },
    });
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
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationUpdatedCampaign, {
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
    });

    dispatch({
      type: UPDATE_CAMPAIGN,
      payload: {
        campaign: data.updatedCampaign,
      },
    });
  };
}

export function deleteCampaign(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(mutationDeletedCampaign, { id });

    dispatch({
      type: DELETE_CAMPAIGN,
      payload: {
        campaign: data.deletedCampaign,
      },
    });
  };
}

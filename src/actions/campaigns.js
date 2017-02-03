import {
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  GET_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  GET_CAMPAIGNS_FILTERS,
  SET_CAMPAIGNS_FILTERS,
} from '../constants/';

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
    const query = `
      query {
        campaigns(where: {id: "${id}"}) {
         id
          advertiserId
          name
          startTime
          endTime
          views
          viewPerSession
          timeResetViewCount
          weight
          revenueType
          expireValueCPM
          maxCPMPerDay
          description
          status
          placements {
            id
            name
            width
            height
            startTime
            endTime
            weight
            description
            campaignId
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_CAMPAIGN,
      payload: {
        campaign: data.campaigns.shift(),
      },
    });
  };
}

export function getCampaigns(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        campaigns {
          id
          advertiserId
          name
          startTime
          endTime
          views
          viewPerSession
          timeResetViewCount
          weight
          revenueType
          expireValueCPM
          maxCPMPerDay
          status
          description
          createdAt
          updatedAt
          }
      }`;
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
    const { data } = await graphqlRequest(query, variables);

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
    const mutation = `
      mutation ($campaign: CampaignInputTypeWithoutId!) {
        createdCampaign(campaign: $campaign) {
          id
          advertiserId
          name
          startTime
          endTime
          views
          viewPerSession
          timeResetViewCount
          weight
          revenueType
          expireValueCPM
          maxCPMPerDay
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation ($campaign: CampaignInputType!) {
        updatedCampaign(campaign: $campaign) {
          id
          advertiserId
          name
          startTime
          endTime
          views
          viewPerSession
          timeResetViewCount
          weight
          revenueType
          expireValueCPM
          maxCPMPerDay
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
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
    const mutation = `
      mutation {
        deletedCampaign(id: "${id}") {
           id
          advertiserId
          name
          startTime
          endTime
          views
          viewPerSession
          timeResetViewCount
          weight
          revenueType
          expireValueCPM
          maxCPMPerDay
          description
          status
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_CAMPAIGN,
      payload: {
        campaign: data.deletedCampaign,
      },
    });
  };
}

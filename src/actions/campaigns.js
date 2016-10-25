import {
  GET_CAMPAIGNS,
  CREATE_CAMPAIGN,
  GET_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
} from '../constants/';

export function getCampaign(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
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
          description
          placements {
            id
            name
            size
            startTime
            endTime
            weight
            description
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

export function getCampaigns() {
  return async(dispatch, getState, { graphqlRequest }) => {
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
          description
          createdAt
          updatedAt
          }
      }`;

    const { data } = await graphqlRequest(query);

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
  description,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
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
          description
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
        description,

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
  description,
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
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
          description
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
        description,
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
  return async(dispatch, getState, { graphqlRequest }) => {
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
          description
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

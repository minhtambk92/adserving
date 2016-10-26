import {
  GET_BANNERS,
  CREATE_BANNER,
  GET_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
} from '../constants/';

export function getBanner(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        banners(where: {id: "${id}"}, limit: 1) {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          pbzBanner {
            placements {
              id
              name
              size
              startTime
              endTime
              weight
              description
              campaignId
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
         }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_BANNER,
      payload: {
        banner: data.banners.shift(),
      },
    });
  };
}

export function getBanners() {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        banners {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          createdAt
          updatedAt
          }
      }`;

    const { data } = await graphqlRequest(query);

    dispatch({
      type: GET_BANNERS,
      payload: {
        banners: data.banners,
      },
    });
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
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($banner: BannerInputTypeWithoutId!) {
        createdBanner(banner: $banner) {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      banner: {
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,

      },
    });

    dispatch({
      type: CREATE_BANNER,
      payload: {
        banner: data.createdBanner,
      },
    });
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
}) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($banner: BannerInputType!) {
       updatedBanner(banner: $banner) {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          createdAt
          updatedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation, {
      banner: {
        id,
        name,
        html,
        width,
        height,
        keyword,
        weight,
        description,
      },
    });

    dispatch({
      type: UPDATE_BANNER,
      payload: {
        banner: data.updatedBanner,
      },
    });
  };
}

export function deleteBanner(id) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedBanner(id: "${id}") {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          createdAt
          updatedAt
          deletedAt
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_BANNER,
      payload: {
        banner: data.deletedBanner,
      },
    });
  };
}

import {
  GET_BANNERS,
  CREATE_BANNER,
  GET_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  GET_BANNERS_FILTERS,
  SET_BANNERS_FILTERS,
} from '../constants/';

export function getBannersFilters() {
  return async (dispatch) => {
    dispatch({
      type: GET_BANNERS_FILTERS,
      payload: {},
    });
  };
}

export function setBannersFilters(filter) {
  return async (dispatch) => {
    dispatch({
      type: SET_BANNERS_FILTERS,
      payload: filter,
    });
  };
}

export function getBanner(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
          type
          imageUrl
          url
          target
          userIFrame
          status
          adServer
          bannerHTMLType
          countView
          fixIE
          isDefault 
          isRelative
          impressionsBooked
          clicksBooked
          activationDate
          expirationDate
          adStore
          impressionsBookedValue
          clicksBookedValue
          activationDateValue
          expirationDateValue
          channelId
          pbzBanner {
            placements {
              id
              name
              sizeWidth
              sizeHeight
              startTime
              endTime
              weight
              description
              campaignId
              status
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

export function getBanners(args = {
  where: {},
  limit: 0,
  order: '',
}, options = {
  globalFilters: false,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query($where: JSON, $order: String, $limit: Int) {
        banners(where: $where, order: $order, limit: $limit) {
          id
          name
          html
          width
          height
          keyword
          weight
          description
          type
          imageUrl
          url
          target
          userIFrame
          status
          adServer
          bannerHTMLType
          countView
          fixIE
          isDefault 
          isRelative
          impressionsBooked
          clicksBooked
          activationDate
          expirationDate
          adStore
          impressionsBookedValue
          clicksBookedValue
          activationDateValue
          expirationDateValue
          channelId
          pbzBanner {
            placements {
              id
              name
              sizeWidth
              sizeHeight
              startTime
              endTime
              weight
              description
              campaignId
              status
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
          }
      }`;
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
    const { data } = await graphqlRequest(query, variables);

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
  type,
  url,
  target,
  imageUrl,
  userIFrame,
  status,
  adServer,
  bannerHTMLType,
  countView,
  fixIE,
  isDefault,
  isRelative,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  adStore,
  impressionsBookedValue,
  clicksBookedValue,
  activationDateValue,
  expirationDateValue,
  channelId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
          type
          url
          target
          imageUrl
          userIFrame
          status
          adServer
          bannerHTMLType
          countView
          fixIE
          isDefault 
          isRelative
          impressionsBooked
          clicksBooked
          activationDate
          expirationDate
          adStore
          impressionsBookedValue
          clicksBookedValue
          activationDateValue
          expirationDateValue
          channelId
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
        type,
        url,
        target,
        imageUrl,
        userIFrame,
        status,
        adServer,
        bannerHTMLType,
        countView,
        fixIE,
        isDefault,
        isRelative,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        adStore,
        impressionsBookedValue,
        clicksBookedValue,
        activationDateValue,
        expirationDateValue,
        channelId,
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
  type,
  url,
  target,
  imageUrl,
  userIFrame,
  status,
  adServer,
  bannerHTMLType,
  countView,
  fixIE,
  isDefault,
  isRelative,
  impressionsBooked,
  clicksBooked,
  activationDate,
  expirationDate,
  adStore,
  impressionsBookedValue,
  clicksBookedValue,
  activationDateValue,
  expirationDateValue,
  channelId,
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
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
          type
          imageUrl
          url
          target
          userIFrame
          status
          adServer
          bannerHTMLType
          countView
          fixIE
          isDefault 
          isRelative
          impressionsBooked
          clicksBooked
          activationDate
          expirationDate
          adStore
          impressionsBookedValue
          clicksBookedValue
          activationDateValue
          expirationDateValue
          channelId
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
        type,
        url,
        target,
        imageUrl,
        userIFrame,
        status,
        adServer,
        bannerHTMLType,
        countView,
        fixIE,
        isDefault,
        isRelative,
        impressionsBooked,
        clicksBooked,
        activationDate,
        expirationDate,
        adStore,
        impressionsBookedValue,
        clicksBookedValue,
        activationDateValue,
        expirationDateValue,
        channelId,
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
  return async (dispatch, getState, { graphqlRequest }) => {
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
          type
          imageUrl
          url
          target
          userIFrame
          status
          adServer
          bannerHTMLType
          countView
          fixIE
          isDefault 
          isRelative
          impressionsBooked
          clicksBooked
          activationDate
          expirationDate
          adStore
          impressionsBookedValue
          clicksBookedValue
          activationDateValue
          expirationDateValue
          channelId
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

import {
  SET_PAGE_CAMPAIGN_ACTIVE_TAB,
} from '../../constants';

export function setPageCampaignActiveTab(tabName) {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_CAMPAIGN_ACTIVE_TAB,
      payload: {
        tabName,
      },
    });
  };
}

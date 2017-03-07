/**
 * Created by Manhhailua on 11/13/16.
 */

import {
  GET_MENU,
  GET_MENUS,
  CREATE_MENU,
  UPDATE_MENU,
  DELETE_MENU,
  GET_ASIDE_LEFT_MENU,
  SET_ASIDE_LEFT_ACTIVE_ITEMS,
} from '../../constants';
import history from '../../core/history';

import queryGetMenu from './menus.graphql';

/**
 * Check current active menu items by current location
 * @param url
 * @param item
 * @param activeArray
 * @param isLast
 * @returns {Array}
 */
function checkActiveItem(url, item, activeArray = [], isLast) {
  // Get last item before push
  const lastItem = (activeArray.length > 0) ? activeArray[activeArray.length - 1] : {};

  // Check if same level item
  if (
    activeArray.length > 1 &&
    url.indexOf(lastItem.url) === -1 &&
    item.parentId === lastItem.parentId
  ) {
    activeArray.pop();
  }

  // Push current item to array
  activeArray.push(item);

  // If current item is the last item of same level and not active
  if (isLast && url.indexOf(item.url) === -1) {
    activeArray.pop();
  }

  // If item has children
  if (item.childItems && item.childItems.length > 0) {
    item.childItems.forEach((childItem, index, array) => {
      checkActiveItem(url, childItem, activeArray, index === array.length - 1);
    });
  }

  // Return array
  return activeArray;
}

export function getMenu(uniqueName, actionType, callback) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest(queryGetMenu, { uniqueName });
    const menu = data.menus[0];

    dispatch({
      type: actionType,
      payload: {
        menu,
      },
    });

    if (callback) {
      callback(menu);
    }
  };
}

export function setAsideLeftActiveItems(url, items) {
  return async (dispatch, getState) => {
    const currentPathname = url || history.location.pathname;
    const menuItems = items || getState().menus.asideLeft.items;
    const activeItems = menuItems
      .map(item => checkActiveItem(currentPathname, item))
      .filter(array => array.length > 1)
      .pop();

    dispatch({
      type: SET_ASIDE_LEFT_ACTIVE_ITEMS,
      payload: {
        items: activeItems || [],
      },
    });
  };
}

export function getEditingMenu(uniqueName) {
  return getMenu(uniqueName, GET_MENU);
}

export function getAsideLeftMenu(uniqueName) {
  return getMenu(uniqueName, GET_ASIDE_LEFT_MENU);
}

export function getMenus(args = {
  where: {},
  limit: 0,
  order: '',
}) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const query = `
      query ($where: JSON, $order: String, $limit: Int) {
        menus(where: $where, order: $order, limit: $limit) {
          id
          url
          uniqueName
          name
          items {
            id
            url
            icon
            name
            type
            childItems {
              id
              url
              icon
              name
              order
            }
            order
          }
        }
      }`;

    const variables = Object.assign({}, args);
    const { filters } = await getState().menus;

    if (
      variables.where === {} &&
      Object.keys(filters).length > 0 &&
      filters.constructor === Object
    ) {
      variables.where = { ...filters };
    }

    const { data } = await graphqlRequest(query, variables);

    dispatch({
      type: GET_MENUS,
      payload: {
        menus: data.menus,
      },
    });
  };
}

export function createMenu({ uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($menu: MenuInputWithoutId!) {
        createdMenu(menu: $menu) {
          id
          url
          uniqueName
          name
          items {
            id
            url
            icon
            name
            type
            childItems {
              id
              url
              icon
              name
              order
            }
            order
          }
        }
      }`;

    const { data } = await graphqlRequest(mutation, { menu: { uniqueName, name } });

    dispatch({
      type: CREATE_MENU,
      payload: {
        menu: data.createdMenu,
      },
    });
  };
}

export function updateMenu({ id, uniqueName, name }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation ($menu: MenuInput!) {
        updatedMenu(menu: $menu) {
          id
          url
          uniqueName
          name
          items {
            id
            url
            icon
            name
            type
            childItems {
              id
              url
              icon
              name
              order
            }
            order
          }
        }
      }`;

    const { data } = await graphqlRequest(mutation, { menu: { id, uniqueName, name } });

    dispatch({
      type: UPDATE_MENU,
      payload: {
        menu: data.updatedMenu,
      },
    });
  };
}

export function deleteMenu(id) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const mutation = `
      mutation {
        deletedMenu(id: "${id}") {
          id
          url
          uniqueName
          name
          items {
            id
            url
            icon
            name
            type
            childItems {
              id
              url
              icon
              name
              order
            }
            order
          }
        }
      }`;

    const { data } = await graphqlRequest(mutation);

    dispatch({
      type: DELETE_MENU,
      payload: {
        menu: data.deletedMenu,
      },
    });
  };
}

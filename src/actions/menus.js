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
} from '../constants';

export function getMenu(uniqueName, actionType) {
  return async(dispatch, getState, { graphqlRequest }) => {
    const query = `
      query {
        menus(where: {uniqueName: "${uniqueName}"}, limit: 1) {
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

    const { data } = await graphqlRequest(query);

    dispatch({
      type: actionType,
      payload: {
        menu: data.menus.shift(),
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
  return async(dispatch, getState, { graphqlRequest }) => {
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
  return async(dispatch, getState, { graphqlRequest }) => {
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
  return async(dispatch, getState, { graphqlRequest }) => {
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
  return async(dispatch, getState, { graphqlRequest }) => {
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

/**
 * Created by Manhhailua on 11/11/16.
 */

import DataType from 'sequelize';
import Model from '../sequelize';
import {
  TYPE_MENU,
  TYPE_MENU_HEADER,
  TYPE_MENU_ITEM,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from '../../constants';

const Menu = Model.define('Menu', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataType.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataType.TEXT,
    allowNull: false,
  },
  name: {
    type: DataType.TEXT,
    allowNull: false,
  },
  parentId: {
    type: DataType.UUID,
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: TYPE_MENU,
    validate: {
      isIn: [[TYPE_MENU, TYPE_MENU_HEADER, TYPE_MENU_ITEM]],
    },
  },
  status: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: STATUS_INACTIVE,
    validate: {
      isIn: [[STATUS_ACTIVE, STATUS_INACTIVE]],
    },
  },

}, {

  // Additional options
  defaultScope: {
    where: {
      status: STATUS_ACTIVE,
    },
  },
  scopes: {
    menus: {
      where: {
        type: TYPE_MENU,
      },
    },
    headers: {
      where: {
        type: TYPE_MENU_HEADER,
      },
    },
    items: {
      where: {
        type: TYPE_MENU_ITEM,
      },
    },
  },

});

export default Menu;

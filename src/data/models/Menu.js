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
  },
  uniqueName: {
    type: DataType.STRING,
    validate: {
      isEven: value => {
        if (this.type === TYPE_MENU && typeof value !== 'string') {
          throw new Error('uniqueName must be defined as a string if type is menu.');
        }
      },
    },
  },
  name: {
    type: DataType.TEXT,
    allowNull: false,
  },
  parentId: {
    type: DataType.UUID,
    allowNull: true,
  },
  order: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
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
    defaultValue: STATUS_ACTIVE,
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
        status: STATUS_ACTIVE,
      },
    },
    headers: {
      where: {
        type: TYPE_MENU_HEADER,
        status: STATUS_ACTIVE,
      },
    },
    items: {
      where: {
        type: TYPE_MENU_ITEM,
        status: STATUS_ACTIVE,
      },
    },
  },

});

export default Menu;
